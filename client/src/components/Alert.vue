<template>
<div>
  <p class="">{{alert}}</p>
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
