<template>
  <v-container fluid fill-height class="page-layout-1 profile">
    <!-- <pre>
      {{ getUser }}
      {{ getUserData }}
    </pre> -->
    <v-row class="">
      <!-- Users list -->
      <v-col cols="3" v-if="!$vuetify.breakpoint.mdAndDown">
        <v-card class="cm-round-1 cm-elevation-1 participants-wrapper">
          <v-card-text class="pa-8"> <wdc-participants /> </v-card-text>
        </v-card>
      </v-col>

      <!-- content -->
      <v-col
        class="order-2 order-md-1 profile-tab"
        cols="12"
        sm="12"
        md="8"
        lg="6"
      >
        <v-sheet color="transparent">
          <!-- <v-row>
            {{ $vuetify.breakpoint.name }}
            {{ $vuetify.breakpoint.mdAndDown }}
          </v-row> -->
          <!-- info -->
          <v-row no-gutters>
            <v-col>
              <v-card color="accent_3" class="cm-round-1 cm-elevation-1 light">
                <v-card-text class="pa-8">
                  <v-sheet color="transparent">
                    <v-row align="center">
                      <v-col cols="auto" class="d-none d-sm-flex align-center">
                        <img :src="accountIcon" alt="" />
                      </v-col>
                      <v-col>
                        <p
                          class="mb-0 info-description text-center text-sm-left"
                        >
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
                <v-card-text class="pa-4 pa-sm-8">
                  <v-tabs centered v-model="profileTab" class="cm-tab">
                    <v-tabs-slider color="primary"></v-tabs-slider>

                    <v-tab> Perfil </v-tab>
                    <v-tab> Galería </v-tab>
                  </v-tabs>
                  <v-tabs-items v-model="profileTab">
                    <v-tab-item>
                      <!-- hombre -->
                      <template v-if="user.gender === 1">
                        <v-sheet color="transparent">
                          <!-- file -->
                          <div class="custom-file-wrapper mx-auto mb-8 mt-12">
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
                            <!-- <pre v-if="url === null">
                              {{ img_baseUrl }}{{ user.avatar }}
                            </pre> -->
                          </div>

                          <!-- Name -->
                          <v-row>
                            <v-col cols="12" sm="12" lg="6">
                              <v-text-field
                                label="Nombre"
                                outlined
                                hide-details=""
                                v-model="user.first_name"
                                color="primary"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" lg="6">
                              <v-text-field
                                label="Apellido"
                                outlined
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
                                outlined
                                hide-details=""
                                v-model="user.profession"
                              ></v-text-field>
                            </v-col>
                          </v-row>

                          <!-- Birthday | civil state -->
                          <v-row>
                            <v-col cols="12" sm="12" lg="6">
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
                                    outlined
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
                            <v-col cols="12" sm="12" lg="6">
                              <v-select
                                :items="civilStatesMan"
                                label="Estado civil"
                                hide-details=""
                                v-model="user.civil_status"
                                outlined
                              ></v-select>
                            </v-col>
                          </v-row>

                          <!-- Nivel Economico | Sugar baby  -->
                          <v-row>
                            <v-col cols="12" sm="12" lg="6">
                              <v-select
                                :items="economicLevels"
                                :item-text="(item) => item.name"
                                :item-value="(item) => item.id"
                                label="Nivel Economico"
                                v-model="user.id_economic_level"
                                hide-details=""
                                outlined
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="12" lg="6">
                              <v-text-field
                                label="¿Qué buscas en una Sugar Baby?"
                                outlined
                                hide-details=""
                                v-model="user.what_i_want"
                              ></v-text-field>
                            </v-col>
                          </v-row>

                          <!-- Cita ideal -->
                          <v-row>
                            <v-col>
                              <v-textarea
                                outlined
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
                            <v-col cols="12" sm="12" lg="6">
                              <v-text-field
                                label="Cuentanos sobre tus intereses o hobbies"
                                outlined
                                hide-details=""
                                v-model="user.hobbies"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" lg="6">
                              <v-select
                                :items="bodyTypes.men"
                                :item-text="(item) => item.name"
                                :item-value="(item) => item.id"
                                label="Estado físico"
                                hide-details=""
                                v-model="user.id_physical_figure"
                                outlined
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
                                outlined
                              ></v-select>
                            </v-col>
                          </v-row>
                        </v-sheet>
                      </template>

                      <!-- mujer -->
                      <template v-else-if="user.gender === 0">
                        <v-sheet color="transparent">
                          <!-- file -->
                          <div class="custom-file-wrapper mx-auto mb-8 mt-12">
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
                                outlined
                                hide-details=""
                                v-model="user.first_name"
                              ></v-text-field>
                            </v-col>
                            <v-col>
                              <v-text-field
                                label="Apellido"
                                outlined
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
                                    outlined
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
                                outlined
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
                                outlined
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
                                outlined
                                hide-details=""
                                v-model="user.profession"
                              ></v-text-field>
                            </v-col>
                            <v-col>
                              <v-text-field
                                label="¿Qué buscas en un Sugar Daddy?"
                                outlined
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
                                outlined
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
                                outlined
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
                                outlined
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
                                outlined
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
                                outlined
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
                                outlined
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
                    </v-tab-item>

                    <!-- galeria -->
                    <v-tab-item>
                      <v-sheet class="mt-10">
                        <!-- alert -->
                        <v-row>
                          <v-col>
                            <v-alert
                              border="top"
                              color="primary lighten-2"
                              dark
                            >
                              Debe Introducir almenos 3 imagenes.
                            </v-alert>
                          </v-col>
                        </v-row>

                        <!-- Form -->
                        <v-row align="center" justify="center">
                          <v-col cols="12" md="6">
                            <v-file-input
                              v-model="galleryImage"
                              accept="image/*"
                              placeholder="Seleccione su imagen"
                              prepend-icon=""
                              prepend-inner-icon="mdi-image"
                              outlined
                            >
                            </v-file-input>
                          </v-col>
                          <v-col cols="auto" v-if="galleryImage !== null">
                            <v-btn
                              fab
                              dark
                              small
                              color="success"
                              @click="addImageToGallery()"
                              elevation="0"
                              class="mb-6"
                            >
                              <v-icon dark> mdi-plus </v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>

                        <!-- preview images -->
                        <v-row
                          v-if="galleryImages.length"
                          class="justify-space-around"
                        >
                          <v-col
                            v-for="(image, i) in galleryImages"
                            :key="i"
                            cols="auto"
                          >
                            <img
                              :src="getPreviewImage(image)"
                              class="img-fluid--h rounded gallery-image"
                              alt=""
                            />
                          </v-col>
                        </v-row>
                        <!-- submit -->
                        <v-row
                          justify="center"
                          v-if="galleryImages.length >= 3"
                        >
                          <v-col cols="auto">
                            <v-btn
                              width="150px"
                              class="text-capitalize"
                              rounded
                              large
                              color="primary"
                              @click="submitGallery()"
                            >
                              Enviar
                            </v-btn>
                          </v-col>
                        </v-row>
                        <!-- Loaded Gallery -->
                        <v-row
                          v-if="user !== null"
                          class="justify-space-around"
                        >
                          <v-col cols="12">
                            <h2 class="text-center">Mis imagenes</h2>
                          </v-col>
                          <v-col
                            v-for="(image, i) in user.images"
                            :key="i"
                            cols="auto"
                          >
                            <img
                              :src="`${img_baseUrl}${image.path}`"
                              class="img-fluid--h rounded gallery-image"
                              alt=""
                            />
                          </v-col>
                        </v-row>
                      </v-sheet>
                    </v-tab-item>
                  </v-tabs-items>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>

      <!-- profile | menu | users on -->
      <v-col class="order-1 order-md-2" cols="12" sm="12" md="4" lg="3">
        <v-sheet color="transparent">
          <!-- profile -->
          <v-row no-gutters v-if="getUserData !== null">
            <v-col>
              <wdc-profile-card />
            </v-col>
          </v-row>

          <!-- Menu -->
          <v-row
            no-gutters
            class="mt-8 menu-wrapper"
            v-if="!$vuetify.breakpoint.mdAndDown"
          >
            <v-col> <wdc-menu /> </v-col>
          </v-row>

          <!-- Users online -->
          <!-- <v-row no-gutters class="mt-8">
            <v-col>
              <v-card class="cm-round-1 cm-elevation-1">
                <v-card-text class="pa-8"> En desarrollo </v-card-text>
              </v-card>
            </v-col>
          </v-row> -->
          <!-- users -->
          <v-row no-gutters class="mt-8">
            <v-col v-if="$vuetify.breakpoint.mdAndDown">
              <v-card class="cm-round-1 cm-elevation-1 participants-wrapper">
                <v-card-text class="pa-4 pa-sm-8">
                  <wdc-participants />
                </v-card-text>
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
import authMixin from '@/mixins/authMixin'
import resourcesMixin from '@/mixins/resources'
import snackMixin from '@/mixins/snackMixin'
import loadingMixin from '@/mixins/loadingMixin'
import wdc_menu from '~/components/wdc_menu.vue'
import Wdc_profileCard from '~/components/wdc_profile-card.vue'
import Wdc_participants from '~/components/wdc_participants.vue'
export default {
  components: { wdc_menu, Wdc_profileCard, Wdc_participants },
  mixins: [authMixin, resourcesMixin, snackMixin, loadingMixin],
  middleware: ['authenticated'],
  data() {
    return {
      //?icons
      accountIcon,

      //?form
      profileTab: null,
      modalBirthday: false,
      user: null,
      civilStatesWoman: ['Soltera', 'Casada'],
      civilStatesMan: ['Soltero', 'Casado'],
      //? gallery
      galleryImage: null,
      galleryImages: [],
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
    addImageToGallery() {
      this.galleryImages.push(this.galleryImage)
      this.galleryImage = null
    },
    getPreviewImage(image) {
      return URL.createObjectURL(image)
    },
    async submitGallery() {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const formData = new FormData()
      this.galleryImages.forEach((image, i) => {
        formData.append(`images[${i}]`, image)
      })
      await this.$axios
        .$post(
          `${this.$axios.defaults.baseURL}auth/images/profile/${prof}`,
          formData,
          config
        )
        .then((res) => {
          // console.debug(res)
          this.loadingOff()
          this.getProfile()
          this.galleryImages = []
          this.snackbarOn('Se guardaron las imagenes exitosamente.')
        })
        .catch((e) => {
          console.debug(e)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un problema por favor pongase en contacto con el soporte.'
          )
        })
    },
    async getProfile() {
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      await this.$axios
        .$get(`${this.$axios.defaults.baseURL}auth/profile/${prof}`, config)
        .then((res) => {
          // console.debug(res)
          this.user = res.profile
          this.settingUserData(res.profile)
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
      console.debug(this.user)
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))
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
      if (this.user.gender === 0) {
        formData.append('id_economic_level', '')
        formData.append('monthly_salary_id', this.user.monthly_salary_id)
      } else {
        formData.append('monthly_salary_id', '')
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
        .$post(`${this.$axios.defaults.baseURL}auth/edit`, formData, config)
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
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;700;800&family=Raleway:wght@100;300;400;600;700&display=swap');
.profile {
  .info-description {
    font-weight: bold;
    font-size: 14px;
    line-height: 17px;
    color: #f5f7fa;
  }
  .profile-tab {
    z-index: 4;
    position: relative;
    // margin-bottom: 250px;
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
      // color: #f42f43;
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
    border-radius: 100%;
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
  .gallery-image {
    max-height: 200px;
    border: 3px solid #fff;
    box-shadow: 0px 1px 10px rgb(0 0 0 / 10%);
  }
  .cm-tab {
    .v-tabs-bar {
      // background-color: #bada55;
    }
    .v-slide-group__prev--disabled {
      display: none !important;
    }
  }
}
</style>
