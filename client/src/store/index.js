import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios';
import parse from 'parse-link-header';
Vue.use(Vuex)

const API = 'http://localhost:3005/products';

export default new Vuex.Store({
    state: {
        products: [],
        productDetails: null,
        headerLinks: [],
        searchValue: '',
        showProductDetails: false
    },
    getters: {
        productList(state, getters) {
            return state.products
        },
        searchValue(state,getters) {
            return state.searchValue
        },
        productDetails(state,getters) {
            return state.productDetails
        },
        showProductDetails(state, getters) {
            return state.showProductDetails
        }
    },
    actions: {
        async fetchProductList(context) {
            var url = API + '?_page=1'
            context.dispatch('refreshProductList', url)
        },
        async nextPage(context) {
            var url = context.state.headerLinks.next.url
            context.dispatch('refreshProductList', url)
        },
        async prevPage(context) {
            var url = context.state.headerLinks.prev.url
            context.dispatch('refreshProductList', url)
        },
        async refreshProductList(context,url) {
            await axios.get(url)
            .then(response =>{
                context.commit('setHeaderLinks', response.headers.link)
                context.commit('setProductList', response.data)})
        },
        async filterProductList(context) {
            var url = context.state.headerLinks.first.url.replace(/&q.+/, '') + '&q=' + context.state.searchValue
            context.dispatch('refreshProductList', url)
        },
        async findProductById(context, productId) {
            await axios.get(API + '/' + productId)
            .then(response =>{
                context.commit('setProductDetails', response.data)
                context.commit('changeStatusComponentDetails')})

        }
    },
    mutations: {
        setProductList(state, products) {
            state.products = products
        },
        setHeaderLinks(state, links) {
            links != '' ? state.headerLinks = parse(links) : null
        },
        setSearchValue(state, value) {
            state.searchValue = value
        },
        setProductDetails(state,product) {
            state.productDetails = product
        },
        changeStatusComponentDetails(state) {
            state.showProductDetails = !state.showProductDetails
        }
    }
})