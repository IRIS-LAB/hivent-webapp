<template>
  <div class="event-card">
    <v-card>
      <v-img :src="`https://picsum.photos/500/300?image=${event.id + 10}`" height="180px"></v-img>
      <v-card-title primary-title>
        <div>
          <div class="headline">{{ event.title }}</div>
          <span class="grey--text">{{ event.id }}</span>
        </div>
      </v-card-title>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat>Share</v-btn>
        <v-btn flat color="purple">Explore</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'event',
  props: {
    event
  },
  data: () => ({
    show: false
  })
}
</script>

<style scoped lang="scss">
.event-card {
  margin: 10px;
  background-color: white;
  width: 300px;
}
</style>