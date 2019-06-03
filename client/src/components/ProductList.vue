<template>
    <div>
        <h1>Product list</h1>
        <input type="Text" placeholder="search in the store"/>
        <ul>
            <li v-for="product in products" :key="product.id">
                <img :src="product.images.primary.large"/>
                <p>{{product.general.name}}</p>
                <p>{{product.general.presentable_id}}</P>
                <button>Add to cart</button>
                <button>Detail</button>
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
  },
  methods: {
      nextPage() {
          this.$store.dispatch('nextPage')
      },
      prevPage() {
          this.$store.dispatch('prevPage')
      }
  },
  created() {
      this.$store.dispatch('fetchProductList')
  },
}
</script>