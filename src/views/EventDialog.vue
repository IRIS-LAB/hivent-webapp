<template>
  <div class="event-dialog">
    <v-dialog v-model="displayDialog" min-width="50%" max-width="70%">
      <v-btn fab dark color="indigo" slot="activator">
        <v-icon dark>add</v-icon>
      </v-btn>
      <v-card>
        <v-card-title class="title-bar">
          <span class="headline">Créer un évènement</span>
        </v-card-title>
        <v-card-text>
          <v-layout wrap>
            <v-flex xs12 sm6>
              <v-text-field style="margin:5px" label="Titre" v-model="event.title"></v-text-field>
            </v-flex>
            <v-flex xs12 sm12>
              <v-textarea rows="4" label="Description" v-model="event.description"/>
            </v-flex>
            <v-flex xs12 sm4>
              <v-menu
                v-model="displayDatePicker"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  style="margin:5px"
                  :value="dateAsTextFieldFormat"
                  @blur="setDateFromTextFieldFormat"
                  slot="activator"
                  label="Date"
                  prepend-icon="event"
                  hint="DD/MM/YYYY"
                  persistent-hint
                ></v-text-field>
                <v-date-picker
                  @input="setDateFromDatePicker"
                  :value="dateAsPickerDateFormat"
                  locale="fr"
                  no-title
                ></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 sm4>
              <v-text-field
                style="margin:5px"
                type="time"
                label="Heure début"
                v-model="date.startHour"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm4>
              <v-text-field style="margin:5px" type="time" label="Heure fin" v-model="date.endHour"></v-text-field>
            </v-flex>
            <v-flex xs12 sm2>
              <v-text-field
                style="margin:5px"
                type="number"
                label="Nombre de places"
                min="1"
                v-model="event.maxSeatsNb"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-layout row justify-end>
          <v-card-actions>
            <v-btn dark color="indigo" @click="displayDialog = false">Fermer</v-btn>
            <v-btn dark color="indigo" @click="addEvent">Valider</v-btn>
          </v-card-actions>
        </v-layout>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'

export default {
  data() {
    return {
      displayDialog: false,
      displayDatePicker: false,
      administratorId: '',
      // TODO: Set administrator id with connected user mail
      event: { title: '', description: '', startDate: '', endDate: '', administratorIds: ['admin@systeme-u.fr'], speakerIds: [], maxSeatsNb: 1 },
      date: { day: undefined, startHour: '', endHour: '' }
    }
  },
  computed: {
    dateAsPickerDateFormat() {
      return this.date.day ? this.date.day.format('YYYY-MM-DD') : null
    },
    dateAsTextFieldFormat() {
      return this.date.day ? this.date.day.format('DD/MM/YYYY') : null
    }
  },
  methods: {
    ...mapActions(['createEvent']),

    addEvent: async function() {
      let eventDate = new Date(moment(this.date.day).toDate())
      const splittedStartHour = this.date.startHour.split(':')
      eventDate.setHours(splittedStartHour[0])
      eventDate.setMinutes(splittedStartHour[1])
      this.event.startDate = eventDate.toISOString()

      const splittedEndHour = this.date.endHour.split(':')
      eventDate.setHours(splittedEndHour[0])
      eventDate.setMinutes(splittedEndHour[1])
      this.event.endDate = eventDate.toISOString()

      this.event.administratorIds.push(this.administratorId)
      try {
        await this.createEvent(this.event)
        this.displayDialog = false
      } catch (error) {
        console.log(error.errors)
      }
    },

    setDateFromDatePicker(val) {
      this.displayDatePicker = false
      if (!val) return
      this.date.day = moment(val, 'YYYY-MM-DD')
      // this.$emit('input', this.date.day.format('YYYY-MM-DD'))
    },
    setDateFromTextFieldFormat(event) {
      const val = event.target.value
      if (!val) return
      this.date.day = moment(val, 'DD/MM/YYYY')
      //this.$emit('input', this.date.day.format('YYYY-MM-DD'))
    }
  }
}
</script>

<style scoped lang="scss">
.title-bar {
  background-color: #3f51b5;
  color: white

  }
</style>