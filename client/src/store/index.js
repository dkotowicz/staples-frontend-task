import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios';
import parse from 'parse-link-header';
Vue.use(Vuex)

const API = 'http://localhost:3005/products';

export default new Vuex.Store({
    state: {
        products: [],
        headerLinks: [],
    },
    getters: {
        productList(state, getters) {
            return state.products
        }
    },
    actions: {
        async fetchProductList(context) {
            await axios.get(API + '?_page=1')
            .then(response =>{ 
                context.commit('setHeaderLinks', response.headers.link)
                context.commit('fetchProductsApi', response.data)})
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
                context.commit('setProductList', response.data)}
            )
        }
    },
    mutations: {
        fetchProductsApi(state, products) {
            state.products = products
        },
        setProductList(state, products) {
            state.products = products
        },
        setHeaderLinks(state, links) {
            state.headerLinks = parse(links)
        }
    }
})