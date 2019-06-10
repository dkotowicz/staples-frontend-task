<template>
<div class="block min-h-full">
  <!-- logo -->
  <div class="flex items-center bg-gray-700 shadow-lg block">
    <div class="flex-1 text-white text-center text-6xl sm:text-7xl md:text-7xl lg:text-6xl xl:text-6xl">eCommerce</div>
  </div>
  <!-- navigation -->
  <div class="mx-8 sm:mx-0 md:mx-0 lg:mx-24 xl:mx-32">
    <div class="flex flex-wrap flex-wrap mt-4 border-gray-400 sticky top-0 bg-gray-200 p-1 z-10 ">
      <!-- search -->
      <div class="flex w-1/2 sm:w-full md:w-full lg:w-1/2 xl:w-1/2 justify-start sm:justify-center md:justify-center lg:justify-start xl:justify-start m-0 sm:m-4 md:m-4 lg:m-0 xl:m-0">
        <input class="p-2 bg-white rounded-l-lg text-gray-800 w-auto sm:w-full md:w-full lg:w-auto xl:w-auto text-xl sm:text-5xl md:text-5xl lg:text-xl xl:text-xl" v-model="searchValue" @input="filterProducts" placeholder="Search..." >
        <button class="w-auto flex justify-end items-center text-gray-600 p-3 bg-white rounded-r-lg hover:text-gray-700 text-xl sm:text-5xl md:text-5xl lg:text-xl xl:text-xl" @click="filterProducts"><i class="fa fa-search"></i></button>
      </div>
      <!-- cart button -->
      <div class="flex w-1/2 sm:w-full md:w-full lg:w-1/2 xl:w-1/2 justify-end sm:justify-center md:justify-center lg:justify-end xl:justify-end m-0 sm:m-4 md:m-4 lg:m-0 xl:m-0">
        <div class="relative inline-block w-1/2 sm:w-full md:w-full lg:w-1/2 xl:w-1/2">
          <button class="bg-gray-700 text-white font-bold p-2 rounded hover:bg-gray-600 w-full text-xl sm:text-5xl md:text-5xl lg:text-xl xl:text-xl" @click="changeStatusShoppingCart"><i class="fa fa-shopping-cart pr-4"></i>Cart
            <span class="font-light pl-4 visible sm:invisible md:visible lg:visible xl:visible">({{productsCountInCart}} products)</span>
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
      <div class="text-gray-700 text-center bg-white px-4 py-2 m-2 rounded w-sm sm:w-5/6 md:w-5/6 lg:max-w-sm xl:max-w-sm shadow-lg" v-for="(product, index) in products" :key="product.id">
        <p class="text-left text-xs sm:text-4xl md:text-4xl lg:text-xs xl:text-xs text-gray-500">product id: {{product.general.presentable_id}}</p>
        <img class="m-4 sm:m-1 md:m-1 lg:m-4 xl:m-4" :src="product.images.primary.large">
        <p class="text-center font-bold text-lg sm:text-5xl md:text-5xl lg:text-lg xl:text-lg m-4 sm:m-1 md:m-1 lg:m-4 xl:m-4">{{product.general.name}}</p>
        <!-- item button-->
        <div class="inline-flex my-8 text-lg sm:text-5xl md:text-5xl lg:text-base xl:text-lg">
          <button class="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded mr-2 sm:mr-4 md:mr-8 lg:mr-2 xl:mr-2 w-auto" @click="productDetails(product.id)"><i class="fa fa-eye pr-3"></i>Info</button>
          <button class="bg-gray-300 hover:bg-gray-500 text-gray-800 font-bold py-2 px-2 sm:px-8 md:px-8 lg:px-2 xl:px-2 border rounded-l" @click="decrementProductCount(index, product[index])">-</button>
          <input class="bg-gray-100 hover:bg-gray-500 text-gray-800 py-2 border-t border-b text-center w-12 sm:w-32 md:w-32 lg:w-15 xl:w-12" v-model="product[index]" placeholder="1" @input="checkValidationNumber(product[index], index)">
          <button class="bg-gray-300 hover:bg-gray-500 text-gray-800 font-bold py-2 px-2 sm:px-8 md:px-8 lg:px-2 xl:px-2 border" @click="incrementProductCount(index, product[index])">+</button>
          <div>
              <button class="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-r border" @click="addToCart(product[index], product.id, index)">Add to <i class="fa fa-shopping-cart"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- pagination -->
  <div class="flex justify-center">
    <div v-if="headerLinks[0].productsCount > 13" class="inline-flex mt-4 mb-8 justify-center flex text-xl sm:text-4xl md:text-4xl lg:text-base xl:text-xl">
        <button v-if="headerLinks[0].first != undefined" class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 justify-center rounded-l" @click="firstPage"><i class="fa fa-angle-double-left"></i></button>
        <button v-if="headerLinks[0].prev != undefined" class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 justify-center " @click="prevPage"><i class="fa fa-angle-left"></i></button>
        <button v-if="headerLinks[0].next != undefined" class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 justify-center " @click="nextPage"><i class="fa fa-angle-right"></i></button>
        <button v-if="headerLinks[0].last != undefined" class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 justify-center rounded-r" @click="lastPage"><i class="fa fa-angle-double-right"></i></button>
    </div>
  </div>
  <!-- footer -->
  <footer class="bg-gray-700 w-full h-12"></footer>
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