<template>
    <div>
        <h1>ProductDetails</h1>
        <p @click="closeProductDetails">X</p>
        <img :src="product.images.primary.large"/>
        <p>{{product.general.name}}</p>
        <p>{{product.general.presentable_id}}</p>
        <p>{{product.id}}</p>
        <p>{{product.brand.name}}</p>
        <p v-html="product.general.description"></p>
        <button @click="decrementProductCount">-</button>
        <input v-model="product" placeholder="1" @input="checkValidationNumber">
        <button @click="productCount += 1">+</button>
        <button @click="addToCart(product, product.id)">Add to cart</button>
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