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
import { mapState, mapActions } from 'vuex'

export default {
  name: 'events',
  components: {
    EventCard
  },
  computed: {
    ...mapState(['events'])
  },
  methods: {
    ...mapActions(['findEvents'])
  },
  mounted() {
    this.findEvents()
  }
}
</script>

<style scoped lang="scss">
</style>