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
    errors: [],
    isLoading: false,
    confirm: {
      display: false,
      title: null,
      message: null,
      callbackConfirmed: null,
      callbackCanceled: null
    }
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
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading
    },
    setConfirm(state, confirm) {
      state.confirm = confirm
    }
  },
  actions: {
    setIsLoading({ commit }, isLoading) {
      commit('setIsLoading', isLoading)
    },
    showConfirm({ commit }, confirm) {
      commit('setConfirm', confirm)
    },
    closeConfirm({ commit }) {
      commit('setConfirm', { display: false })
    },
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
    async createEvent({ dispatch, commit }, { event, image }) {
      const data = await fetch(process.env.VUE_APP_EVENTS_API_URI + '/events', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify(event)
      })

      if (data.status == 201) {
        await dispatch('uploadImage', {
          image: image,
          eventId: (await data.json()).id
        })
        await dispatch('findEvents')
      } else {
        const errors = await data.json().erreurs
        commit('setErrors', errors)
        await transformErrorToException(data)
      }
    },
    async uploadImage({ commit }, { image, eventId }) {
      const newImage = {
        image: image.split(',')[1],
        format: image.split('image/')[1].split(';')[0]
      }
      const data = await fetch(
        process.env.VUE_APP_EVENTS_API_URI + `/events/${eventId}/image`,
        {
          method: 'PUT',
          headers: { 'content-type': 'application/json' },
          mode: 'cors',
          body: JSON.stringify(newImage)
        }
      )

      if (data.status != 200) {
        const errors = await data.json().erreurs
        commit('setErrors', errors)
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
    },
    handleDeleteEvent({ dispatch, state }, eventId) {
      dispatch('showConfirm', {
        display: true,
        title: `Supprimer l'événement`,
        message: `Confirmez vous la suppression de l'événement ?`,
        callbackConfirmed: async () => {
          try {
            await dispatch('deleteEvent', eventId)
            dispatch('closeConfirm')
          } catch (error) {
            dispatch('closeConfirm')
            dispatch('showConfirm', {
              display: true,
              title: `ERREUR`,
              message: `Impossible de supprimer`,
              callbackConfirmed: async () => {
                dispatch('closeConfirm')
              }
            })
          }
        },
        callbackCanceled: () => {
          dispatch('closeConfirm')
        }
      })
    },
    async deleteEvent({ dispatch }, eventId) {
      const data = await fetch(
        process.env.VUE_APP_EVENTS_API_URI + `/events/${eventId}`,
        {
          method: 'DELETE',
          mode: 'cors'
        }
      )
      if (data.ok) {
        await dispatch('findEvents')
      } else {
        await transformErrorToException(data)
      }
    }
  }
})
