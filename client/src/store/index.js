import Vuex from 'vuex'
import Vue from 'vue'
import cart from './modules/cart'
import productList from './modules/productList'
import productDetails from './modules/productDetails'
import alert from './modules/alert'
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        cart,
        productList,
        productDetails,
        alert
    },
    state: { 
         
    },
    getters: {

    },
    actions:{

    },
    mutations: {    
    }
})