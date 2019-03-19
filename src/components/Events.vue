<template>
  <div class="events">
    <v-layout row wrap>
      <v-flex v-for="event in events" v-bind:key="event.id" xs12 sm6 md4 lg3>
        <event-card :event="event"></event-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard'
import { mapState } from 'vuex'

export default {
  name: 'events',
  components: {
    EventCard
  },
  computed: {
    ...mapState(['events'])
  }
}
</script>

<style scoped lang="scss">
</style>