<template>
  <div id='app'>
    <ProductList/>
    <ProductDetails v-if="showProductDetails"/>
  </div>
</template>

<script>
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';

export default {
  name: 'app',
  components: {
    ProductList,
    ProductDetails
  },
  computed: {
    showProductDetails() {
          return this.$store.getters.showProductDetails
      }
  },
}
</script>

<style>
</style>
