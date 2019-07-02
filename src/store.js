import Vue from 'vue'
import Vuex from 'vuex'
import { transformErrorToException } from './utils/ExceptionUtils'
import { getTranslatedMessage } from './utils/TranslationsUtils'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    events: [],
    showEventDialog: false,
    errors: []
  },
  getters: {
    getErrors: state => field => {
      if (state.errors) {
        return state.errors
          .filter(error => error.champErreur.startsWith(field))
          .map(error => getTranslatedMessage(error))
          .join('<br>')
      }
    }
  },
  mutations: {
    setEvents(state, events) {
      state.events = events
    },
    setShowEventDialog(state, showEventDialog) {
      state.showEventDialog = showEventDialog
    },
    setErrors(state, errors) {
      state.errors = errors
    }
  },
  actions: {
    async findEvents({ commit }) {
      const data = await fetch(process.env.VUE_APP_EVENTS_API_URI + '/events', {
        method: 'GET',
        mode: 'cors'
      })
      const events = await data.json()
      events.forEach(event => {
        event.startDate = new Date(event.startDate)
        event.endDate = new Date(event.endDate)
      })
      commit('setEvents', events)
    },
    async createEvent({ dispatch, commit }, event) {
      const data = await fetch(process.env.VUE_APP_EVENTS_API_URI + '/events', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify(event)
      })

      if (data.status == 201) dispatch('findEvents')
      else {
        const errors = await data.json().erreurs
        commit('setErrors', errors)
        console.log(errors)
        await transformErrorToException(data)
      }
    },
    setShowEventDialog({ commit }, showEventDialog) {
      commit('setShowEventDialog', showEventDialog)
    },
    setErrors({ commit }, errors) {
      commit('setErrors', errors)
    },
    clearErrors({ commit, state }, field) {
      commit(
        'setErrors',
        state.errors.filter(error => {
          return !error.champErreur.startsWith(field)
        })
      )
    }
  }
})
