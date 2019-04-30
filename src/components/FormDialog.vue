<template>
  <div class="form-dialog">
    <v-dialog v-model="displayDialog" max-width="80%">
      <v-btn fab dark color="indigo" slot="activator">
        <v-icon dark>add</v-icon>
      </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Créer un évènement</span>
        </v-card-title>
        <v-card-text>
          <v-layout wrap>
            <v-flex xs12 sm6>
              <v-text-field style="margin:5px" label="Titre" v-model="event.title"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-textarea rows="5" label="Description" v-model="event.description"/>
            </v-flex>            
            <v-flex xs12 sm6>
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
                  slot="activator"
                  v-model="date.day"
                  label="Date"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="date.day" @input="displayDatePicker = false"></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field
                style="margin:5px"
                type="time"
                label="Heure début"
                v-model="date.startHour"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field style="margin:5px" type="time" label="Heure fin" v-model="date.endHour"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field style="margin:5px" type="number" label="Nombre de places" min="1" v-model="event.maxSeatsNb"></v-text-field>
            </v-flex>                        
            <v-flex xs12 sm6>
              <v-text-field style="margin:5px" label="Administrateur" v-model="administratorId"></v-text-field>
            </v-flex>    
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn dark color="indigo" @click="displayDialog = false">Fermer</v-btn>
          <v-btn dark color="indigo" @click="addEvent">Valider</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      displayDialog: false,
      displayDatePicker: false,
      administratorId: '',
      event: { title: '', description: '', startDate: '', endDate: '', administratorIds: [], speakerIds: [], maxSeatsNb: 1},
      date: { day: new Date().toISOString().substr(0, 10), startHour: '', endHour: '' }
    }
  },
  methods: {
    ...mapActions(['createEvent']),

    addEvent: async function() {
      let eventDate = new Date(this.date.day)
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
      
    }
  }
}
</script>

<style scoped lang="scss">
</style>