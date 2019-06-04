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
        }
    },
    created() {
    },
}
</script>