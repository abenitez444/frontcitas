<template>
  <v-container fluid fill-height class="page-layout-1 profile">
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
                      <v-col cols="auto" class="d-flex align-center">
                        <img :src="accountIcon" alt="" />
                      </v-col>
                      <v-col>
                        <p class="mb-0 info-description">
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
        <v-sheet color="transparent">
          <!-- profile -->
          <v-row no-gutters>
            <v-col>
              <v-card class="cm-round-1 cm-elevation-1 profile-card">
                <v-card-text class="pa-8">
                  <v-sheet>
                    <!-- head -->
                    <v-row align="center">
                      <v-col cols="auto" class="avatar-wrapper">
                        <img
                          class="profile-card__avatar"
                          src="http://placehold.it/90"
                          alt=""
                        />
                        <img
                          :src="membershipIcon"
                          class="profile-card__membership"
                          alt=""
                        />
                      </v-col>
                      <v-col>
                        <h2 class="profile-card__name font_one--text">
                          John Doe
                          <span class="profile-card__icon">
                            <img :src="maleIcon" alt="" />

                            <!-- <img :src="femaleIcon" alt="" /> -->
                          </span>
                        </h2>
                        <h3 class="profile-card__region font_one--text">
                          Lima
                        </h3>
                      </v-col>
                    </v-row>
                    <!-- Profile state -->
                    <v-row no-gutters class="mt-4">
                      <v-col class="account-progress">
                        <p class="mb-0 font_one--text account-progress__label">
                          Estado de cuenta
                        </p>
                        <v-progress-linear
                          color="primary"
                          height="10"
                          rounded
                          :value="percent"
                        ></v-progress-linear>
                        <div
                          class="percent text-right account-progress__percent"
                        >
                          {{ percent }}%
                        </div>
                      </v-col>
                    </v-row>
                  </v-sheet>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- Menu -->
          <v-row no-gutters class="mt-8">
            <v-col>
              <v-card class="cm-round-1 cm-elevation-1">
                <v-card-text class="pa-8"> </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- Users online -->
          <v-row no-gutters class="mt-8">
            <v-col>
              <v-card class="cm-round-1 cm-elevation-1">
                <v-card-text class="pa-8"> </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import accountIcon from '@/assets/ui-icon-account.svg'
import maleIcon from '@/assets/ui-icon-male.svg'
import femaleIcon from '@/assets/ui-icon-female.svg'
import membershipIcon from '@/assets/ui-icon-membership.svg'
import authMixin from '@/mixins/authMixin'
import resourcesMixin from '@/mixins/resources'
export default {
  mixins: [authMixin, resourcesMixin],
  data() {
    return {
      //?icons
      accountIcon,
      maleIcon,
      femaleIcon,
      membershipIcon,
      //?request
      userR: {},
      //?form
      modalBirthday: false,
      user: {},
      civilStates: ['Soltero', 'Casado'],
      economyStratos: ['Medio', 'Alto', 'Muy Alto'],
      bodyType: ['Atlético', 'Delgado', 'Medio', 'Robusto'],
      //? profile card
      percent: 50,
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
.profile {
  .info-description {
    font-weight: bold;
    font-size: 14px;
    line-height: 17px;
    // letter-spacing: -0.025em;
    color: #f5f7fa;
  }
  .profile-card {
    &__name {
      font-weight: bold;
      font-size: 18px;
      // line-height: 30px;
    }
    &__avatar {
      border: 3px solid #ffffff;
      box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
      border-radius: 15px;
    }
    &__icon {
      margin-left: 10px;
    }
    &__region {
      font-weight: bold;
      font-size: 14px;
      // line-height: 30px;
      opacity: 0.5;
    }
    &__membership {
      position: absolute;
      width: 25px;
      height: auto;
      bottom: 0;
      right: 0;
      transform: translate(-25%, -75%);
    }
    .avatar-wrapper {
      position: relative;
    }
  }
  .account-progress {
    &__label {
      font-weight: bold;
      font-size: 16px;
      line-height: 30px;
      opacity: 0.5;
    }
    &__percent {
      font-weight: bold;
      font-size: 14px;
      line-height: 30px;
      color: #f42f43;
      opacity: 0.5;
    }
  }
}

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
