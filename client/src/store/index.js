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
        headerLinks: [{
            first: undefined,
            next: undefined,
            prev: undefined,
            last: undefined,
            productsCount: 0
        }],
        searchValue: '',
        shoppingCartUrl: '',
        showProductDetails: false,
        showShoppingCart: false,
        shoppingCart: [],
        showAlert: false,
        alertText: '',
        productsCountInCart: 0,
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
        },
        showShoppingCart(state, getters) {
            return state.showShoppingCart
        },
        shoppingCart(state,getters) {
            return state.shoppingCart
        },
        showAlert(state, getters) {
            return state.showAlert
        },
        alertText(state, getters) {
            return state.alertText
        },
        productsCountInCart(state, getters) {
            return state.productsCountInCart
        },
        headerLinks(state, getters) {
            return state.headerLinks
        }
    },
    actions: {
        async fetchProductList(context) {
            var url = API + '?_limit=12&_page=1'
            context.dispatch('refreshProductList', url)
        },
        createCart(context) {
            if(!localStorage.getItem('cart')) {
                localStorage.setItem('cart', JSON.stringify([]))
            }
            context.dispatch('calculateProductsInCart')     
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
        async findProductById(context, productId) {
            await axios.get(API + '/' + productId)
            .then(response =>{
                context.commit('setProductDetails', response.data)
                context.commit('changeStatusComponentDetails')})
        },
        addProductToCart(context, {quantity, productId}) {
            quantity = parseInt(quantity)
            var found = false
            var cart = JSON.parse(localStorage.getItem('cart'))
            cart.map(product => {
                if(product.productId == productId) {
                    product.quantity += quantity
                    found = true
                }  
            })
            if(found == false) {
                cart.push({productId, quantity})
            }
            localStorage.setItem('cart', JSON.stringify(cart))
            context.commit('setAlertText', 'Product was added to your cart')
            context.commit('changeStatusAlert')
            context.dispatch('fetchCart')
            context.dispatch('calculateProductsInCart')
        },
        async fetchCart(context) { 
            context.dispatch('getCartUrl') 
            const cart = JSON.parse(localStorage.getItem('cart'))
            if(cart.length > 0) {
                if(context.state.shoppingCartUrl != null) {
                    await axios.get(context.state.shoppingCartUrl)
                    .then(response => {
                         var products = response.data.map(product => ({
                            ...cart.find((cartItem) => (cartItem.productId === product.id)),
                            ...product
                        }))
                        context.commit('setShoppingCart', products)
                    }) 
                }
            }
        },
        getCartUrl(context){
            const cart = JSON.parse(localStorage.getItem('cart'))
            if(cart.length > 0) {
                var concatIds = '' 
                cart.map(product => {
                    concatIds = concatIds + '&id=' + product.productId
                })
                context.commit('setShoppingUrl', API + '?_limit=' + cart.length + concatIds)
            }
        },
        calculateProductsInCart(context) {
            var productsCount = 0
            var cart = JSON.parse(localStorage.getItem('cart'))
            cart.map(product => {
                productsCount += product.quantity
            })
            context.commit('setProductsCountInCart', productsCount)
        },
        removeProductFromCart(context, productId) {
            const cart = JSON.parse(localStorage.getItem('cart'))
            var cartNew = cart.filter(product => {
                return product.productId != productId
            })
            localStorage.setItem('cart', JSON.stringify(cartNew))
            context.dispatch('calculateProductsInCart')
            context.dispatch('fetchCart')
            context.commit('setAlertText', 'Product has been removed from cart ')
            context.commit('changeStatusAlert')
        },
        checkValidationNumber(context, { value, index} ) {
            value = value.replace(/\D/g, '')
            context.commit('setQuantityInput', { value, index })
        }
    },
    mutations: {
        setProductList(state, products) {
            state.products = products
        },
        setHeaderLinks(state, links) {
            state.headerLinks = links
        },
        setSearchValue(state, value) {
            state.searchValue = value
        },
        setProductDetails(state,product) {
            state.productDetails = product
        },
        setShoppingCart(state, shoppingCart) {
            state.shoppingCart = shoppingCart
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
        changeStatusComponentDetails(state) {
            state.showProductDetails = !state.showProductDetails
        },
        changeStatusShoppingCart(state) {
            state.showShoppingCart = !state.showShoppingCart
        },
        setShoppingUrl(state, url) {
            state.shoppingCartUrl = url
        },
        setAlertText(state, text) {
            state.alertText = text
        },
        changeStatusAlert(state) {
            state.showAlert = true
            setTimeout(()=>{
                state.showAlert = false
             },1000); 
        },
        setProductsCountInCart(state, productsCount) {
            state.productsCountInCart = productsCount
        },
    }
})