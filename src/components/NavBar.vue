<template>
  <div class="nav-bar">
    <v-toolbar dark app>
      <v-toolbar-title class="white--text">Hivent</v-toolbar-title>
      <v-spacer></v-spacer>

      <event-dialog></event-dialog>
    </v-toolbar>
  </div>
</template>

<script>
import EventDialog from '@/views/EventDialog'

export default {
  components: {
    EventDialog
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="scss">
</style>