import axios from 'axios';
const API = 'http://localhost:3005/products';

export default {
    state:{
        productDetails: null,
        showProductDetails: false,
    },
    getters:{
        productDetails(state,getters) {
            return state.productDetails
        },
        showProductDetails(state, getters) {
            return state.showProductDetails
        },
    },
    actions:{
        async findProductById(context, productId) {
            await axios.get(API + '/' + productId)
            .then(response =>{
                context.commit('setProductDetails', response.data)
                context.commit('changeStatusComponentDetails')})
        },
    },
    mutations:{
        setProductDetails(state,product) {
            state.productDetails = product
        },
        changeStatusComponentDetails(state) {
            state.showProductDetails = !state.showProductDetails
        },
    }
}