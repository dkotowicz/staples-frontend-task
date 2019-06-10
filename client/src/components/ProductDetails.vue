<template>
    <!-- container -->
    <div class="fixed overflow-auto bg-smoke-dark w-full h-full inset-0 z-10">
        <div @click.self="closeProductDetails" class="flex justify-center">
            <div class="bg-white w-2/3 sm:w-full md:w-full lg:w-2/3 xl:w-2/3  block rounded pb-3 mt-16 sm:mt-8 md:mt-8 lg:mt-16 xl:mt-16 px-2">
                
                <!-- closeIcon -->
                <div class="flex justify-end pt-2 pr-4">
                    <button class="text-gray-600 text-lg sm:text-5xl md:text-5xl lg:text-base xl:text-lg hover:text-gray-800 " @click="closeProductDetails"><i class="fa fa-times"></i></button>
                </div>

                <!-- Item -->
                <div class="flex w-auto mb-8 sm:block md:block lg:flex xl:flex"> 
                    <div class="w-1/3 sm:w-full md:w-full lg:w-1/3 xl:w-1/3 flex justify-center">
                        <div class="block">
                            <img class="ml-2 flex-no-wrap sm:ml-0 md:ml-0 lg:ml-0 xl:ml-0 w-full" :src="product.images.primary.large"/>
                             <p class="text-left text-xl sm:text-4xl md:text-4xl lg:text-xl xl:text-xl text-gray-700 text-center">product id: {{product.general.presentable_id}}</p>
                            <div class="inline-flex p-2 flex justify-center mx-auto w-full text-lg sm:text-5xl md:text-5xl lg:text-base xl:text-lg">
                                <button class="bg-gray-300 hover:bg-gray-500 text-gray-800 font-bold py-2 px-2 sm:px-8 md:px-8 lg:px-2 xl:px-2 border rounded-l" @click="decrementProductCount">-</button>
                                <input class="bg-gray-100 hover:bg-gray-500 text-gray-800 py-2 border-t border-b text-center w-12 sm:w-32 md:w-32 lg:w-15 xl:w-12" v-model="productCount" placeholder="1" @input="checkValidationNumber">
                                <button class="bg-gray-300 hover:bg-gray-500 text-gray-800 font-bold py-2 px-8 px-2 sm:px-8 md:px-8 lg:px-2 xl:px-2 border" @click="productCount += 1">+</button>
                                <div>
                                    <button class="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-r border" @click="addToCart(productCount, product.id)">Add to <i class="fa fa-shopping-cart"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex w-2/3 sm:w-full md:w-full lg:w-2/3 xl:w-2/3">
                        <div class="block w-full">
                            <div class="text-center text-gray-700 font-bold text-4xl sm:text-6xl md:text-6xl lg:text-4xl xl:text-4xl ">
                                <p>{{product.brand.name}}</p>
                                <p class="text-black"> {{product.general.name}} </p>
                            </div>
                            <div class="text-gray-700 pl-3 mt-4 sm:mt-2 md:mt-2 lg:mt-4 xl:mt-4 text-lg sm:text-4xl md:text-4xl lg:text-lg xl:text-lg">
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
        }
    },
    data() {
        return {
            productCount: 1
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
        },
        checkValidationNumber() {
            this.productCount = this.productCount.replace(/\D/g, '')
        },
        decrementProductCount() {
            if(this.productCount > 0) {
                this.productCount -= 1
            }
        }
    },
    created() {
    },
}
</script>