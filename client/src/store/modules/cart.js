import axios from 'axios';
const API = 'http://localhost:3005/products';
export default {
    state:{
        shoppingCartUrl: '',
        showShoppingCart: false,
        shoppingCart: [],
        productsCountInCart: 0,
    },
    getters:{
        shoppingCart(state,getters) {
            return state.shoppingCart
        },
        showShoppingCart(state, getters) {
            return state.showShoppingCart
        },
        productsCountInCart(state, getters) {
            return state.productsCountInCart
        },
    },
    actions:{
        createCart(context) {
            if(!localStorage.getItem('cart')) {
                localStorage.setItem('cart', JSON.stringify([]))
            }
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
    },
    mutations:{
        setShoppingCart(state, shoppingCart) {
            state.shoppingCart = shoppingCart
        },
        changeStatusShoppingCart(state) {
            state.showShoppingCart = !state.showShoppingCart
        },
        setShoppingUrl(state, url) {
            state.shoppingCartUrl = url
        },
        setProductsCountInCart(state, productsCount) {
            state.productsCountInCart = productsCount
        },
    }
}