<template>
  <div class="nav-bar">
    <v-toolbar dark app>
      <v-toolbar-title class="white--text">Hivent</v-toolbar-title>
      <v-spacer></v-spacer>

      <form-dialog></form-dialog>
    </v-toolbar>
  </div>
</template>

<script>
import FormDialog from '@/components/FormDialog'

export default {
  components: {
    FormDialog
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="scss">
</style>