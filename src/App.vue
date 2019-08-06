<template>
  <v-app id="app">
    <nav-bar></nav-bar>
    <v-content>
      <event-dialog v-if="showEventDialog"></event-dialog>
      <router-view />
    </v-content>
    <loader />
    <confirm :display="confirm.display" :title="confirm.title" :message="confirm.message" :callbackConfirmed="confirm.callbackConfirmed" :callbackCanceled="confirm.callbackCanceled" />
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar'
import EventDialog from '@/views/EventDialog'
import Loader from '@/components/Loader.vue'
import Confirm from '@/components/Confirm.vue'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: { NavBar, EventDialog, Loader, Confirm },
  computed: {
    ...mapState(['showEventDialog', 'confirm'])
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #efefef;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
