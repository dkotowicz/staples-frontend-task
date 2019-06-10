<template>
<div class="fixed overflow-auto w-1/4 sm:w-full md:w-full lg:w-1/4 xl:w-1/4 inset-0 z-20 items-central mx-auto h-12 sm:h-24 md:h-24 lg:h-12 xl:h-12 bg-gray-600 rounded-b">
  <p class="text-white text-center items-central pt-2 text-xl sm:text-5xl md:text-5xl lg:text-xl xl:text-xl">{{alert}}</p>
</div>
</template>

<script>
export default {
  computed: {
    alert() {
      return this.$store.getters.alertText
    }
  },
}
</script>
