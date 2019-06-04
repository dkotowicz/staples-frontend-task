<template>
  <div id='app'>
    <ProductList/>
    <ProductDetails v-if="showProductDetails"/>
    <ShoppingCart/>
  </div>
</template>

<script>
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import ShoppingCart from './components/ShoppingCart';

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
      }
  },
  created() {
    this.$store.dispatch('createCart')
  },
}
</script>

<style>
</style>
