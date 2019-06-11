import axios from 'axios';
import parse from 'parse-link-header';
import Vue from 'vue'
const API = 'http://localhost:3005/products';
export default {
    state:{
        products: [],
        headerLinks: [{
            first: undefined,
            next: undefined,
            prev: undefined,
            last: undefined,
            productsCount: 0
        }],
        searchValue: '',
    },
    getters:{
        productList(state, getters) {
            return state.products
        },
        searchValue(state,getters) {
            return state.searchValue
        },
        headerLinks(state, getters) {
            return state.headerLinks
        }
    },
    actions:{
        async fetchProductList(context) {
            var url = API + '?_limit=12&_page=1'
            context.dispatch('refreshProductList', url)
        },
        
        async nextPage(context) {
            var url = context.state.headerLinks[0].next.url
            context.dispatch('refreshProductList', url)
        },
        firstPage(context) {
            var url = context.state.headerLinks[0].first.url
            context.dispatch('refreshProductList', url)
        },
        lastPage(context) {
            var url = context.state.headerLinks[0].last.url
            context.dispatch('refreshProductList', url)
        },
        prevPage(context) {
            var url = context.state.headerLinks[0].prev.url
            context.dispatch('refreshProductList', url)
        },
        async refreshProductList(context,url) {
            await axios.get(url)
            .then(response =>{
                var pages = context.state.headerLinks
                var parsedLinks = parse(response.headers.link)
                if(parsedLinks != undefined) {
                    pages = [{first: parsedLinks.first, next: parsedLinks.next, prev: parsedLinks.prev, last: parsedLinks.last, productsCount: response.headers['x-total-count']}]
                }
                else {
                    pages[0].productsCount = response.headers['x-total-count']
                } 
                context.commit('setHeaderLinks', pages)
                context.commit('setProductList', response.data)})
        },
        async filterProductList(context) {
            var url = context.state.headerLinks[0].first.url.replace(/&q.+/, '') + '&q=' + context.state.searchValue
            context.dispatch('refreshProductList', url) 
        },
        
        checkValidationNumber(context, { value, index} ) {
            value = value.replace(/\D/g, '')
            context.commit('setQuantityInput', { value, index })
        },
        
    },
    mutations:{
        setProductList(state, products) {
            state.products = products
        },
        setHeaderLinks(state, links) {
            state.headerLinks = links
        },
        setSearchValue(state, value) {
            state.searchValue = value
        },
        
        
        incrementProductCount(state, { index, productCount }) {
            Vue.set(state.products[index], index, parseInt(productCount) + 1)  
        },
        decrementProductCount(state, { index, productCount }) {
            Vue.set(state.products[index], index, parseInt(productCount) - 1) 
        },
        setQuantityInput(state, { value, index }) {
            Vue.set(state.products[index], index, value) 
        },
        
    }
}