<template>
    <!-- container -->
    <div class="fixed overflow-auto bg-smoke-dark w-full h-full inset-0 z-10">
        <div @click.self="closeProductDetails" class="flex justify-center">
            <div class="product-detail-container">

                <!-- closeIcon -->
                <div class="flex justify-end pt-2 pr-4">
                    <button class="close-button" @click="closeProductDetails"><i class="fa fa-times"></i></button>
                </div>

                <!-- Item -->
                <div class="flex w-auto mb-8 sm:block md:block lg:flex xl:flex"> 
                    <div class="w-1/3 sm:w-full md:w-full lg:w-1/3 xl:w-1/3 flex justify-center">
                        <div class="block">
                            <img :src="product.images.primary.large"/>
                             <p class="product-detail-id">product id: {{product.general.presentable_id}}</p>
                            <div class="inline-flex p-2 flex justify-center mx-auto w-full product-text">
                                <button class="inc-dec-button rounded-l" @click="decrementProductQuantity">-</button>
                                <input class="quantity-input" v-model="productQuantityInput" placeholder="1" @input="checkValidationNumber(productQuantityInput)">
                                <button class="inc-dec-button" @click="incrementProductQuantity">+</button>
                                <div>
                                    <button class="product-button rounded-r border" @click="addToCart(productQuantityInput, product.id)">Add to <i class="fa fa-shopping-cart"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="product-information-container">
                        <div class="block w-full">
                            <div class="product-detail-title">
                                <p>{{product.brand.name}}</p>
                                <p class="text-black"> {{product.general.name}} </p>
                            </div>
                            <div class="product-description">
                                <p v-html="product.general.description"></p>
                            </div>
                        </div>
                    </div>   
                </div>
            </div>
        </div>
    </div>   
</template>

<script>
export default {
    name: 'productList',
    computed: {
        product() {
            return this.$store.getters.productDetails
        },
        productQuantityInput:{
            get(){
                return this.$store.getters.productQuantityInput
            },
            set(value) {
                return this.$store.commit('setProductQuantityInput', value)
            } 
        } 
    },
    
    methods: {
        closeProductDetails() {
            this.$store.commit('changeStatusComponentDetails')
        },
        addToCart(quantity, productId) {
            if(quantity == undefined) {
                quantity = 1
            }
            else if(quantity == 0) {
                return 
            }
            this.$store.dispatch('addProductToCart', {quantity, productId})
            this.$store.commit('setProductQuantityInput', 1)
        },
        checkValidationNumber(value) {
            this.$store.dispatch('checkValidationProductNumber', value)
        },
        decrementProductQuantity() {
            if(this.productQuantityInput == undefined || this.productQuantityInput == '') {
                this.$store.commit('setProductQuantityInput', 1)
            }
            this.$store.dispatch('decrementProductQuantity')
        },
        incrementProductQuantity() {
            if(this.productQuantityInput == undefined || this.productQuantityInput == '') {
                this.$store.commit('setProductQuantityInput', 0)
            }
            this.$store.dispatch('incrementProductQuantity')
        }
    },
    created() {
    },
}
</script>