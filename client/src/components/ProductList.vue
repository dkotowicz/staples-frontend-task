<template>
<div class="block min-h-full">
  <!-- logo -->
  <div class="header">
    <div class="flex-1">eCommerce</div>
  </div>
  <!-- top -->
  <div class="mx-8 sm:mx-0 md:mx-0 lg:mx-24 xl:mx-32">
    <div class="flex flex-wrap flex-wrap mt-4 border-gray-400 sticky top-0 bg-gray-200 p-1 z-10 ">
      <!-- search -->
      <div class="top-button justify-start sm:justify-center md:justify-center lg:justify-start xl:justify-start">
        <input class="search-input" v-model="searchValue" @input="filterProducts" placeholder="Search..." >
        <button class="search-button" @click="filterProducts"><i class="fa fa-search"></i></button>
      </div>
      <!-- cart button -->
      <div class="top-button justify-end sm:justify-center md:justify-center lg:justify-end xl:justify-end">
        <div class="relative inline-block w-1/2 sm:w-full md:w-full lg:w-1/2 xl:w-1/2">
          <button class="cart-button" @click="changeStatusShoppingCart"><i class="fa fa-shopping-cart pr-4"></i>Cart
            <span class="font-light pl-4">({{productsCountInCart}} products)</span>
          </button>
          <div v-if="showShoppingCart" class="absolute block bg-gray-400 text-gray-700 w-full">
            <ShoppingCart/>
          </div>
        </div>
      </div> 
    </div>
    <!-- container -->
    <div class="flex flex-wrap justify-around mt-4">
      <!-- item -->
      <div class="product-container" v-for="(product, index) in products" :key="product.id">
        <p class="product-list-id">product id: {{product.general.presentable_id}}</p>
        <img :src="product.images.primary.large">
        <p class="product-list-title">{{product.general.name}}</p>
        <!-- item button-->
        <div class="inline-flex my-8 product-text">
          <button class="product-button rounded mr-2 sm:mr-4 md:mr-8 lg:mr-2 xl:mr-2 w-auto" @click="productDetails(product.id)"><i class="fa fa-eye pr-3"></i>Info</button>
          <button class="inc-dec-button rounded-l" @click="decrementProductCount(index, product[index])">-</button>
          <input class="quantity-input" v-model="product[index]" placeholder="1" @input="checkValidationNumber(product[index], index)">
          <button class="inc-dec-button" @click="incrementProductCount(index, product[index])">+</button>
          <div>
              <button class="product-button rounded-r border" @click="addToCart(product[index], product.id, index)">Add to <i class="fa fa-shopping-cart"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- pagination -->
  <div class="flex justify-center">
    <div v-if="headerLinks[0].productsCount > 13" class="inline-flex mt-4 mb-8 justify-center flex">
        <button v-if="headerLinks[0].first != undefined" class="pagination-button rounded-l" @click="firstPage"><i class="fa fa-angle-double-left"></i></button>
        <button v-if="headerLinks[0].prev != undefined" class="pagination-button" @click="prevPage"><i class="fa fa-angle-left"></i></button>
        <button v-if="headerLinks[0].next != undefined" class="pagination-button" @click="nextPage"><i class="fa fa-angle-right"></i></button>
        <button v-if="headerLinks[0].last != undefined" class="pagination-button rounded-r" @click="lastPage"><i class="fa fa-angle-double-right"></i></button>
    </div>
  </div>
  <!-- footer -->
  <footer class="footer"></footer>
</div>
</template>


<script>
import ShoppingCart from './ShoppingCart';
export default {
  name: 'productList',
  components: {
    ShoppingCart
  },
  computed: {
    products() {
      return this.$store.getters.productList
    },
    productsCountInCart() {
      return this.$store.getters.productsCountInCart;
    },
    headerLinks() {
      return this.$store.getters.headerLinks
    },
    searchValue: {
      get() {
        return this.$store.getters.searchValue
      },
      set(value) {
        this.$store.commit('setSearchValue', value) 
      }
    },
    showShoppingCart() {
      return this.$store.getters.showShoppingCart
    },
  },
  methods: {
      nextPage() {
        this.$store.dispatch('nextPage')
      },
      prevPage() {
        this.$store.dispatch('prevPage')
      },
      firstPage() {
        this.$store.dispatch('firstPage')
      },
      lastPage() {  
        this.$store.dispatch('lastPage')
      },
      filterProducts() {
        this.$store.dispatch('filterProductList')
      },
      productDetails(productId) {
        this.$store.dispatch('findProductById', productId)
      },
      changeStatusShoppingCart() {
        this.$store.commit('changeStatusShoppingCart');
      },
      addToCart(quantity, productId, index) {
        if(quantity == undefined) {
          quantity = 1
        }
        else if(quantity == 0) {
          return 
        }
        this.$store.dispatch('addProductToCart', { quantity, productId })
        var defaultValue = 1
        this.$store.commit('setQuantityInput', { defaultValue, index })
      },
      incrementProductCount(index, productCount) {
        if(productCount == undefined || productCount == '') {
          productCount = 1
        }
        this.$store.commit('incrementProductCount', { index, productCount }) 
      },
      decrementProductCount(index, productCount) {
        if(productCount == undefined || productCount == 0) {
          productCount = 1
        }
        this.$store.commit('decrementProductCount', { index, productCount })
      },
      checkValidationNumber(value, index) {
        this.$store.dispatch('checkValidationNumber', { value, index })
      }
  },
  created() {
      this.$store.dispatch('fetchProductList')
      this.$store.dispatch('createCart')
  },
}
</script>