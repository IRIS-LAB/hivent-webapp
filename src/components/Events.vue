<template>
  <div class="events">
    <v-layout row wrap align-center justify-space-around>
      <span v-for="event in events" v-bind:key="event.id">
        <event-card :event="event"></event-card>
      </span>
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