<template>
  <!-- content -->
  <v-col cols="6" class="timeline-page">
    <v-dialog v-model="reportDialog" width="500">
      <v-card>
        <v-card-title class="text-h5 white--text primary">
          Reportando usuario
        </v-card-title>
        <v-card-text class="pa-10">
          <v-sheet>
            <v-row>
              <v-col cols="12">
                <v-select
                  :items="report_types"
                  :item-text="(item) => item.name"
                  :item-value="(item) => item.id"
                  @change="$v.report.id_report_type.$touch()"
                  @blur="$v.report.id_report_type.$touch()"
                  :error-messages="userToReportErrors"
                  label="Tipo de reporte"
                  solo
                  v-model="report.id_report_type"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  solo
                  name="input-7-4"
                  label="Motivo del reporte"
                  v-model="report.description"
                  :error-messages="descriptionErrors"
                  @input="$v.report.description.$touch()"
                  @blur="$v.report.description.$touch()"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-sheet>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="reportDialog = false">
            Volver
          </v-btn>
          <v-btn color="primary" @click="reportUser(userToReport)">
            Reportar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-sheet color="transparent">
      <!-- <v-row>
        <pre>
          {{ report }}
        </pre>
      </v-row> -->
      <!-- info -->
      <v-row no-gutters>
        <v-col v-if="featuredSlides !== null">
          <v-card color="" class="cm-round-1 cm-elevation-1 light">
            <v-card-text class="pa-8">
              <carousel :perPage="1">
                <slide v-for="(slide, i) in featuredSlides" :key="i">
                  <div
                    class="slide-thumbnail"
                    :style="`background-image: url('${slide.image}')`"
                  ></div>
                </slide>
              </carousel>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- New Post -->
      <v-row no-gutters class="mt-8 publish-wrapper">
        <v-col>
          <v-card class="cm-round-1 cm-elevation-1">
            <v-card-text class="pa-8">
              <v-sheet>
                <v-row align="center">
                  <v-col cols="auto">
                    <div class="custom-file-wrapper">
                      <!-- @change="Preview_image" -->
                      <!-- @click:clear="resetThumbnail()" -->
                      <v-file-input
                        @change="preview_image"
                        v-model="image"
                        height="100px"
                        class="custom-file-input"
                        accept="image/*"
                        label=""
                        hide-details=""
                        prepend-icon=""
                      >
                      </v-file-input>
                      <div
                        v-if="postImagePreview"
                        class="preview-image bg-img"
                        :style="`background-image: url('${postImagePreview}')`"
                      ></div>
                      <div
                        v-else
                        class="preview-image bg-img placeholder"
                        :style="`background-image: url('${iconPlaceholder}')`"
                      ></div>
                    </div>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="¿Qué tienes en mente?"
                      solo
                      hide-details=""
                      v-model="postDescription"
                    ></v-text-field>
                  </v-col>

                  <v-btn color="primary" class="publish-btn" @click="newPost()"
                    >Publicar</v-btn
                  >
                </v-row>
              </v-sheet>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- timeline -->
      <v-row no-gutters class="mt-8 timeline-wrapper">
        <v-col>
          <v-card class="cm-round-1 cm-elevation-1">
            <v-card-text class="pa-8">
              <v-sheet>
                <v-row>
                  <v-dialog v-model="postDetail" width="900">
                    <v-card>
                      <v-card-text class="pa-15">
                        <v-sheet
                          v-if="postSelected !== null"
                          class="post-detail"
                        >
                          <!-- thumbnail | description -->
                          <v-row align="center" class="post-header">
                            <!-- Post Thumbnail -->
                            <v-col cols="auto" class="post-detail__thumbnail">
                              <img
                                :src="`${img_baseUrl}${postSelected.image}`"
                                class="img-fluid"
                                alt=""
                              />
                              <!-- interaction bar -->
                              <div class="post-interactions">
                                <div
                                  class="comments interaction"
                                  v-if="postSelected.comments.length"
                                >
                                  <v-btn small color="primary" elevation="0">
                                    <v-icon> mdi-comment-outline </v-icon>
                                    <span class="interaction-number">
                                      <template>
                                        {{ postSelected.comments.length }}
                                      </template>
                                    </span>
                                  </v-btn>
                                </div>
                                <div class="likes interaction">
                                  <v-btn
                                    small
                                    color="primary"
                                    elevation="0"
                                    @click.stop="
                                      sendReaction(postSelected.id, 1)
                                    "
                                  >
                                    <v-icon> mdi-heart-outline </v-icon>
                                    <span class="interaction-number ml-1">{{
                                      postSelected.count_reactions.love_it
                                    }}</span>
                                  </v-btn>
                                </div>
                                <div class="loves interaction">
                                  <v-btn
                                    small
                                    color="primary"
                                    elevation="0"
                                    @click.stop="
                                      sendReaction(postSelected.id, 2)
                                    "
                                  >
                                    <img
                                      :src="kissIcon"
                                      style="width: 24px; height: auto"
                                      alt=""
                                    />
                                    <!-- <v-icon> mdi-heart-outline </v-icon> -->
                                    <span class="interaction-number ml-1">{{
                                      postSelected.count_reactions.kiss_it
                                    }}</span>
                                  </v-btn>
                                </div>
                              </div>
                            </v-col>

                            <!-- Description -->
                            <v-col>
                              <p class="post-detail__description">
                                {{ postSelected.description }}
                              </p>
                            </v-col>
                          </v-row>

                          <!-- Comments -->

                          <v-row
                            v-for="(comment, i) in postSelected.comments"
                            class="comment-wrapper"
                            :key="i"
                          >
                            <v-col cols="auto">
                              <div
                                v-if="comment.user.profile.avatar !== ''"
                                class="avatar-box bg-img"
                                :style="`background-image: url('${img_baseUrl}${comment.user.profile.avatar}')`"
                              ></div>
                              <div
                                class="
                                  primary
                                  white--text
                                  d-flex
                                  justify-center
                                  align-center
                                  avatar-box
                                "
                                v-else
                              >
                                <span>
                                  {{ comment.user.profile.first_name[0] }}
                                  {{ comment.user.profile.last_name[0] }}
                                </span>
                              </div>
                            </v-col>
                            <v-col>
                              <p class="mb-0 comment-content font_one--text">
                                {{ comment.comment }}
                              </p>
                            </v-col>
                            <!-- <v-col cols="12">
                              <pre>
                              {{ comment.comment }}
                            </pre
                              >
                            </v-col> -->
                          </v-row>

                          <!-- <v-row>
                            <pre>
                              {{ postSelected }}
                            </pre>
                          </v-row> -->
                        </v-sheet>
                      </v-card-text>

                      <v-divider></v-divider>
                    </v-card>
                  </v-dialog>
                  <v-col
                    cols="6"
                    v-for="(post, i) in posts"
                    :key="i"
                    class="post-wrapper"
                  >
                    <v-card class="cm-round-1 cm-elevation-1">
                      <v-card-text>
                        <v-sheet>
                          <!-- thumbnail -->
                          <v-row
                            no-gutters
                            class="cursor-pointer"
                            @click="showPostDetail(post)"
                          >
                            <v-col>
                              <div
                                class="thumbnail-wrapper bg-img"
                                :style="`background-image: url('${img_baseUrl}${post.image}')`"
                              >
                                <!-- report -->
                                <v-btn
                                  x-small
                                  rounded
                                  color="error"
                                  class="btn-report"
                                  v-if="!post.status"
                                >
                                  Reportado
                                </v-btn>
                                <v-btn
                                  x-small
                                  rounded
                                  color="error"
                                  class="btn-report"
                                  v-if="post.profile.status === 3"
                                >
                                  Usuario Bloqueado
                                </v-btn>
                                <!-- options -->
                                <div class="post-options">
                                  <v-menu offset-y>
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-btn
                                        color="white"
                                        v-bind="attrs"
                                        v-on="on"
                                        small
                                        fab
                                      >
                                        <v-icon dark>
                                          mdi-dots-vertical
                                        </v-icon>
                                      </v-btn>
                                    </template>
                                    <v-list>
                                      <v-list-item>
                                        <v-list-item-title
                                          @click="reportPost(post.id)"
                                          >Reportar
                                          Publicación</v-list-item-title
                                        >
                                      </v-list-item>
                                      <v-list-item>
                                        <v-list-item-title
                                          @click="
                                            reportDialogOn(post.profile.user.id)
                                          "
                                          >Reportar Usuario</v-list-item-title
                                        >
                                      </v-list-item>
                                    </v-list>
                                  </v-menu>
                                </div>

                                <!-- interaction bar -->
                                <div class="post-interactions">
                                  <div class="comments interaction">
                                    <v-btn
                                      small
                                      color="primary"
                                      elevation="0"
                                      @click.stop="showPostDetail(post)"
                                      v-if="post.comments.length"
                                    >
                                      <v-icon> mdi-comment-outline </v-icon>
                                      <span class="interaction-number">
                                        <template>
                                          {{ post.comments.length }}
                                        </template>
                                      </span>
                                    </v-btn>
                                  </div>
                                  <div class="likes interaction">
                                    <v-btn
                                      small
                                      color="primary"
                                      elevation="0"
                                      @click.stop="sendReaction(post.id, 1)"
                                    >
                                      <v-icon> mdi-heart-outline </v-icon>
                                      <span class="interaction-number ml-1">{{
                                        post.count_reactions.love_it
                                      }}</span>
                                    </v-btn>
                                  </div>
                                  <div class="loves interaction">
                                    <v-btn
                                      small
                                      color="primary"
                                      elevation="0"
                                      @click.stop="sendReaction(post.id, 2)"
                                    >
                                      <img
                                        :src="kissIcon"
                                        style="width: 24px; height: auto"
                                        alt=""
                                      />
                                      <!-- <v-icon> mdi-heart-outline </v-icon> -->
                                      <span class="interaction-number ml-1">{{
                                        post.count_reactions.kiss_it
                                      }}</span>
                                    </v-btn>
                                  </div>
                                </div>
                              </div>
                            </v-col>
                          </v-row>

                          <!-- description -->
                          <!-- <v-row>
                            <pre>
                              {{post.count_reactions}}
                              Profile: {{ post.profile.id }}
                              User: {{ post.profile.user.id }}
                            </pre>
                          </v-row> -->
                          <v-row
                            align="center"
                            class="cursor-pointer"
                            @click="showPostDetail(post)"
                          >
                            <v-col cols="auto">
                              <div
                                v-if="post.profile.avatar !== ''"
                                class="author-avatar bg-img"
                                :style="`background-image: url('${img_baseUrl}${post.profile.avatar}')`"
                              ></div>
                              <div
                                v-else
                                class="
                                  author-avatar
                                  primary
                                  d-flex
                                  justify-center
                                  align-center
                                  white--text
                                "
                              >
                                {{ post.profile.first_name[0] }}
                                {{ post.profile.last_name[0] }}
                              </div>
                            </v-col>
                            <v-col class="">
                              <p class="mb-0 post-description">
                                {{ post.description }}
                              </p>
                            </v-col>
                          </v-row>

                          <!-- comentarios -->
                          <v-row
                            class="new-comment"
                            align="center"
                            v-if="getUserData !== null"
                          >
                            <v-col class="text-center">
                              <v-text-field
                                label="Comentario"
                                solo
                                hide-details=""
                                append-icon="mdi-send"
                                v-model="post.newComment"
                                @click:append="sendComment(post)"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="auto">
                              <img
                                v-if="getUserData.avatar !== ''"
                                :style="`background-image: url('${img_baseUrl}${getUserData.avatar}')`"
                                class="comment-avatar bg-img"
                                alt=""
                              />
                              <div
                                v-else
                                class="
                                  white--text
                                  text-h5 text-uppercase
                                  primary
                                  d-flex
                                  justify-center
                                  align-center
                                  comment-avatar
                                "
                              >
                                {{ getUserData.first_name[0] }}
                                {{ getUserData.last_name[0] }}
                              </div>
                            </v-col>
                          </v-row>
                          <!-- <v-row>
                            <pre>
                              {{ post.profile.status }}
                            </pre>
                          </v-row> -->
                        </v-sheet>
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
import { Carousel, Slide } from 'vue-carousel'
import authMixin from '@/mixins/authMixin'
import resources from '@/mixins/resources'
import loadingMixin from '@/mixins/loadingMixin'
import snackMixin from '@/mixins/snackMixin'
import iconPlaceholder from '@/assets/ui-icon-image.svg'
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
export default {
  mixins: [authMixin, resources, loadingMixin, snackMixin, validationMixin],
  middleware: ['authenticated'],
  components: {
    Carousel,
    Slide,
  },
  layout: 'dashboard',
  validations: {
    report: {
      id_report_type: { required },
      description: { required },
    },
  },
  data() {
    return {
      iconPlaceholder,
      featuredSlides: null,
      postDetail: false,
      posts: null,
      postSelected: null,
      //? new post
      postImagePreview: null,
      image: null,
      postDescription: null,
      //? Report
      reportDialog: false,
      userToReport: null,
      report: {},
    }
  },
  mounted() {
    this.getReportTypes()
    this.getCarouselTimeline()
    this.getAllPosts()
  },
  methods: {
    reportDialogOn(id) {
      this.reportDialog = true
      this.userToReport = id
    },
    async reportUser(id) {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.loadingOn()
        const { token, sub } = JSON.parse(localStorage.getItem('wdc_token'))
        const options = {
          method: 'post',
          url: `${this.$axios.defaults.baseURL}auth/report-user/${id}`,
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
          data: this.report,
        }
        await this.$axios
          .request(options)
          .then((res) => {
            console.debug(res)
            this.loadingOff()
            this.reportDialog = false
            this.getAllPosts()
            this.snackbarOn('El Usuario fue reportado exitosamente.')
          })
          .catch((e) => {
            this.loadingOff()
            this.snackbarOn(
              'ha ocurrido un error al reportar al Usuario, por favor ponerse en contacto con el soporte.'
            )
          })
      }
    },
    async reportPost(id) {
      this.loadingOn()
      const { token, sub } = JSON.parse(localStorage.getItem('wdc_token'))
      const options = {
        method: 'PUT',
        url: `${this.$axios.defaults.baseURL}auth/report-post/${id}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      await this.$axios
        .request(options)
        .then((res) => {
          console.debug(res)
          this.getAllPosts()
          this.loadingOff()
          this.snackbarOn('El post fue reportado exitosamente.')
        })
        .catch((e) => {
          this.loadingOff()
          this.snackbarOn(
            'ha ocurrido un error al reportar el post, por favor ponerse en contacto con el soporte.'
          )
        })
    },
    preview_image() {
      if (this.image != null) {
        this.postImagePreview = URL.createObjectURL(this.image)
      } else {
        this.postImagePreview = null
      }
    },
    async getCarouselTimeline() {
      await this.$axios
        .$get(`${this.$axios.defaults.baseURL}settings/3`)
        .then((res) => {
          console.debug(res)
          this.featuredSlides = res.data
        })
        .catch((e) => {
          console.debug(e)
        })
    },
    async sendComment(post) {
      const { newComment, id } = post
      const { token, sub } = JSON.parse(localStorage.getItem('wdc_token'))
      // console.debug('hey friendo', newComment)
      this.loadingOn()
      const new_comment = {
        comment: newComment,
      }
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      await this.$axios
        .$post(
          `${this.$axios.defaults.baseURL}auth/comment-post/post/${id}`,
          new_comment,
          config
        )
        .then((res) => {
          this.loadingOff()
          this.getAllPosts()
          this.showPostDetail(post)
          this.snackbarOn('Comentario creado exitosamente')
        })
        .catch((e) => {
          console.debug(e)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error al crear la publicación, por favor pongase en contacto con el soporte.'
          )
        })
    },
    async showPostDetail(post) {
      const { token, sub } = JSON.parse(localStorage.getItem('wdc_token'))
      // console.debug('hey friendo', newComment)
      this.loadingOn()
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      await this.$axios
        .$get(`${this.$axios.defaults.baseURL}auth/post/${post.id}`, config)
        .then((res) => {
          this.loadingOff()
          this.getAllPosts()
          this.postDetail = true
          this.postSelected = res.post
          // this.showPostDetail(post)
          // this.snackbarOn('Comentario creado exitosamente')
        })
        .catch((e) => {
          console.debug(e)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error al ver la publicación, por favor pongase en contacto con el soporte.'
          )
        })
    },
    async getAllPosts() {
      const { token, sub } = JSON.parse(localStorage.getItem('wdc_token'))
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      await this.$axios
        .$get(`${this.$axios.defaults.baseURL}auth/all-posts`, config)
        .then((res) => {
          console.debug(res)
          this.posts = res.posts
        })
        .catch((e) => {
          console.debug(e)
        })
    },
    async newPost() {
      this.loadingOn()
      const { token, sub } = JSON.parse(localStorage.getItem('wdc_token'))
      const formData = new FormData()
      formData.append('image', this.image)
      formData.append('description', this.postDescription)

      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      await this.$axios
        .$post(`${this.$axios.defaults.baseURL}auth/new-post`, formData, config)
        .then((res) => {
          this.postImagePreview = null
          this.image = null
          this.postDescription = null
          this.loadingOff()
          this.getAllPosts()
          this.snackbarOn('La publicación fue creada exitosamente')
        })
        .catch((e) => {
          console.debug(e)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error al crear la publicación, por favor pongase en contacto con el soporte.'
          )
        })
    },
    async sendReaction(postId, reactionId) {
      console.debug(postId, reactionId)
      this.loadingOn()
      const { token, sub } = JSON.parse(localStorage.getItem('wdc_token'))

      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      await this.$axios
        .$put(
          `${this.$axios.defaults.baseURL}auth/raction-post/${postId}/reaction/${reactionId}`,
          null,
          config
        )
        .then((res) => {
          this.loadingOff()
          this.postDetail = false
          this.getAllPosts()
        })
        .catch((e) => {
          console.debug(e)
          this.loadingOff()
        })
    },
  },
  computed: {
    userToReportErrors() {
      const errors = []
      if (!this.$v.report.id_report_type.$dirty) return errors
      !this.$v.report.id_report_type.required &&
        errors.push('El tipo de reporte es requerido')
      return errors
    },
    descriptionErrors() {
      const errors = []
      if (!this.$v.report.description.$dirty) return errors
      !this.$v.report.description.required &&
        errors.push('El motivo del reporte es requerido')
      return errors
    },
  },
}
</script>

<style lang="scss">
.timeline-page {
  .VueCarousel {
    position: relative;
    &-pagination {
      //   max-width: 1440px;
      // margin: 0 auto;
      // text-align: right !important;
      position: absolute;
      bottom: 0;
      right: 0;
      width: auto;
    }
    &-dot-container,
    &-dot {
      margin-top: 0 !important;
    }
    &-dot-container {
    }
    &-dot {
      background-color: $primary !important;
      margin: 0 7.5px 0 7.5px !important;
      padding: 0 !important;
      width: 50px !important;
      height: 16px !important;
      border-radius: 100px !important;
      filter: $elevation-1;
    }
  }
  .slide-thumbnail {
    height: 250px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 15px;
  }
  .preview-image {
    height: 100px;
    width: 100px;
    border-radius: 15px !important;
    box-shadow: 0px 1px 5px rgba(50, 18, 21, 0.29);
    position: absolute;
    top: 0;
    left: 0;
    &.placeholder {
      background-size: 50%;
    }
  }
  .custom-file-wrapper {
    border-radius: 15px !important;
    box-shadow: 0px 1px 5px rgba(50, 18, 21, 0.29);
    overflow: hidden;
    position: relative;
    .custom-file-input {
      margin-top: 0 !important;
      padding: 0 !important;
      position: relative;
      z-index: 100;
      .v-input__control {
        height: 100%;
        width: 100px;
        border-radius: 15px !important;
      }
      .v-text-field__slot {
        opacity: 0;
        height: 100%;
      }
      .v-input__slot::before,
      .v-input__slot::after {
        display: none;
      }
    }
  }
  .publish-wrapper {
    position: relative;
    .publish-btn {
      position: absolute;
      bottom: 0;
      right: 0;
      transform: translate(-45px, 50%);
    }
  }
  .timeline-wrapper {
    position: relative;
    z-index: 1;
  }
  .post-wrapper {
    .thumbnail-wrapper {
      height: 300px;
      position: relative;
      border-radius: 10px;
      overflow: hidden;

      // margin-bottom: 10px;
      .post-options {
        top: 0;
        right: 0;
        transform: translate(-1rem, -150%);
        position: absolute;
        transition: 0.5s ease;
      }
      .post-interactions {
        background-color: $primary;
        color: white;
        border-radius: 50px;
        padding: 5px 40px;
        display: flex;
        position: absolute;
        bottom: 10px;
        right: 5px;
        min-height: 50;
        transform: translateY(150%);
        transition: 0.5s ease;
        .interaction {
        }
        .likes {
          // margin: 0 20px;
        }
      }
      .timeline-thumbnail {
        border-radius: 10px;
      }
      .btn-report {
        transform: translate(1rem, 1.5rem);
      }
      &:hover {
        .post-options {
          opacity: 1;
          transform: translate(-1rem, 1rem);
        }
        .post-interactions {
          opacity: 1;
          transform: translateY(0%);
        }
      }
    }
    .author-avatar {
      height: 70px;
      width: 70px;
      border-radius: 10px;
      border: 3px solid #ffffff;
      box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
      font-size: 16px;
      text-transform: uppercase;
      font-weight: bold;
    }
    .post-description {
      font-size: 16px;
      line-height: 14px;
      color: #242424;
      opacity: 0.75;
      font-family: Open Sans;
      font-style: normal;
      font-weight: normal;
    }
  }
  .new-comment {
    .comment-avatar {
      border-radius: 50px;
      width: 45px;
      height: 45px;
      font-size: 12px !important;
    }
  }
}
.post-detail {
  &__thumbnail {
    position: relative;
    // max-width: 300px;
    .img-fluid {
      border-radius: 15px;
      max-width: 300px;
    }
    .post-interactions {
      background-color: $primary;
      color: white;
      border-radius: 50px;
      padding: 5px 40px;
      display: flex;
      position: absolute;
      bottom: 0;
      left: 50%;
      width: max-content;
      transform: translateX(-50%);
      // min-height: 50px;
      .interaction {
      }
    }
  }
  &__description {
    font-family: Open Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    color: #242424;
    opacity: 0.75;
  }
  .avatar-box {
    font-size: 16px;
    text-transform: uppercase;
    border-radius: 15px;
    height: 96px;
    width: 96px;
  }

  .post-header {
    margin-bottom: 24px;
  }
  .comment-content {
    font-family: Open Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: -0.02em;
    opacity: 0.75;
    border: 2px solid #e9e9e9;
    border-radius: 5px;
    padding: 15px;
    height: 100%;
  }
}
.v-dialog.v-dialog--active {
  max-height: 730px !important;
}
</style>
