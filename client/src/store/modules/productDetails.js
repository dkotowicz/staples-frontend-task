import axios from 'axios';
const API = 'http://localhost:3005/products';

export default {
    state:{
        productDetails: null,
        showProductDetails: false,
        productQuantityInput: 1
    },
    getters:{
        productDetails(state,getters) {
            return state.productDetails
        },
        showProductDetails(state, getters) {
            return state.showProductDetails
        },
        productQuantityInput(state, getters){
            return state.productQuantityInput
        }
    },
    actions:{
        async findProductById(context, productId) {
            await axios.get(API + '/' + productId)
            .then(response =>{
                context.commit('setProductDetails', response.data)
                context.commit('changeStatusComponentDetails')})
        },
        checkValidationProductNumber(context, value) {
            value = value.replace(/\D/g, '')
            context.commit('setProductQuantityInput', value)
        },
        incrementProductQuantity(context) {
            var value = parseInt(context.state.productQuantityInput)
            context.commit('setProductQuantityInput', value + 1)
        },
        decrementProductQuantity(context) {
            var value = parseInt(context.state.productQuantityInput)
            context.commit('setProductQuantityInput', value - 1)
        }

    },
    mutations:{
        setProductDetails(state,product) {
            state.productDetails = product
        },
        changeStatusComponentDetails(state) {
            state.showProductDetails = !state.showProductDetails
        },
        setProductQuantityInput(state, value) {
            state.productQuantityInput = value
        },
    }
}