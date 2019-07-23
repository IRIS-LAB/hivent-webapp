<template>
  <div v-if="isLoading" class="loader">
    <v-progress-circular class="ma-auto" :size="70" :width="7" color="primary" indeterminate></v-progress-circular>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Loader',
  computed: {
    ...mapState(['isLoading'])
  }
}
</script>

<style scoped>
.loader {
  opacity: 0.33;
  display: flex;
  background-color: black;
  position: fixed;
  z-index: 999;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>