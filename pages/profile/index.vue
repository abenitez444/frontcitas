<template>
  <v-container fluid fill-height class="page-layout-1">
    <v-row class="block-section">
      <v-col cols="3">
        <v-card class="cm-round-1 cm-elevation-1">
          <v-card-text class="pa-8">
            <v-sheet color="transparent">
              <v-row no-gutters>
                <v-col>
                  <!-- <h1>hey</h1> -->
                </v-col>
              </v-row>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-sheet color="transparent">
          <v-row no-gutters>
            <v-col>
              <v-card color="accent_3" class="cm-round-1 cm-elevation-1 light">
                <v-card-text class="pa-8">
                  <v-sheet color="transparent">
                    <v-row align="center">
                      <v-col cols="auto">
                        <img :src="accountIcon" alt="" />
                      </v-col>
                      <v-col>
                        <p class="mb-0">
                          Por favor, complete la información de su perfil para
                          disfrutar de todas las caracteristicas de la
                          aplicación
                        </p>
                      </v-col>
                    </v-row>
                  </v-sheet>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row no-gutters class="mt-8">
            <v-col>
              <v-card class="cm-round-1 cm-elevation-1">
                <v-card-text class="pa-8">
                  <h2 class="font_one--text">Perfil</h2>
                  <v-sheet color="transparent">
                    <!-- file -->
                    <v-row>
                      <v-col>
                        <v-file-input
                          accept="image/*"
                          label="File input"
                          hide-details=""
                        ></v-file-input>
                      </v-col>
                    </v-row>
                    <!-- Name -->
                    <v-row>
                      <v-col>
                        <v-text-field
                          label="Nombre"
                          solo
                          hide-details=""
                          v-model="user.firstname"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          label="Apellido"
                          solo
                          hide-details=""
                          v-model="user.lastname"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <!-- Email -->
                    <v-row>
                      <v-col>
                        <v-text-field
                          label="Correo"
                          solo
                          hide-details=""
                          v-model="user.email"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <!-- Birthday | civil state -->
                    <v-row>
                      <v-col>
                        <v-dialog
                          ref="dialog"
                          v-model="modalBirthday"
                          :return-value.sync="user.birth_day"
                          persistent
                          width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="user.birth_day"
                              label="Fecha de nacimiento"
                              append-icon="mdi-calendar"
                              readonly
                              solo
                              v-bind="attrs"
                              v-on="on"
                              hide-details=""
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="user.birth_day"
                            scrollable
                            locale="es-ve"
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="primary"
                              @click="modalBirthday = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.dialog.save(user.birth_day)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-dialog>
                      </v-col>
                      <v-col>
                        <v-select
                          :items="civilStates"
                          label="Estado civil"
                          hide-details=""
                          v-model="user.civil_status"
                          solo
                        ></v-select>
                      </v-col>
                    </v-row>
                    <!-- Nivel Economico | Sugar baby  -->
                    <v-row>
                      <v-col>
                        <v-select
                          :items="economyStratos"
                          label="Nivel Economico"
                          hide-details=""
                          v-model="user.economyStrato"
                          solo
                        ></v-select>
                      </v-col>
                      <v-col>
                        <v-text-field
                          label="¿Qué buscas en una Sugar Baby?"
                          solo
                          hide-details=""
                          v-model="user.email"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <!-- Cita ideal -->
                    <v-row>
                      <v-col>
                        <v-textarea
                          solo
                          rows="3"
                          row-height="20"
                          label="¿Cual es tu cita ideal?"
                          hide-details=""
                          v-model="user.perfect_date"
                        ></v-textarea>
                      </v-col>
                    </v-row>

                    <!-- intereses, hobbies | body type -->
                    <v-row>
                      <v-col>
                        <v-text-field
                          label="Cuentanos sobre tus intereses o hobbies"
                          solo
                          hide-details=""
                          v-model="user.sugar_baby"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-select
                          :items="bodyTypes"
                          :item-text="(item) => item.name"
                          :item-value="(item) => item.id"
                          label="Estado físico"
                          hide-details=""
                          v-model="user.bodyType"
                          solo
                        ></v-select>
                      </v-col>
                    </v-row>
                    <!-- region -->
                    <v-row>
                      <v-col>
                        <v-select
                          :items="regions"
                          :item-text="(item) => item.name"
                          :item-value="(item) => item.id"
                          label="Región"
                          hide-details=""
                          v-model="user.region"
                          solo
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-sheet>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
      <v-col cols="3">
        <v-card class="cm-round-1 cm-elevation-1">
          <v-card-text class="pa-8">
            <v-sheet color="transparent">
              <v-row no-gutters>
                <v-col>
                  <!-- <h1>hey</h1> -->
                </v-col>
              </v-row>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- <v-row>
      <pre>{{ bodyTypes }}</pre>
    </v-row> -->
  </v-container>
</template>

<script>
import accountIcon from '@/assets/ui-icon-account.svg'
import authMixin from '@/mixins/authMixin'
import resourcesMixin from '@/mixins/resources'
export default {
  mixins: [authMixin, resourcesMixin],
  data() {
    return {
      //?icons
      accountIcon,
      //?request
      userR: {},
      //?form
      modalBirthday: false,
      user: {},
      civilStates: ['Soltero', 'Casado'],
      economyStratos: ['Medio', 'Alto', 'Muy Alto'],
      bodyType: ['Atlético', 'Delgado', 'Medio', 'Robusto'],
    }
  },
  mounted() {
    this.getProfile()
    this.getRegions()
    this.getBodyTypes()
  },
  methods: {
    async getProfile() {
      // this.loadingForm = true
      const { token } = JSON.parse(localStorage.getItem('wdc_token'))
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      await this.$axios
        .$get(`${this.$axios.defaults.baseURL}auth/profile/4`, config)
        .then((res) => {
          console.debug(res)
          // this.loadingForm = false
          this.userR = res
          // this.authenticating(res)
        })
        .catch((e) => {
          console.debug(e)
          // this.loadingForm = false
          // this.errors = e.response.data.error
        })
    },
  },
}
</script>

<style lang="scss">
$top-margin: 114px;
.cm-round-1 {
  border-radius: 10px !important;
}
.cm-elevation-1 {
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1) !important;
}
.page-layout-1 {
  max-width: 1710px;
  margin-top: $top-margin;
}
.block-section {
  min-height: calc(100vh - #{$top-margin});
}
</style>
