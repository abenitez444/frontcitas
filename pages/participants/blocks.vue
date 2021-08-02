<template>
  <!-- content -->
  <v-col
    cols="12"
    sm="12"
    md="8"
    lg="6"
    class="participants-page order-2 order-md-1"
  >
    <v-sheet color="transparent">
      <!-- <v-row>
        <pre>
          {{ participants }}
        </pre>
      </v-row> -->
      <!-- timeline -->
      <v-row no-gutters class="participants-wrapper">
        <v-col>
          <v-card class="cm-round-1 cm-elevation-1">
            <v-card-text class="pa-8">
              <v-sheet>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                    lg="4"
                    xl="4"
                    v-for="(item, i) in participants"
                    :key="i"
                  >
                    <v-card>
                      <v-card-text class="participant-card">
                        <div
                          class="participant-thumbnail bg-img"
                          :style="`background-image: url('${img_baseUrl}${item.avatar}');`"
                        ></div>
                        <div class="participant-name">
                          <p class="mb-0">
                            {{ item.first_name }} {{ item.last_name }}
                          </p>

                          <p class="age-location">
                            {{ calculateAge(item.birth_day) }} Años -
                            {{ item.region.name }}
                          </p>
                        </div>
                        <div class="interactions">
                          <v-btn fab icon small color="primary" class="ml-4"
                            ><v-icon>mdi-account</v-icon></v-btn
                          >
                          <v-btn
                            fab
                            icon
                            small
                            :to="`/messages/${item.id}`"
                            color="primary"
                            ><v-icon>mdi-message</v-icon></v-btn
                          >
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
  </v-col>
</template>

<script>
import authMixin from '@/mixins/authMixin'
import resources from '@/mixins/resources'
import loadingMixin from '@/mixins/loadingMixin'
import snackMixin from '@/mixins/snackMixin'
export default {
  mixins: [authMixin, resources, loadingMixin, snackMixin],
  middleware: ['authenticated'],
  layout: 'dashboard',
  data() {
    return {
      reportDialog: false,
      participants: [],
    }
  },
  mounted() {
    this.getParticipants()
    alert('Falta integracion con api')
  },
  methods: {
    async getParticipants() {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      await this.$axios
        .$get(`${this.$axios.defaults.baseURL}auth/opposite-sex`, config)
        .then((res) => {
          // console.debug(res)
          this.loadingOff()
          this.participants = res.users
        })
        .catch((e) => {
          this.loadingOff()
          console.debug(e)
          this.snackbarOn(
            'Ha ocurrido un problema al cargar los participantes por favor pongase en contacto con el soporte.'
          )
        })
    },
    calculateAge(dateString) {
      var today = new Date()
      var birthDate = new Date(dateString)
      var age = today.getFullYear() - birthDate.getFullYear()
      var m = today.getMonth() - birthDate.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      return age
    },
  },
  computed: {},
}
</script>

<style lang="scss">
.participants-page {
  .participants-wrapper {
    z-index: 6;
    position: relative;
  }
  .participant-card {
    // display: grid;
    .participant-thumbnail {
      min-height: 200px;
      border-radius: 5px;
    }
    .participant-name {
      margin-top: 1.5rem;
      font-size: 18px;
      font-weight: bold;
      margin: 1.5rem 0.5rem 1rem 0.5rem;
    }
    .age-location {
      font-size: 14px;
      opacity: 0.7;
    }
    .interactions {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
