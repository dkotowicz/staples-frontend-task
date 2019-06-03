import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios';

Vue.use(Vuex)

const API = 'http://localhost:3005/products';

export default new Vuex.Store({
    state: {
        products: []
    },
    getters: {
        productList(state, getters) {
            return state.products
        }
    },
    actions: {  
        async fetchProductList(context) {
            await axios.get(API)
            .then(response => (context.commit('fetchProductsApi', response.data)))
        }
    },
    mutations: {
        fetchProductsApi(state, products) {
            state.products = products
        }
    }
})