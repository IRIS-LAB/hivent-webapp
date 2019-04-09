import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    events: []
  },
  mutations: {
    setEvents(state, events) {
      state.events = events
    }
  },
  actions: {
    async findEvents({ commit }) {
      let data = await fetch(process.env.VUE_APP_EVENTS_API_URI + '/events', { method: 'GET', mode: 'cors' })
      let events = await data.json()
      console.log(events)
      events.forEach(event => {
        event.startDate = new Date(event.startDate)
        event.endDate = new Date(event.endDate)
      })
      commit('setEvents', events)
    }
  }
})
