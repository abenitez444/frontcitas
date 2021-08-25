<template>
  <v-col
    cols="12"
    sm="12"
    md="8"
    lg="9"
    class="settings-page order-2 order-md-1"
  >
    <!-- new slider -->
    <v-dialog v-model="newSlideDialog" width="620">
      <v-card>
        <v-card-title>
          <v-row>
            <v-col cols="auto">
              <span> Nuevo Slide </span>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="auto">
              <small class="grey--text">Max. 4</small>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text class="pa-4 pa-sm-8">
          <v-sheet>
            <!-- <v-row v-if="sliders.length">
              <pre>{{ sliders[0].slides.length }}</pre>
              <pre>{{ sliders[1].slides.length }}</pre>
              <pre>{{ newSlide.id_featured_type }}</pre>
            </v-row> -->
            <v-row>
              <v-col cols="12" v-if="newSlide.image">
                <v-img
                  max-height="250"
                  :src="getPreviewImage(newSlide.image)"
                ></v-img>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  accept="image/*"
                  label=""
                  solo
                  v-model="newSlide.image"
                  prepend-icon=""
                  :error-messages="imageErrors"
                  @input="$v.newSlide.image.$touch()"
                  @blur="$v.newSlide.image.$touch()"
                ></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="newSlide.title"
                  solo
                  hide-details=""
                  label="Título"
                ></v-text-field>
              </v-col>
              <template v-if="sliders.length">
                <v-col
                  cols="12"
                  v-if="
                    newSlide.id_featured_type === 2 &&
                    sliders[0].slides.length === 4
                  "
                >
                  <v-alert border="top" color="accent" dark>
                    Este Carousel Ya tiene 4 slides.
                  </v-alert>
                </v-col>
                <v-col
                  cols="12"
                  v-else-if="
                    newSlide.id_featured_type === 3 &&
                    sliders[1].slides.length === 4
                  "
                >
                  <v-alert border="top" color="accent" dark>
                    Este Carousel Ya tiene 4 slides.
                  </v-alert>
                </v-col>
              </template>
              <v-col cols="12">
                <v-select
                  :items="items"
                  item-text="name"
                  item-value="id"
                  solo
                  v-model="newSlide.id_featured_type"
                  label="Seleccione el slider *"
                  :error-messages="carouselTypeErrors"
                  @input="$v.newSlide.id_featured_type.$touch()"
                  @blur="$v.newSlide.id_featured_type.$touch()"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="newSlide.description"
                  solo
                  hide-details=""
                  label="Descripción"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-sheet>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="newSlideDialog = false">
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            :disabled="disabledNewSlide(newSlide.id_featured_type)"
            @click="submitNewSlide()"
          >
            Crear
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit slider -->
    <v-dialog v-model="editSlideDialog" width="620">
      <v-card>
        <v-card-title><span> Editar Slide </span> </v-card-title>
        <v-card-text class="pa-4 pa-sm-8">
          <v-sheet>
            <v-row>
              <v-col cols="12" v-if="newSlide.image">
                <v-img
                  max-height="250"
                  :src="getPreviewImage(newSlide.image)"
                ></v-img>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  accept="image/*"
                  label=""
                  solo
                  v-model="newSlide.image"
                  prepend-icon=""
                  :error-messages="imageErrors"
                  @input="$v.newSlide.image.$touch()"
                  @blur="$v.newSlide.image.$touch()"
                ></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="newSlide.title"
                  solo
                  hide-details=""
                  label="Título"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="items"
                  item-text="name"
                  item-value="id"
                  solo
                  v-model="newSlide.id_featured_type"
                  label="Seleccione el slider *"
                  :error-messages="carouselTypeErrors"
                  @input="$v.newSlide.id_featured_type.$touch()"
                  @blur="$v.newSlide.id_featured_type.$touch()"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="newSlide.description"
                  solo
                  hide-details=""
                  label="Descripción"
                ></v-textarea>
              </v-col>
            </v-row>
            <!-- <v-row>
              <pre>
                {{ typeof newSlide.image }}
              </pre>
            </v-row> -->
          </v-sheet>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="editSlideDialog = false">
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            :disabled="$v.newSlide.$invalid"
            @click="submitEditSlide(newSlide.id)"
          >
            Editar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- new video -->
    <v-dialog v-model="newVideoDialog" width="500">
      <v-card>
        <v-card-title><span> Nuevo Video </span> </v-card-title>
        <v-card-text class="pa-4 pa-sm-8">
          <v-sheet>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="newVideo.link"
                  solo
                  label="Enlace de youtube"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="newVideo.title"
                  solo
                  label="Título"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="newVideo.description"
                  solo
                  label="Descripción"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-sheet>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="newVideoDialog = false">
            Cancelar
          </v-btn>
          <!-- :disabled="$v.newVideo.$invalid" -->
          <v-btn color="primary" @click="submitNewVideo()"> Crear </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- edit video -->
    <v-dialog v-model="editVideoDialog" width="500">
      <v-card>
        <v-card-title><span> Editar Video </span> </v-card-title>
        <v-card-text class="pa-4 pa-sm-8">
          <v-sheet>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="newVideo.link"
                  solo
                  label="Enlace de youtube"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="newVideo.title"
                  solo
                  label="Título"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="newVideo.description"
                  solo
                  label="Descripción"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-sheet>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="editVideoDialog = false">
            Cancelar
          </v-btn>
          <!-- :disabled="$v.newVideo.$invalid" -->
          <v-btn color="primary" @click="submitEditVideo(newVideo.id)">
            Editar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- new Member -->
    <v-dialog v-model="newMemberDialog" width="500">
      <v-card>
        <v-card-title><span> Nuevo Miembro </span> </v-card-title>
        <v-card-text class="pa-4 pa-sm-8">
          <v-sheet>
            <v-row>
              <v-col
                cols="12"
                class="d-flex justify-center"
                v-if="newMember.image"
              >
                <v-img
                  max-height="150"
                  max-width="150"
                  :src="getPreviewImage(newMember.image)"
                ></v-img>
              </v-col>
              <v-col cols="12">
                <!--                   :error-messages="imageErrors"
                  @input="$v.newMember.image.$touch()"
                  @blur="$v.newMember.image.$touch()" -->
                <v-file-input
                  accept="image/*"
                  label=""
                  solo
                  v-model="newMember.image"
                  prepend-icon=""
                ></v-file-input>
              </v-col>
            </v-row>
          </v-sheet>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="newMemberDialog = false">
            Cancelar
          </v-btn>
          <!-- :disabled="$v.newMember.$invalid" -->
          <v-btn color="primary" @click="submitNewMember()"> Crear </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- edit Member -->
    <v-dialog v-model="editMemberDialog" width="500">
      <v-card>
        <v-card-title><span> Editar Miembro </span> </v-card-title>
        <v-card-text class="pa-4 pa-sm-8">
          <v-sheet>
            <v-row>
              <v-col
                cols="12"
                class="d-flex justify-center"
                v-if="newMember.image"
              >
                <v-img
                  max-height="150"
                  max-width="150"
                  :src="getPreviewImage(newMember.image)"
                ></v-img>
              </v-col>
              <v-col cols="12">
                <!--                   :error-messages="imageErrors"
                  @input="$v.newMember.image.$touch()"
                  @blur="$v.newMember.image.$touch()" -->
                <v-file-input
                  accept="image/*"
                  label=""
                  solo
                  v-model="newMember.image"
                  prepend-icon=""
                ></v-file-input>
              </v-col>
            </v-row>
          </v-sheet>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="editMemberDialog = false">
            Cancelar
          </v-btn>
          <!-- :disabled="$v.newMember.$invalid" -->
          <v-btn color="primary" @click="submitEditMember(newMember.id)">
            Editar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- new Testimony -->
    <v-dialog v-model="newTestimonyDialog" width="620">
      <v-card>
        <v-card-title><span> Nuevo Testimonio </span> </v-card-title>
        <v-card-text class="pa-4 pa-sm-8">
          <v-sheet>
            <v-row>
              <v-col
                cols="12"
                class="d-flex justify-center"
                v-if="newTestimony.image"
              >
                <v-img
                  max-height="150"
                  max-width="150"
                  :src="getPreviewImage(newTestimony.image)"
                ></v-img>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  accept="image/*"
                  label=""
                  solo
                  v-model="newTestimony.image"
                  prepend-icon=""
                ></v-file-input>
                <!-- :error-messages="imageErrors"
                  @input="$v.newTestimony.image.$touch()"
                  @blur="$v.newTestimony.image.$touch()" -->
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="newTestimony.name"
                  solo
                  hide-details=""
                  label="Nombre"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="newTestimony.description"
                  solo
                  hide-details=""
                  label="Testimonio"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-sheet>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="newTestimonyDialog = false">
            Cancelar
          </v-btn>
          <v-btn color="primary" @click="submitNewTestimony()">
            <!-- :disabled="$v.newTestimony.$invalid" -->
            Crear
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit Testimony -->
    <v-dialog v-model="editTestimonyDialog" width="620">
      <v-card>
        <v-card-title><span> Editar Testimonio </span> </v-card-title>
        <v-card-text class="pa-4 pa-sm-8">
          <v-sheet>
            <v-row>
              <v-col
                cols="12"
                class="d-flex justify-center"
                v-if="newTestimony.image"
              >
                <v-img
                  max-height="150"
                  max-width="150"
                  :src="getPreviewImage(newTestimony.image)"
                ></v-img>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  accept="image/*"
                  label=""
                  solo
                  v-model="newTestimony.image"
                  prepend-icon=""
                ></v-file-input>
                <!-- :error-messages="imageErrors"
                  @input="$v.newTestimony.image.$touch()"
                  @blur="$v.newTestimony.image.$touch()" -->
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="newTestimony.name"
                  solo
                  hide-details=""
                  label="Título"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="newTestimony.description"
                  solo
                  hide-details=""
                  label="Descripción"
                ></v-textarea>
              </v-col>
            </v-row>
            <!-- <v-row>
              <pre>
                {{ typeof newTestimony.image }}
              </pre>
            </v-row> -->
          </v-sheet>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="editTestimonyDialog = false">
            Cancelar
          </v-btn>
          <v-btn color="primary" @click="submitEditTestimony(newTestimony.id)">
            :disabled="$v.newTestimony.$invalid"
            <!-- getSlidesById -->
            Editar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- content -->
    <v-sheet color="transparent">
      <v-row class="content-wrapper">
        <!-- Sliders -->
        <v-col cols="6">
          <v-card class="cm-round-1 cm-elevation-1">
            <v-card-title>
              <span> Configuración de sliders </span>
              <v-spacer></v-spacer>
              <v-btn small @click.stop="newSlideDialogOn()" color="primary">
                Nuevo slide
              </v-btn>
            </v-card-title>
            <v-card-text class="pa-4 pa-sm-8">
              <v-expansion-panels class="">
                <v-expansion-panel
                  v-for="(slider, i) in sliders"
                  :key="i"
                  class="mb-5"
                >
                  <v-expansion-panel-header>
                    <span> {{ slider.name }} </span>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-list>
                      <v-list-item-group>
                        <v-list-item
                          v-for="(slide, i) in slider.slides"
                          :key="i"
                        >
                          <v-list-item-content>
                            <v-list-item-title>
                              <span class="text-capitalize">{{
                                slide.name
                              }}</span>
                            </v-list-item-title>
                          </v-list-item-content>

                          <v-btn
                            @click="getSlide(slide.id)"
                            fab
                            x-small
                            color="primary"
                          >
                            <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                          <v-btn
                            @click="deleteSlide(slide.id)"
                            fab
                            x-small
                            color="primary"
                            class="ml-5"
                          >
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Videos -->
        <v-col cols="6">
          <v-card class="cm-round-1 cm-elevation-1">
            <v-card-title>
              <span> Configuración de videos </span>
              <v-spacer></v-spacer>
              <v-btn
                v-if="videos.length < 3"
                @click="newVideoDialog = true"
                small
                color="primary"
                >Nuevo Video</v-btn
              >
              <small v-else class="grey--text">Max. 3</small>
            </v-card-title>
            <v-card-text class="pa-4 pa-sm-8">
              <v-list>
                <v-list-item-group>
                  <v-list-item v-for="(video, i) in videos" :key="i">
                    <v-list-item-content>
                      <v-list-item-title>
                        <span class="text-capitalize">
                          {{ video.name }}
                        </span>
                      </v-list-item-title>
                    </v-list-item-content>

                    <v-btn
                      @click="getVideo(video.id)"
                      fab
                      x-small
                      color="primary"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                      @click="deleteVideo(video.id)"
                      fab
                      x-small
                      color="primary"
                      class="ml-5"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Galeria -->
        <v-col cols="6">
          <v-card class="cm-round-1 cm-elevation-1">
            <v-card-title>
              <span> Configuración de miembros del club </span>
              <v-spacer></v-spacer>
              <v-btn
                v-if="members.length < 10"
                @click="newMemberDialog = true"
                small
                color="primary"
                >Nuevo miembro</v-btn
              >
              <small v-else class="grey--text">Max. 10</small>
            </v-card-title>
            <v-card-text class="pa-4 pa-sm-8">
              <v-list>
                <v-list-item-group>
                  <v-list-item v-for="(member, i) in members" :key="i">
                    <v-list-item-content>
                      <v-list-item-title>
                        <span class="text-capitalize">
                          miembro {{ i + 1 }}
                        </span>
                      </v-list-item-title>
                    </v-list-item-content>

                    <v-btn
                      @click="getMember(member.id)"
                      fab
                      x-small
                      color="primary"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                      @click="deleteMember(member.id)"
                      fab
                      x-small
                      color="primary"
                      class="ml-5"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Testimonios -->
        <v-col cols="6">
          <v-card class="cm-round-1 cm-elevation-1">
            <v-card-title>
              <span> Configuración de Testimonios </span>
              <v-spacer></v-spacer>
              <v-btn small @click="newTestimonyDialog = true" color="primary"
                >Nuevo testimonio</v-btn
              >
            </v-card-title>
            <v-card-text class="pa-4 pa-sm-8">
              <v-list>
                <v-list-item-group>
                  <v-list-item v-for="(testimony, i) in testimonies" :key="i">
                    <v-list-item-content>
                      <v-list-item-title>
                        <span class="text-capitalize">
                          {{ testimony.name }}
                        </span>
                      </v-list-item-title>
                    </v-list-item-content>

                    <v-btn
                      @click="getTestimony(testimony.id)"
                      fab
                      x-small
                      color="primary"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                      @click="deleteTestimony(testimony.id)"
                      fab
                      x-small
                      color="primary"
                      class="ml-5"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
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
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
export default {
  mixins: [authMixin, resources, loadingMixin, snackMixin, validationMixin],
  layout: 'dashboard',
  mounted() {
    this.getSliders()
    this.getMembers()
    this.getTestimonies()
    this.getVideos()
  },
  data() {
    return {
      sliders: [],
      members: [],
      testimonies: [],
      videos: [],
      newSlide: {
        image: null,
        id_featured_type: null,
        title: null,
        description: null,
      },
      newVideo: {
        link: null,
        title: null,
        description: null,
      },
      newMember: {
        image: null,
      },
      newTestimony: {
        name: null,
        description: null,
        image: null,
      },
      newSlideDialog: false,
      editSlideDialog: false,
      newVideoDialog: false,
      editVideoDialog: false,
      newMemberDialog: false,
      editMemberDialog: false,
      newTestimonyDialog: false,
      editTestimonyDialog: false,
      items: [
        { name: `Landing Page`, id: 2 },
        { name: 'Muro Principal', id: 3 },
      ],
    }
  },
  methods: {
    async getSliders() {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      const options = {
        method: 'GET',
        url: `${this.$axios.defaults.baseURL}auth/settings-all-slide`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }

      await this.$axios
        .request(options)
        .then((res) => {
          console.debug(res)
          this.loadingOff()
          this.sliders = res.data
          // this.logout()
          // this.$router.push('/')
        })
        .catch((e) => {
          console.debug(e.response.data.error)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error, pongase en contacto con el soporte.'
          )
        })
    },
    async getSlide(id) {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      const options = {
        method: 'GET',
        url: `${this.$axios.defaults.baseURL}auth/settings-show-slide/${id}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }

      await this.$axios
        .request(options)
        .then((res) => {
          this.editSlideDialog = true
          console.debug(res)
          this.loadingOff()
          this.newSlide = res.data.slide
          // this.logout()
          // this.$router.push('/')
        })
        .catch((e) => {
          console.debug(e.response.data.error)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error, pongase en contacto con el soporte.'
          )
        })
    },
    async getVideo(id) {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      const options = {
        method: 'GET',
        url: `${this.$axios.defaults.baseURL}auth/settings-show-video/${id}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }

      await this.$axios
        .request(options)
        .then((res) => {
          this.editVideoDialog = true
          console.debug(res)
          this.loadingOff()
          this.newVideo = res.data.video
          // this.logout()
          // this.$router.push('/')
        })
        .catch((e) => {
          console.debug(e.response.data.error)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error, pongase en contacto con el soporte.'
          )
        })
    },
    async getMember(id) {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      const options = {
        method: 'GET',
        url: `${this.$axios.defaults.baseURL}auth/settings-show-member/${id}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }

      await this.$axios
        .request(options)
        .then((res) => {
          this.editMemberDialog = true
          console.debug(res)
          this.loadingOff()
          this.newMember = res.data.member
          // this.logout()
          // this.$router.push('/')
        })
        .catch((e) => {
          console.debug(e.response.data.error)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error, pongase en contacto con el soporte.'
          )
        })
    },
    async getTestimony(id) {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      const options = {
        method: 'GET',
        url: `${this.$axios.defaults.baseURL}auth/settings-show-testimony/${id}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }

      await this.$axios
        .request(options)
        .then((res) => {
          this.editTestimonyDialog = true
          console.debug(res)
          this.loadingOff()
          this.newTestimony = res.data.testimony
          // this.logout()
          // this.$router.push('/')
        })
        .catch((e) => {
          console.debug(e.response.data.error)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error, pongase en contacto con el soporte.'
          )
        })
    },
    async getMembers() {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      const options = {
        method: 'GET',
        url: `${this.$axios.defaults.baseURL}settings/4`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }

      await this.$axios
        .request(options)
        .then((res) => {
          console.debug(res.data.data)
          this.loadingOff()
          this.members = res.data.data
          // this.logout()
          // this.$router.push('/')
        })
        .catch((e) => {
          console.debug(e.response.data.error)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error, pongase en contacto con el soporte.'
          )
        })
    },
    async getTestimonies() {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      const options = {
        method: 'GET',
        url: `${this.$axios.defaults.baseURL}settings/5`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }

      await this.$axios
        .request(options)
        .then((res) => {
          console.debug(res.data.data)
          this.loadingOff()
          this.testimonies = res.data.data
          // this.logout()
          // this.$router.push('/')
        })
        .catch((e) => {
          console.debug(e.response.data.error)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error, pongase en contacto con el soporte.'
          )
        })
    },
    async getVideos() {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      const options = {
        method: 'GET',
        url: `${this.$axios.defaults.baseURL}settings/1`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }

      await this.$axios
        .request(options)
        .then((res) => {
          console.debug(res.data.data)
          this.loadingOff()
          this.videos = res.data.data
          // this.logout()
          // this.$router.push('/')
        })
        .catch((e) => {
          console.debug(e.response.data.error)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error, pongase en contacto con el soporte.'
          )
        })
    },
    async deleteSlide(slideId) {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      const options = {
        method: 'DELETE',
        url: `${this.$axios.defaults.baseURL}auth/settings-delete-slide/${slideId}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }

      await this.$axios
        .request(options)
        .then((res) => {
          console.debug(res)
          this.loadingOff()
          this.getSliders()
          // this.sliders = res.data
          // this.logout()
          // this.$router.push('/')
        })
        .catch((e) => {
          console.debug(e.response.data.error)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error, pongase en contacto con el soporte.'
          )
        })
    },
    async deleteVideo(videoId) {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      const options = {
        method: 'DELETE',
        url: `${this.$axios.defaults.baseURL}auth/settings-delete-video/${videoId}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }

      await this.$axios
        .request(options)
        .then((res) => {
          console.debug(res)
          this.loadingOff()
          this.getVideos()
          // this.sliders = res.data
          // this.logout()
          // this.$router.push('/')
        })
        .catch((e) => {
          console.debug(e.response.data.error)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error, pongase en contacto con el soporte.'
          )
        })
    },
    async deleteMember(memberId) {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      const options = {
        method: 'DELETE',
        url: `${this.$axios.defaults.baseURL}auth/settings-delete-member/${memberId}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }

      await this.$axios
        .request(options)
        .then((res) => {
          console.debug(res)
          this.loadingOff()
          this.getMembers()
          // this.sliders = res.data
          // this.logout()
          // this.$router.push('/')
        })
        .catch((e) => {
          console.debug(e.response.data.error)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error, pongase en contacto con el soporte.'
          )
        })
    },
    async deleteTestimony(testimonyId) {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      const options = {
        method: 'DELETE',
        url: `${this.$axios.defaults.baseURL}auth/settings-delete-testimony/${testimonyId}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }

      await this.$axios
        .request(options)
        .then((res) => {
          console.debug(res)
          this.loadingOff()
          this.getTestimonies()
          // this.sliders = res.data
          // this.logout()
          // this.$router.push('/')
        })
        .catch((e) => {
          console.debug(e.response.data.error)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error, pongase en contacto con el soporte.'
          )
        })
    },
    async submitNewVideo() {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      const options = {
        method: 'POST',
        url: `${this.$axios.defaults.baseURL}auth/settings-new-video`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: this.newVideo,
      }

      await this.$axios
        .request(options)
        .then((res) => {
          console.debug(res)
          this.loadingOff()
          this.newVideoDialog = false
          this.newVideo = {}
          this.snackbarOn('El video fue creado exitosamente.')
          this.getVideos()
        })
        .catch((e) => {
          console.debug(e.response.data.error)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error, pongase en contacto con el soporte.'
          )
        })
    },
    async submitNewTestimony() {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))
      const form = new FormData()
      form.append('image', this.newTestimony.image)
      form.append('name', this.newTestimony.name)
      form.append('description', this.newTestimony.description)

      const options = {
        method: 'POST',
        url: `${this.$axios.defaults.baseURL}auth/settings-new-testimony`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: form,
      }

      await this.$axios
        .request(options)
        .then((res) => {
          console.debug(res)
          this.loadingOff()
          this.newTestimonyDialog = false
          this.newTestimony = {}
          this.snackbarOn('El Testimonio fue creado exitosamente.')
          this.getTestimonies()
        })
        .catch((e) => {
          console.debug(e.response.data.error)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error, pongase en contacto con el soporte.'
          )
        })
    },
    async submitNewSlide() {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))
      const form = new FormData()
      form.append('image', this.newSlide.image)
      form.append('title', this.newSlide.title)
      form.append('description', this.newSlide.description)
      form.append('id_featured_type', this.newSlide.id_featured_type)

      const options = {
        method: 'POST',
        url: `${this.$axios.defaults.baseURL}auth/settings-new-slide`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: form,
      }

      await this.$axios
        .request(options)
        .then((res) => {
          console.debug(res)
          this.loadingOff()
          this.newSlideDialog = false
          this.newSlide = {}
          this.snackbarOn('El slide fue creado exitosamente.')
          this.getSliders()
        })
        .catch((e) => {
          console.debug(e.response.data.error)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error, pongase en contacto con el soporte.'
          )
        })
    },
    async submitNewMember() {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))
      const form = new FormData()
      form.append('image', this.newMember.image)

      const options = {
        method: 'POST',
        url: `${this.$axios.defaults.baseURL}auth/settings-new-member`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: form,
      }

      await this.$axios
        .request(options)
        .then((res) => {
          console.debug(res)
          this.loadingOff()
          this.newMemberDialog = false
          this.newMember = {}
          this.snackbarOn('El Miembro fue creado exitosamente.')
          this.getMembers()
        })
        .catch((e) => {
          console.debug(e.response.data.error)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error, pongase en contacto con el soporte.'
          )
        })
    },
    async submitEditSlide(slideId) {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))
      const form = new FormData()
      if (typeof this.newSlide.image === 'object') {
        form.append('image', this.newSlide.image)
      }
      form.append('title', this.newSlide.title)
      form.append('description', this.newSlide.description)
      form.append('_method', 'PUT')
      form.append('id_featured_type', this.newSlide.id_featured_type)

      const options = {
        method: 'POST',
        url: `${this.$axios.defaults.baseURL}auth/settings-edit-slide/${slideId}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: form,
      }

      await this.$axios
        .request(options)
        .then((res) => {
          console.debug(res)
          this.loadingOff()
          this.editSlideDialog = false
          this.newSlide = {}
          this.snackbarOn('El slide fue editado exitosamente.')
          this.getSliders()
        })
        .catch((e) => {
          console.debug(e.response.data.error)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error, pongase en contacto con el soporte.'
          )
        })
    },
    async submitEditTestimony(testimonyId) {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))
      const form = new FormData()
      if (typeof this.newTestimony.image === 'object') {
        form.append('image', this.newTestimony.image)
      }
      form.append('image', this.newTestimony.image)
      form.append('name', this.newTestimony.name)
      form.append('description', this.newTestimony.description)
      form.append('_method', 'PUT')

      const options = {
        method: 'POST',
        url: `${this.$axios.defaults.baseURL}auth/settings-edit-testimony/${testimonyId}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: form,
      }

      await this.$axios
        .request(options)
        .then((res) => {
          console.debug(res)
          this.loadingOff()
          this.editTestimonyDialog = false
          this.newTestimony = {}
          this.snackbarOn('El Testimonio fue editado exitosamente.')
          this.getTestimonies()
        })
        .catch((e) => {
          console.debug(e.response.data.error)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error, pongase en contacto con el soporte.'
          )
        })
    },
    async submitEditMember(memberId) {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))
      const form = new FormData()
      if (typeof this.newMember.image === 'object') {
        form.append('image', this.newMember.image)
      }
      form.append('_method', 'PUT')

      const options = {
        method: 'POST',
        url: `${this.$axios.defaults.baseURL}auth/settings-edit-member/${memberId}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: form,
      }

      await this.$axios
        .request(options)
        .then((res) => {
          console.debug(res)
          this.loadingOff()
          this.editMemberDialog = false
          this.newMember = {}
          this.snackbarOn('El Miembro fue editado exitosamente.')
          this.getMembers()
        })
        .catch((e) => {
          console.debug(e.response.data.error)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error, pongase en contacto con el soporte.'
          )
        })
    },
    async submitEditVideo(videoId) {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      const options = {
        method: 'PUT',
        url: `${this.$axios.defaults.baseURL}auth/settings-edit-video/${videoId}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: this.newVideo,
      }

      await this.$axios
        .request(options)
        .then((res) => {
          console.debug(res)
          this.loadingOff()
          this.editVideoDialog = false
          this.newVideo = {}
          this.snackbarOn('El video fue editado exitosamente.')
          this.getVideos()
        })
        .catch((e) => {
          console.debug(e.response.data.error)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error, pongase en contacto con el soporte.'
          )
        })
    },
    getPreviewImage(image) {
      let previewImage = `${this.img_baseUrl}${image}`
      if (image != null && typeof image === 'object') {
        previewImage = URL.createObjectURL(image)
      }
      return previewImage
    },
    newSlideDialogOn() {
      this.newSlideDialog = true
      this.newSlide = {
        image: null,
        id_featured_type: null,
        title: null,
        description: null,
      }
    },
    disabledNewSlide(slideType) {
      let isMaxSlide = false
      if (slideType) {
        if (slideType === 2) {
          isMaxSlide = this.sliders[0].slides.length === 4
        } else if (slideType === 3) {
          isMaxSlide = this.sliders[1].slides.length === 4
        }
        console.debug(isMaxSlide)
      }
      return this.$v.newSlide.$invalid || isMaxSlide
    },
  },
  computed: {
    imageErrors() {
      const errors = []
      if (!this.$v.newSlide.image.$dirty) return errors
      !this.$v.newSlide.image.required &&
        errors.push('Este campo es requerido.')
      return errors
    },
    carouselTypeErrors() {
      const errors = []
      if (!this.$v.newSlide.id_featured_type.$dirty) return errors
      !this.$v.newSlide.id_featured_type.required &&
        errors.push('Este campo es requerido.')
      return errors
    },
  },
  validations: {
    newSlide: {
      image: {
        required,
      },
      id_featured_type: {
        required,
      },
    },
  },
}
</script>

<style lang="scss">
.settings-page {
  margin-bottom: 250px;
}
</style>
