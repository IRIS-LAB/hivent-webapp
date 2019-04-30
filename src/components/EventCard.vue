<template>
  <div class="event-card">
    <v-card>
      <v-img :src="event.image" height="180px"></v-img>

      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{ event.title }}</h3>
          <div>{{eventDateLabel}}</div>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat>Détails</v-btn>
        <v-btn flat color="purple">S'inscrire</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'event',
  props: {
    event
  },
  data: () => ({
    show: false
  }),
  computed: {
    eventDateLabel() {
      console.log('startDAte :: ', typeof this.event.startDate)
      const lblDate =
        'Le ' +
        moment(this.event.startDate).format('DD/MM/YYYY') +
        ' de ' +
        moment(this.event.startDate).format('HH:mm') +
        ' à ' +
        moment(this.event.endDate).format('HH:mm')
      return lblDate
    }
  }
}
</script>

<style scoped lang="scss">
.event-card {
  margin: 10px;
  background-color: white;
  width: 300px;
}
</style>