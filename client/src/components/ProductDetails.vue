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
        <input type="number" v-model="product[0]"/>
        <button @click="addToCart(product[0], product.id)">Add to cart</button>
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
    methods: {
        closeProductDetails() {
            this.$store.commit('changeStatusComponentDetails')
        },
        addToCart(quantity, productId) {
          this.$store.dispatch('addProductToCart', {quantity, productId})
        },
    },
    created() {
    },
}
</script>