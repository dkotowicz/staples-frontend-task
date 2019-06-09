<template>
  <div>
    <Alert v-if="showAlert"/>
    <ProductList/>
    <ProductDetails v-if="showProductDetails"/>
    <ShoppingCart/>
  </div>
</template>

<script>
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import ShoppingCart from './components/ShoppingCart';
import Alert from './components/Alert';
export default {
    name: 'app',
    components: {
        ProductList,
        ProductDetails,
        ShoppingCart
    },
    computed: {
        showProductDetails() {
            return this.$store.getters.showProductDetails
        },
        showAlert() {
            return this.$store.getters.showAlert
        },
        created() {
            this.$store.dispatch('createCart')
        },
    }
}
</script>
<style src="./assets/css/main.css">


