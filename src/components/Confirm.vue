<template>
  <v-dialog :value="display" @keydown.esc="ok" persistent width="50%">
    <v-card>
      <v-toolbar color="primary" dense flat>
        <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text v-show="!!message">{{ message }}</v-card-text>
      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-btn small color="primary" @click="this.$emit('okConfirm')">Valider</v-btn>
        <v-btn small color="secondary" @click="this.$emit('cancelConfirm')">Annuler</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Confirm',
  props: ['display', 'title', 'message']
}
</script>