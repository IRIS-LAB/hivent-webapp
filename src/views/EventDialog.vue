<template>
  <div class="event-dialog">
    <v-dialog :value="true" min-width="50%" max-width="70%" persistent id="eventDialog">
      <v-form ref="form" v-model="valid">
        <v-card>
          <v-card-title class="title-bar">
            <span class="headline">Créer un évènement</span>
          </v-card-title>
          <v-card-text>
            <v-layout wrap>
              <v-flex xs12 sm12>
                <v-text-field
                  style="margin:5px"
                  label="Titre"
                  v-model="event.title"
                  :rules="titleRules"
                  :error-messages="getErrors('title')"
                  @input="clearErrors('title')"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  label="Image"
                  v-model="imageFile"
                  @click="pickImageFile"
                  prepend-icon="attach_file"
                ></v-text-field>
                <input
                  type="file"
                  style="display: none"
                  ref="image"
                  accept="image/*"
                  @change="imageFilePicked"
                />
              </v-flex>
              <v-spacer></v-spacer>
              <img :src="imageUrl" height="150" v-if="imageUrl" />

              <!--input id="image" type="file" name="files[]"-->
              <v-flex xs12 sm12>
                <v-textarea
                  rows="4"
                  label="Description"
                  v-model="event.description"
                  :error-messages="getErrors('description')"
                  @input="clearErrors('description')"
                />
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
                    :rules="dayRules"
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
                  :rules="startHourRules"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm4>
                <v-text-field
                  style="margin:5px"
                  type="time"
                  label="Heure fin"
                  v-model="date.endHour"
                  :rules="endHourRules"
                  :error-messages="getErrors('endDate')"
                  @input="clearErrors('endDate')"
                ></v-text-field>
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
              <v-flex xs12 sm10>
                <v-text-field
                  style="margin:5px"
                  type="string"
                  label="Animateurs"
                  v-model="speakerIds"
                  :rules="speakerIdsRules"
                  :error-messages="getErrors('speakerIds')"
                  @input="clearErrors('speakerIds')"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-layout row justify-end>
            <v-card-actions>
              <v-btn style="color: white" color="indigo" @click="setShowEventDialog(false)">Fermer</v-btn>
              <v-btn
                style="color: white"
                color="indigo"
                @click="addEvent"
                :disabled="!valid"
              >Valider</v-btn>
            </v-card-actions>
          </v-layout>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import moment from 'moment'
import { required } from '../utils/RulesUtils'
// import { uploadImage } from '../utils/BucketUtils'

export default {
  name: 'EventDialog',
  data() {
    return {
      displayDatePicker: false,
      administratorId: '',
      speakerIds: '',
      // TODO: Set administrator id with connected user mail
      event: {
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        administratorIds: ['admin@systeme-u.fr'],
        speakerIds: [],
        maxSeatsNb: 1
      },
      date: { day: undefined, startHour: '', endHour: '' },
      imageFile: '',
      imageUrl: undefined,
      valid: false,

      // rules
      titleRules: [required()],
      dayRules: [required()],
      startHourRules: [required()],
      endHourRules: [required()],
      speakerIdsRules: [required()]
    }
  },
  computed: {
    ...mapGetters(['getErrors']),
    dateAsPickerDateFormat() {
      return this.date.day ? this.date.day.format('YYYY-MM-DD') : null
    },
    dateAsTextFieldFormat() {
      return this.date.day ? this.date.day.format('DD/MM/YYYY') : null
    }
  },
  methods: {
    ...mapActions([
      'createEvent',
      'setShowEventDialog',
      'setErrors',
      'clearErrors'
    ]),
    /**
     * Add event
     * Call the API to save the event
     */
    addEvent: async function() {
      // date and hours
      const eventDate = new Date(moment(this.date.day).toDate())
      const splittedStartHour = this.date.startHour.split(':')
      eventDate.setHours(splittedStartHour[0])
      eventDate.setMinutes(splittedStartHour[1])
      this.event.startDate = eventDate.toISOString()

      const splittedEndHour = this.date.endHour.split(':')
      eventDate.setHours(splittedEndHour[0])
      eventDate.setMinutes(splittedEndHour[1])
      this.event.endDate = eventDate.toISOString()

      this.event.speakerIds = this.speakerIds ? this.speakerIds.split(',') : []

      // image
      // console.log('imageFile : ', this.imageFile)

      // upload image
      // const imageURL = await uploadImage()
      // this.event.administratorIds.push(this.administratorId)
      try {
        const newEvent = await this.createEvent(this.event)
        this.setShowEventDialog(false)
      } catch (error) {
        // TODO : if the API not reached ?
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
    },
    pickImageFile() {
      this.$refs.image.click()
    },
    imageFilePicked(e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.imageFile = files[0].name
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.title-bar {
  background-color: #3f51b5;
  color: white;
}
</style>
