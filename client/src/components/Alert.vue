<template>
<div class="alert-container">
  <p class="text-white text-center pt-2 text-xl sm:text-5xl md:text-5xl lg:text-xl xl:text-xl">{{alert}}</p>
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
