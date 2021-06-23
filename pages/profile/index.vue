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
                        <!-- <div v-if="url"></div> -->
                        <div
                          v-if="url === null"
                          class="preview-image"
                          :style="`background-image: url('${img_baseUrl}${user.avatar}')`"
                        ></div>

                        <div
                          v-else
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
                              :max="maxDate()"
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
                            :items="civilStatesMan"
                            label="Estado civil"
                            hide-details=""
                            v-model="user.civil_status"
                            solo
                          ></v-select>
                          <!-- <pre>
                            {{ user.civil_status }}
                          </pre> -->
                        </v-col>
                      </v-row>

                      <!-- Nivel Economico | Sugar baby  -->
                      <v-row>
                        <v-col>
                          <v-select
                            :items="economicLevels"
                            :item-text="(item) => item.name"
                            :item-value="(item) => item.id"
                            label="Nivel Economico"
                            v-model="user.id_economic_level"
                            hide-details=""
                            solo
                          ></v-select>
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
                            :items="bodyTypes.men"
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
                          v-if="url === null"
                          class="preview-image"
                          :style="`background-image: url('${img_baseUrl}${user.avatar}')`"
                        ></div>
                        <div
                          v-else
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
                              :max="maxDate()"
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
                            :items="civilStatesWoman"
                            label="Estado civil"
                            hide-details=""
                            v-model="user.civil_status"
                            solo
                          ></v-select>
                          <!-- <pre>
                            {{ user.civil_status }}
                          </pre> -->
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
                            :items="bodyTypes.woman"
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
                          <v-select
                            :items="monthlySalary"
                            :item-text="(item) => item.name"
                            :item-value="(item) => item.id"
                            label="Presupuesto"
                            hide-details=""
                            v-model="user.monthly_salary_id"
                            solo
                          ></v-select>
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
                  <v-sheet color="transparent" class="mt-10">
                    <v-row justify="center">
                      <v-col cols="auto">
                        <v-btn
                          width="150px"
                          class="text-capitalize"
                          rounded
                          large
                          color="primary"
                          @click="submit()"
                        >
                          Enviar
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-sheet>
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
                          :class="
                            getUserData.avatar !== ''
                              ? ''
                              : 'primary  d-flex justify-center align-center'
                          "
                          :style="`background-image: url('${img_baseUrl}${getUserData.avatar}')`"
                        >
                          <span
                            v-if="getUserData.avatar === ''"
                            class="white--text text-h5 text-uppercase"
                          >
                            {{ getUserData.first_name[0] }}
                            {{ getUserData.last_name[0] }}
                          </span>
                        </div>

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
                          @click="logoutAccount()"
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
    <!-- <v-row>
      <pre>
    {{ user }}
  </pre
      >
    </v-row> -->
  </v-container>
</template>

<script>
import accountIcon from '@/assets/ui-icon-account.svg'
import maleIcon from '@/assets/ui-icon-male.svg'
import femaleIcon from '@/assets/ui-icon-female.svg'
import membershipIcon from '@/assets/ui-icon-membership.svg'
import authMixin from '@/mixins/authMixin'
import resourcesMixin from '@/mixins/resources'
import snackMixin from '@/mixins/snackMixin'
import loadingMixin from '@/mixins/loadingMixin'
export default {
  mixins: [authMixin, resourcesMixin, snackMixin, loadingMixin],
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
      civilStatesWoman: ['Soltera', 'Casada'],
      civilStatesMan: ['Soltero', 'Casado'],
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
    this.getChildrensOptions()
    this.getContactPreferences()
    this.getEconomicLevels()
    this.getBodyTypes()
    this.getMonthlySalary()
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
          this.user = res.profile
          // this.loadingForm = false
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
    async submit() {
      this.loadingOn()
      const { token, sub } = JSON.parse(localStorage.getItem('wdc_token'))
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const formData = new FormData()
      if (this.image !== null) {
        formData.append('image', this.image)
      }
      formData.append('gender', this.user.gender)
      formData.append('username', this.user.user.username)
      formData.append('email', this.user.user.email)
      formData.append('first_name', this.user.first_name)
      formData.append('last_name', this.user.last_name)
      formData.append('phone', this.user.phone)
      formData.append('birth_day', this.user.birth_day)
      formData.append('civil_status', this.user.civil_status)
      formData.append('profession', this.user.profession)
      formData.append('hobbies', this.user.hobbies)
      formData.append('what_i_want', this.user.what_i_want)
      formData.append('monthly_salary_id', this.user.monthly_salary_id)
      if (this.user.gender === 0) {
        formData.append('id_economic_level', '')
      } else {
        formData.append('id_economic_level', this.user.id_economic_level)
      }
      formData.append('ideal_date', this.user.ideal_date)
      formData.append(
        'id_contact_preferences',
        this.user.id_contact_preferences
      )
      formData.append('id_children', this.user.id_children)
      formData.append('id_physical_figure', this.user.id_physical_figure)
      formData.append('id_region', this.user.id_region)
      formData.append('_method', 'PUT')
      await this.$axios
        .$post(
          `${this.$axios.defaults.baseURL}auth/edit/${this.user.id}`,
          formData,
          config
        )
        .then((res) => {
          this.getProfile()
          this.loadingOff()
          this.snackbarOn('El perfil fue actualizado exitosamente.')
          // this.loadingForm = false
          // this.authenticating(res)
          // this.$router.push('/profile')
        })
        .catch((e) => {
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error al actualizar, por favor pongase en contacto con el soporte.'
          )
          this.getProfile()
          this.errors = e.response.data.error
        })
    },
    maxDate() {
      const date = new Date()
      date.setFullYear(date.getFullYear() - 18)
      return date.toISOString().substr(0, 10)
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
