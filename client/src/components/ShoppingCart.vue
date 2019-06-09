<template>
    <div v-if="productsCountInCart > 0">
        <h1>Shopping Cart</h1>
        <ul>
            <li v-for="product in products" :key="product.id">
                <img :src="product.images.primary.large"/>
                <p>{{product.general.name}}</p>
                <p>{{product.general.presentable_id}}</p>
                <p>{{product.quantity}}</p>
            </li>
             
        </ul>
    </div>
</template>

<script>
export default {
    name: 'shoppingCart',
    computed: {
        products() {
            return this.$store.getters.shoppingCart
        },
        productsCountInCart() {
            return this.$store.getters.productsCountInCart;
        },
    },
    created() {
        this.$store.dispatch('fetchCart')
    }
}
</script>

<style>
</style>
