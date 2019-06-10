<template>
  <div>
    <Alert v-if="showAlert"/>
    <ProductList/>
    <ProductDetails v-if="showProductDetails"/>
  </div>
</template>

<script>
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Alert from './components/Alert';
export default {
    name: 'app',
    components: {
        ProductList,
        ProductDetails,
        Alert
    },
    computed: {
        showProductDetails() {
            return this.$store.getters.showProductDetails
        },
        showAlert() {
            return this.$store.getters.showAlert
        },
        created() {
        },
    }
}
</script>
<style src="./assets/css/main.css">


