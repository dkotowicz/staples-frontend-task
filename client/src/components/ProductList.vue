<template>
    <div>
        <h1>Product list</h1>
        <input type="Text" placeholder="search in the store" @input="filterProducts" v-model="searchValue"/>
        <ul>
            <li v-for="(product, index) in products" :key="product.id">
                <img :src="product.images.primary.large"/>
                <p>{{product.general.name}}</p>
                <p>{{product.general.presentable_id}}</P>
                <input type="number" v-model="product[index]"/>
                <button @click="addToCart(product[index], product.id)">Add to cart</button>
                <button @click="productDetails(product.id)">Detail</button>
            </li>
        </ul>
        <button @click="prevPage">Previous</button>
        <button @click="nextPage">Next</button>
    </div>
</template>

<script>
export default {
  name: 'productList',
  computed: {
      products() {
          return this.$store.getters.productList
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
      filterProducts() {
          this.$store.dispatch('filterProductList')
      },
      productDetails(productId) {
          this.$store.dispatch('findProductById', productId)
      },
      addToCart(quantity, productId) {
          this.$store.dispatch('addProductToCart', {quantity, productId})
        },
  },
  created() {
      this.$store.dispatch('fetchProductList')
  },
}
</script>