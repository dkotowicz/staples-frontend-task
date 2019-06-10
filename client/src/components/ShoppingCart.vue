<template>
    <div v-if="productsCountInCart > 0">
        <!-- Items -->
        <div class="block shadow-2xl overflow-auto h-72 sm:h-96 md:h-96 lg:h-72 xl:h-72">
            <div v-for="product in products" :key="product.id">
                <div class="flex  border-gray-600 border-b-2 hover:bg-gray-200">
                    <div class="w-1/3 items-center flex">
                        <img class="ml-2 flex-no-wrap " :src="product.images.primary.large"/>
                    </div>
                    <div class="w-2/3 block m-4 text-sm sm:text-4xl md:text-4xl lg:text-sm xl:text-sm">
                        <p >{{product.general.name}}</p>
                        <p class="text-left text-gray-600 font-bold">Quantity: {{product.quantity}}</p>
                        <button class="text-gray-500 hover:text-gray-800 text-lg sm:text-5xl md:text-5xl lg:text-lg xl:text-lg" @click="removeProductFromCart(product.id)"><i class="fa fa-trash" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Empty cart -->
    <div v-else class="m-8 text-center">
        <span class="text-gray-700 text-2xl sm:text-4xl md:text-4xl lg:text-2xl xl:text-2xl my-2">Your shopping cart is empty</span>
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
    methods: {
        removeProductFromCart(productId) {
            this.$store.dispatch('removeProductFromCart', productId)
        }
    },
    created() {
        this.$store.dispatch('fetchCart')
    }
}
</script>
