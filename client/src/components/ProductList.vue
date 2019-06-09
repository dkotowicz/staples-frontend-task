<template>
    <div>
        <h1>Product list</h1>
        <input type="Text" placeholder="search in the store" @input="filterProducts" v-model="searchValue"/>
        <ul>
            <li v-for="(product, index) in products" :key="product.id">
                <img :src="product.images.primary.large"/>
                <p>{{product.general.name}}</p>
                <p>{{product.general.presentable_id}}</p>
                <input type="number" v-model="product[index]"/>
                <button @click="decrementProductCount(index, product[index])">-</button>
                <input v-model="product[index]" placeholder="1" @input="checkValidationNumber(product[index], index)">
                <button @click="incrementProductCount(index, product[index])">+</button>
                <button @click="productDetails(product.id)">Detail</button>
            </li>
        </ul>
        <div v-if="headerLinks[0].productsCount > 13" >
          <button v-if="headerLinks[0].first != undefined" @click="firstPage"><<</button>
          <button v-if="headerLinks[0].prev != undefined" @click="prevPage"><</button>
          <button v-if="headerLinks[0].next != undefined" @click="nextPage">></button>
          <button v-if="headerLinks[0].last != undefined" @click="lastPage">>></button>
        </div>  
    </div>
</template>

<script>
export default {
  name: 'productList',
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
    }
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
  },
}
</script>