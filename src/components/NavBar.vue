<template>
  <div class="nav-bar">
    <v-toolbar dark app>
      <v-toolbar-title class="white--text">Hivent</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn fab dark color="indigo" @click="setShowEventDialog(true)">
        <v-icon dark>add</v-icon>
      </v-btn>

    </v-toolbar>
  </div>
</template>

<script>

import {mapActions} from 'vuex'

export default {
  data() {
    return {}
  },
  methods: {
    ...mapActions(['setShowEventDialog'])
  }
}
</script>

<style scoped lang="scss">
</style>