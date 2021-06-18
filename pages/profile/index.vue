<template>
  <v-container fluid fill-height class="page-layout-1 profile">
    <v-row class="block-section">
      <!-- Users list -->
      <v-col cols="3">
        <v-card class="cm-round-1 cm-elevation-1">
          <v-card-text class="pa-8">
            <v-sheet color="transparent">
              <v-row no-gutters>
                <v-col> En desarrollo </v-col>
              </v-row>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- content -->
      <v-col cols="6">
        <v-sheet color="transparent">
          <!-- info -->
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
          <!-- formulario -->
          <v-row no-gutters class="mt-8">
            <v-col>
              <v-card class="cm-round-1 cm-elevation-1" v-if="user !== null">
                <v-card-text class="pa-8">
                  <h2 class="font_one--text mb-5">Perfil</h2>
                  <!-- hombre -->
                  <template v-if="user.gender === 1">
                    <v-sheet color="transparent">
                      <!-- file -->
                      <div class="custom-file-wrapper mx-auto mb-8">
                        <v-file-input
                          @change="Preview_image"
                          v-model="image"
                          height="100px"
                          class="custom-file-input"
                          accept="image/*"
                          label=""
                          hide-details=""
                          prepend-icon=""
                          @click:clear="resetThumbnail()"
                        >
                        </v-file-input>
                        <div
                          v-if="url"
                          class="preview-image"
                          :style="`background-image: url('${url}')`"
                        ></div>
                      </div>
                      <!-- <v-row>
                        <v-col>
                          <v-file-input
                            v-model="avatarFile"
                            height="100px"
                            class="custom-file-input"
                            accept="image/*"
                            label=""
                            hide-details=""
                            prepend-icon=""
                            solo
                          ></v-file-input>
                          <v-avatar>
                            <img
                              src="https://cdn.vuetifyjs.com/images/john.jpg"
                              alt="John"
                            />
                          </v-avatar>
                        </v-col>
                      </v-row> -->
                      <!-- Name -->
                      <v-row>
                        <v-col>
                          <v-text-field
                            label="Nombre"
                            solo
                            hide-details=""
                            v-model="user.first_name"
                            color="primary"
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field
                            label="Apellido"
                            solo
                            hide-details=""
                            v-model="user.last_name"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <!-- profession -->
                      <v-row>
                        <v-col>
                          <v-text-field
                            label="Profesión"
                            solo
                            hide-details=""
                            v-model="user.profession"
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
                          <!-- <v-select
                            :items="economyStratos"
                            label="Nivel Economico"
                            hide-details=""
                            v-model="user.economyStrato"
                            solo
                          ></v-select> -->
                          <v-text-field
                            label="Nivel Economico"
                            solo
                            hide-details=""
                            v-model="user.monthly_salary"
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field
                            label="¿Qué buscas en una Sugar Baby?"
                            solo
                            hide-details=""
                            v-model="user.what_i_want"
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
                            v-model="user.ideal_date"
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
                            v-model="user.hobbies"
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <v-select
                            :items="bodyTypes"
                            :item-text="(item) => item.name"
                            :item-value="(item) => item.id"
                            label="Estado físico"
                            hide-details=""
                            v-model="user.id_physical_figure"
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
                            v-model="user.id_region"
                            solo
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-sheet>
                  </template>

                  <!-- mujer -->
                  <template v-else-if="user.gender === 0">
                    <v-sheet color="transparent">
                      <!-- file -->
                      <div class="custom-file-wrapper mx-auto mb-8">
                        <v-file-input
                          @change="Preview_image"
                          v-model="image"
                          height="100px"
                          class="custom-file-input"
                          accept="image/*"
                          label=""
                          hide-details=""
                          prepend-icon=""
                          @click:clear="resetThumbnail()"
                        >
                        </v-file-input>
                        <div
                          v-if="url"
                          class="preview-image"
                          :style="`background-image: url('${url}')`"
                        ></div>
                      </div>
                      <!-- Name -->
                      <v-row>
                        <v-col>
                          <v-text-field
                            label="Nombre"
                            solo
                            hide-details=""
                            v-model="user.first_name"
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field
                            label="Apellido"
                            solo
                            hide-details=""
                            v-model="user.last_name"
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

                      <!-- Cita ideal -->
                      <v-row>
                        <v-col>
                          <v-textarea
                            solo
                            rows="3"
                            row-height="20"
                            label="¿Cual es tu cita ideal?"
                            hide-details=""
                            v-model="user.ideal_date"
                          ></v-textarea>
                        </v-col>
                      </v-row>

                      <!-- Profesión | Sugar baby  -->
                      <v-row>
                        <v-col>
                          <v-text-field
                            label="Profesión"
                            solo
                            hide-details=""
                            v-model="user.profession"
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field
                            label="¿Qué buscas en un Sugar Daddy?"
                            solo
                            hide-details=""
                            v-model="user.what_i_want"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <!-- intereses, hobbies | body type -->
                      <v-row>
                        <v-col>
                          <v-text-field
                            label="Cuentanos sobre tus intereses o hobbies"
                            solo
                            hide-details=""
                            v-model="user.hobbies"
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <v-select
                            :items="bodyTypes"
                            :item-text="(item) => item.name"
                            :item-value="(item) => item.id"
                            label="Estado físico"
                            hide-details=""
                            v-model="user.id_physical_figure"
                            solo
                          ></v-select>
                        </v-col>
                      </v-row>

                      <!-- regiones | presupuesto -->
                      <v-row>
                        <v-col>
                          <v-select
                            :items="regions"
                            :item-text="(item) => item.name"
                            :item-value="(item) => item.id"
                            label="Región"
                            hide-details=""
                            v-model="user.id_region"
                            solo
                          ></v-select>
                        </v-col>
                        <v-col>
                          <v-text-field
                            label="Presupuesto mensual"
                            solo
                            type="number"
                            hide-details=""
                            v-model="user.monthly_salary"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <!-- hijos | preferencia de contacto -->
                      <v-row>
                        <v-col>
                          <v-select
                            :items="childrenOptions"
                            :item-text="(item) => item.name"
                            :item-value="(item) => item.id"
                            label="Hijos"
                            hide-details=""
                            v-model="user.id_children"
                            solo
                          ></v-select>
                        </v-col>
                        <v-col>
                          <v-select
                            :items="contactPreferences"
                            :item-text="(item) => item.name"
                            :item-value="(item) => item.id"
                            label="Preferencias de contacto"
                            hide-details=""
                            v-model="user.id_contact_preferences"
                            solo
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-sheet>
                  </template>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>

      <!-- profile | menu | users on -->
      <v-col cols="3">
        <v-sheet color="transparent">
          <!-- profile -->
          <v-row no-gutters v-if="getUserData !== null">
            <v-col>
              <v-card class="cm-round-1 cm-elevation-1 profile-card">
                <v-card-text class="pa-8">
                  <v-sheet>
                    <!-- head -->
                    <v-row align="center">
                      <v-col cols="auto" class="avatar-wrapper">
                        <div
                          class="profile-card__avatar"
                          :style="`background-image: url('${getUserData.avatar}')`"
                        ></div>

                        <img
                          :src="membershipIcon"
                          class="profile-card__membership"
                          alt=""
                        />
                      </v-col>
                      <v-col>
                        <v-btn
                          x-small
                          rounded
                          color="accent"
                          class="btn-trial"
                          v-if="inTrial"
                        >
                          Modo Trial
                        </v-btn>
                        <h2 class="profile-card__name font_one--text">
                          {{ getUserData.first_name }}
                          {{ getUserData.last_name }}
                          <span class="profile-card__icon">
                            <img
                              :src="maleIcon"
                              alt=""
                              v-if="getUserData.gender === 1"
                            />

                            <img
                              :src="femaleIcon"
                              alt=""
                              v-if="getUserData.gender === 0"
                            />
                          </span>
                        </h2>
                        <h3 class="profile-card__region font_one--text">
                          {{ getUserData.region.name }}
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
          <v-row no-gutters class="mt-8 menu-wrapper">
            <v-col>
              <v-card class="cm-round-1 cm-elevation-1">
                <v-card-text class="pa-8">
                  <v-sheet>
                    <v-row>
                      <v-col>
                        <v-btn
                          :ripple="false"
                          color="primary"
                          text
                          class="text-capitalize"
                          >Inicio</v-btn
                        >
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-btn
                          :ripple="false"
                          active-class=""
                          color="primary"
                          text
                          class="text-capitalize"
                          >Mensajes</v-btn
                        >
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-btn
                          :ripple="false"
                          color="primary"
                          text
                          class="text-capitalize"
                          to="/profile"
                          >Perfil</v-btn
                        >
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-btn
                          :ripple="false"
                          color="primary"
                          text
                          class="text-capitalize"
                          >Cerrar sesión</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-sheet>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- Users online -->
          <v-row no-gutters class="mt-8">
            <v-col>
              <v-card class="cm-round-1 cm-elevation-1">
                <v-card-text class="pa-8"> En desarrollo </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <pre>
        <!-- {{ avatarFile }} -->
      </pre>
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
  middleware: ['authenticated'],
  data() {
    return {
      //?icons
      accountIcon,
      maleIcon,
      femaleIcon,
      membershipIcon,
      //?request
      userR: null,
      //?form
      modalBirthday: false,
      user: null,
      civilStates: ['Soltero', 'Casado'],
      economyStratos: ['Medio', 'Alto', 'Muy Alto'],
      bodyType: ['Atlético', 'Delgado', 'Medio', 'Robusto'],
      //? profile card
      percent: 50,
      avatarFile: null,
      //? test
      url: null,
      image: null,
    }
  },
  mounted() {
    this.setUserLogged()
    this.getProfile()
    this.getRegions()
    this.getBodyTypes()
    this.getChildrensOptions()
    this.getContactPreferences()
  },
  methods: {
    async getProfile() {
      const { token, sub } = JSON.parse(localStorage.getItem('wdc_token'))
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      await this.$axios
        .$get(`${this.$axios.defaults.baseURL}auth/profile/${sub}`, config)
        .then((res) => {
          console.debug(res)
          // this.loadingForm = false
          this.user = res.profile
          // this.authenticating(res)
        })
        .catch((e) => {
          console.debug(e)
          // this.loadingForm = false
          // this.errors = e.response.data.error
        })
    },
    Preview_image() {
      if (this.image !== null) {
        this.url = URL.createObjectURL(this.image)
      }
    },
    resetThumbnail() {
      this.image = null
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
    position: relative;
    .btn-trial {
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(-20px, 20px);
    }
    &__name {
      font-weight: bold;
      font-size: 18px;
      // line-height: 30px;
    }
    &__avatar {
      border: 3px solid #ffffff;
      box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
      border-radius: 15px;
      height: 90px;
      width: 90px;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
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
  .custom-file-input {
    background-color: transparent !important;
    margin: 0;
    padding: 0;
    width: 100px;
    border-radius: 100% !important;
    position: relative;
    z-index: 100;
    .v-text-field__slot {
      height: 100%;
    }
    & > .v-input__control > .v-input__slot {
      cursor: pointer !important;
    }
    .v-input__slot {
      opacity: 0;
    }
  }
  .custom-file-wrapper {
    position: relative;
    max-width: 100px;
    border-radius: 100% !important;
    box-shadow: 0px 1px 5px rgba(50, 18, 21, 0.29);
    .preview-image {
      top: 0;
      right: 0;
      position: absolute;
      height: 100px;
      width: 100px;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      border-radius: 100%;
    }
  }
  .menu-wrapper {
    .v-btn {
      font-weight: bold;
      font-size: 18px;
      line-height: 30px;
      color: #9d8080 !important;
      opacity: 0.5;
      &--active {
        opacity: 1;
        color: #f42f43 !important;
        &::before {
          opacity: 0;
        }
      }
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
