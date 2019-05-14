import Vue from 'vue'
import Vuex from 'vuex'
import { BusinessException, TechnicalException } from '@u-iris/iris-common'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    events: [],
    showEventDialog: false
  },
  mutations: {
    setEvents(state, events) {
      state.events = events
    },
    setShowEventDialog(state, showEventDialog) {
      state.showEventDialog = showEventDialog
    }
  },
  actions: {
    async findEvents({ commit }) {
      const data = await fetch(process.env.VUE_APP_EVENTS_API_URI + '/events', { method: 'GET', mode: 'cors' })
      const events = await data.json()
      events.forEach(event => {
        event.startDate = new Date(event.startDate)
        event.endDate = new Date(event.endDate)
      })
      commit('setEvents', events)
    },
    async createEvent({ dispatch }, event) {
      const data = await fetch(process.env.VUE_APP_EVENTS_API_URI + '/events', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify(event)
      })
      const json = await data.json()
      switch (data.status) {
        case 400:
          throw new BusinessException(json.erreurs)
        case 201:
          dispatch('findEvents')
          break
        default:
          throw new TechnicalException(json.erreurs)
      }
    },
    setShowEventDialog({ commit }, showEventDialog) {
      commit('setShowEventDialog', showEventDialog)
    }
  }
})
