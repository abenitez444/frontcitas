<template>
  <v-container fluid fill-height class="page-layout-1 profile">
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
          <!-- info -->
          <v-row no-gutters v-if="!isProfileComplete">
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
                          Por favor, complete a continuación la información de
                          su perfil para disfrutar de todas las características
                          de la aplicación.
                        </p>
                      </v-col>
                    </v-row>
                  </v-sheet>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- Errors -->
          <v-row no-gutters v-if="hasErrors">
            <v-col>
              <v-card color="accent" class="cm-round-1 cm-elevation-1 light">
                <v-card-text class="pa-8">
                  <v-sheet color="transparent">
                    <v-row align="center">
                      <v-col cols="auto" class="d-none d-sm-flex align-center">
                        <img :src="accountIcon" alt="" />
                      </v-col>
                      <v-col>
                        <!-- <p
                          class="mb-0 info-description text-center text-sm-left"
                        >
                          Errores
                        </p> -->
                        <ul>
                          <li
                            class="
                              info-description
                              text-center text-sm-left
                              mb-2
                            "
                            v-for="(error, i) in errors"
                            :key="`error-${i}`"
                          >
                            {{ error }}
                          </li>
                        </ul>
                      </v-col>
                    </v-row>
                  </v-sheet>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- formulario -->
          <v-row no-gutters :class="!isProfileComplete ? 'mt-8' : ''">
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
                          <div
                            class="
                              custom-file-wrapper
                              banner
                              mx-auto
                              mb-8
                              mt-12
                            "
                          >
                            <v-file-input
                              @change="preview_image_banner"
                              v-model="imageBanner"
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
                              v-if="urlBanner === null"
                              class="preview-image"
                              :style="`background-image: url('${img_baseUrl}${user.featured_image}')`"
                            ></div>

                            <div
                              v-else
                              class="preview-image"
                              :style="`background-image: url('${urlBanner}')`"
                            ></div>
                          </div>
                          <v-row>
                            <v-col class="text-center">
                              <p><label for="">Imagen de portada</label></p>
                            </v-col>
                          </v-row>
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
                          <v-row>
                            <v-col class="text-center">
                              <p><label for="">Imagen de perfil</label></p>
                            </v-col>
                          </v-row>

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
                          <!-- banner -->
                          <div
                            class="
                              custom-file-wrapper
                              banner
                              mx-auto
                              mb-8
                              mt-12
                            "
                          >
                            <v-file-input
                              @change="preview_image_banner"
                              v-model="imageBanner"
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
                              v-if="urlBanner === null"
                              class="preview-image"
                              :style="`background-image: url('${img_baseUrl}${user.featured_image}')`"
                            ></div>

                            <div
                              v-else
                              class="preview-image"
                              :style="`background-image: url('${urlBanner}')`"
                            ></div>
                            <!-- <pre >
                              {{ img_baseUrl }}
                              {{ imageBanner }}
                            </pre> -->
                          </div>
                          <v-row>
                            <v-col class="text-center">
                              <p><label for="">Imagen de portada</label></p>
                            </v-col>
                          </v-row>
                          <!-- profile -->
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
                          <v-row>
                            <v-col class="text-center">
                              <p><label for="">Imagen de perfil</label></p>
                            </v-col>
                          </v-row>

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
                            {{ civilStatesWoman }}
                          </pre
                              > -->
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
                          <!-- <v-row>
                            <pre>
                              {{ monthlySalary }}
                              {{ user.monthly_salary }}
                            </pre>
                          </v-row> -->

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
                              Debe introducir al menos 3 imágenes.
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
                              class="img-fluid rounded gallery-image"
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
                            <v-btn
                              x-small
                              fab
                              dark
                              color="primary"
                              @click="deletePhoto(image.id)"
                            >
                              <v-icon dark> mdi-delete </v-icon>
                            </v-btn>
                            <img
                              :src="`${img_baseUrl}${image.path}`"
                              class="img-fluid rounded gallery-image"
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
      user: {},
      civilStatesWoman: ['Soltera', 'Casada'],
      civilStatesMan: ['Soltero', 'Casado'],
      //? gallery
      galleryImage: null,
      galleryImages: [],
      //? test
      url: null,
      image: null,
      urlBanner: null,
      imageBanner: null,
      bannerProps: {
        size: '',
        height: '',
        width: '',
      },
      avatarProps: {
        size: '',
        height: '',
        width: '',
      },
      toGalleryProps: {
        size: '',
        height: '',
        width: '',
      },
      errors: [],
      hasErrors: false,
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
      this.errors = []
      let file = this.galleryImage
      this.toGalleryProps.size = file.size
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (evt) => {
        let img = new Image()
        img.onload = () => {
          this.toGalleryProps.width = Number(img.width)
          this.toGalleryProps.height = Number(img.height)
          if (Number(img.width) > 500) {
            this.errors.push(
              'La imagen supera las dimensiones recomendadas (500x500)'
            )
          } else if (Number(img.height) > 500) {
            this.errors.push(
              'La imagen supera las dimensiones recomendadas (500x500)'
            )
          } else {
            this.galleryImages.push(this.galleryImage)
            this.galleryImage = null
          }
          this.hasErrors = this.errors.length ? true : false
          // if (
          //   this.toGalleryProps.height <= 500 &&
          //   this.toGalleryProps.width <= 500
          // ) {
          //   this.hasErrors = false
          //   this.galleryImages.push(this.galleryImage)
          //   this.galleryImage = null
          // } else {
          //   this.hasErrors = true
          //   this.errors.push(
          //     'La imagen supera las dimensiones recomendadas (1170x250)'
          //   )
          // }
        }
        img.src = evt.target.result
      }
      reader.onerror = (evt) => {
        console.error(evt)
      }
    },
    getPreviewImage(image) {
      return URL.createObjectURL(image)
    },
    Preview_image() {
      this.errors = []
      if (this.image !== null) {
        let file = this.image
        this.avatarProps.size = file.size
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (evt) => {
          let img = new Image()
          img.onload = () => {
            this.avatarProps.width = img.width
            this.avatarProps.height = img.height
            if (Number(img.width) > 250) {
              this.errors.push(
                'La imagen de la portada supera el ancho recomendado (250)'
              )
            } else if (Number(img.height) > 250) {
              this.errors.push(
                'La imagen de la portada supera el alto recomendado (250)'
              )
            }
            this.hasErrors = this.errors.length ? true : false
          }
          img.src = evt.target.result
        }
        reader.onerror = (evt) => {
          console.error(evt)
        }
        this.url = URL.createObjectURL(this.image)
      }
    },
    preview_image_banner() {
      this.errors = []
      if (this.imageBanner !== null) {
        // let file = this.imageBanner
        // this.bannerProps.size = Number(file.size)
        // let reader = new FileReader()
        // reader.readAsDataURL(file)
        // reader.onload = (evt) => {
        //   let img = new Image()
        //   img.onload = () => {
        //     this.bannerProps.width = Number(img.width)
        //     this.bannerProps.height = Number(img.height)
        //     if (Number(img.width) > 1170) {
        //       this.errors.push(
        //         'La imagen de la portada supera el ancho recomendado (1170)'
        //       )
        //     } else if (Number(img.height) > 250) {
        //       this.errors.push(
        //         'La imagen de la portada supera el alto recomendado (250)'
        //       )
        //     }
        //     this.hasErrors = this.errors.length ? true : false
        //   }
        //   img.src = evt.target.result
        // }
        // reader.onerror = (evt) => {
        //   console.error(evt)
        // }
        this.urlBanner = URL.createObjectURL(this.imageBanner)
      }
    },
    resetThumbnail() {
      this.image = null
    },
    maxDate() {
      const date = new Date()
      date.setFullYear(date.getFullYear() - 18)
      return date.toISOString().substr(0, 10)
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
        formData.append(`galeria[${i}]`, image)
      })
      await this.$axios
        .$post(
          `${this.$axios.defaults.baseURL}auth/images/profile/${prof}`,
          formData,
          config
        )
        .then((res) => {
          this.hasErrors = false
          this.errors = []
          // // console.debug(res)
          this.loadingOff()
          this.getProfile()
          this.galleryImages = []
          this.snackbarOn('Se guardaron las imagenes exitosamente.')
        })
        .catch((e) => {
          // this.loadingOff()
          // this.getProfile()
          // if (e.response.data.error.avatar) {
          //   this.errors.push(e.response.data.error.avatar[0])
          // }
          // if (e.response.data.error.banner) {
          //   this.errors.push(e.response.data.error.banner[0])
          // }
          // this.snackbarOn(
          //   'Ha ocurrido un error al actualizar, por favor verifique la información'
          // )
          // this.errors = Object.values(e.response.data.error)
          this.hasErrors = true
          this.galleryImages = []
          this.errors = []
          Object.values(e.response.data.error).forEach((item, index) => {
            let phrase = item[0].replace('del galeria', 'de la galería')
            let number = Number(phrase.split('.')[1][0]) + 1
            let second = phrase.split('.')[1].substring(1)
            let finalPhrase = phrase
              .split('.')[0]
              .concat(` N°${number} ${second}`)
            this.errors.push(finalPhrase)
          })
          // console.debug(e)
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
          // // console.debug(res)
          this.user = res.profile
          // this.settingUserData(res.profile)
          // this.loadingForm = false
          // this.authenticating(res)
        })
        .catch((e) => {
          // console.debug(e)
          // this.loadingForm = false
          // this.errors = e.response.data.error
        })
    },
    async submit() {
      this.isAvailableImages()
      if (!this.hasErrors) {
        // console.debug(this.user)
        this.loadingOn()
        const { token, sub, prof } = JSON.parse(
          localStorage.getItem('wdc_token')
        )
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        const formData = new FormData()
        if (this.image !== null) {
          formData.append('avatar', this.image)
        }
        if (this.imageBanner !== null) {
          formData.append('banner', this.imageBanner)
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
            this.image = null
            this.imageBanner = null
            this.bannerProps = {
              size: '',
              height: '',
              width: '',
            }
            this.avatarProps = {
              size: '',
              height: '',
              width: '',
            }
            this.hasErrors = false
            this.errors = []
            this.getProfile()
            this.loadingOff()
            this.snackbarOn('El perfil fue actualizado exitosamente.')
            // this.loadingForm = false
            // this.authenticating(res)
            // this.$router.push('/profile')
          })
          .catch((e) => {
            this.hasErrors = true
            this.errors = []
            this.loadingOff()
            this.getProfile()
            if (e.response.data.error.avatar) {
              this.errors.push(e.response.data.error.avatar[0])
            }
            if (e.response.data.error.banner) {
              this.errors.push(e.response.data.error.banner[0])
            }
            this.snackbarOn(
              'Ha ocurrido un error al actualizar, por favor verifique la información'
            )
          })
      }
    },
    isAvailableImages() {
      // let isAvailableImages = true
      // this.hasErrors = false
      // this.errors = []
      // if (
      //   !this.bannerProps.height !== '' &&
      //   !this.bannerProps.width !== '' &&
      //   !this.bannerProps.height <= 250 &&
      //   !this.bannerProps.width <= 1170
      // ) {
      //   this.errors.push(
      //     'La imagen de la portada supera las dimensiones recomendadas (1170x250)'
      //   )
      // }
      // if (
      //   this.avatarProps.height !== '' &&
      //   this.avatarProps.width !== '' &&
      //   !this.avatarProps.height <= 250 &&
      //   !this.avatarProps.width <= 250
      // ) {
      //   console.debug(
      //     this.avatarProps.height !== '',
      //     this.avatarProps.width !== '',
      //     this.avatarProps.height <= 250,
      //     this.avatarProps.width <= 250
      //   )
      //   this.errors.push(
      //     'La imagen del Avatar supera las dimensiones recomendadas (250x250)'
      //   )
      // }
      // if (this.errors.length) {
      //   this.hasErrors = true
      //   isAvailableImages = false
      // }
      // if (this.bannerProps.height <= 250 && this.bannerProps.width <= 1170) {
      //   isAvailableImages = true
      // } else {
      //   isAvailableImages = false
      //   this.hasErrors = true
      //   this.errors.push(
      //     'La imagen de la portada supera las dimensiones recomendadas (1170x250)1'
      //   )
      //   console.debug('MALDITA MIL VECES SEA')
      // }
      // if (this.avatarProps.height <= 250 && this.avatarProps.width <= 250) {
      //   isAvailableImages = true
      // } else {
      //   isAvailableImages = false
      //   this.hasErrors = true
      //   this.errors.push(
      //     'La imagen del Avatar supera las dimensiones recomendadas (250x250)'
      //   )
      // }
      // if (!isAvailableImages) {
      //   this.snackbarOn(
      //     'Ha ocurrido un problema con las imagenes, por favor siga las recomendaciones'
      //   )
      // }
      // return isAvailableImages
    },
    async deletePhoto(id) {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      await this.$axios
        .$delete(
          `${this.$axios.defaults.baseURL}auth/delete-profile-images/${id}`,
          config
        )
        .then((res) => {
          this.loadingOff()
          this.getProfile()
          this.snackbarOn('Imagen eliminada correctamente')
        })
        .catch((e) => {
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un problema por favor pongase en contacto con el soporte.'
          )
        })
    },
  },
  computed: {
    isProfileComplete() {
      let isComplete = false
      if (this.user.gender === 1) {
        isComplete =
          !!this.user.id_economic_level &&
          !!this.user.what_i_want &&
          !!this.user.ideal_date &&
          !!this.user.hobbies &&
          !!this.user.id_physical_figure &&
          !!this.user.id_region
      } else {
        isComplete =
          !!this.user.ideal_date &&
          !!this.user.civil_status &&
          !!this.user.what_i_want &&
          !!this.user.hobbies &&
          !!this.user.id_physical_figure &&
          !!this.user.id_region &&
          !!this.user.monthly_salary_id &&
          !!this.user.id_children &&
          !!this.user.id_contact_preferences
      }

      return isComplete
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
    &.banner {
      width: 100%;
      border-radius: 5px !important;
      max-width: 250px;
      .preview-image {
        height: 100%;
        width: 100%;
        border-radius: 5px;
      }
      .custom-file-input {
        // background-color: #bada55 !important;
        width: 100%;
        border-radius: 0 !important;
      }
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
