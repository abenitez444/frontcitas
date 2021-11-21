<template>
  <v-col
    cols="12"
    sm="12"
    md="8"
    lg="9"
    class="participant-page order-2 order-md-1"
  >
    <!-- Profile Banner -->
    <v-sheet color="transparent" v-if="profile">
      <v-row class="content-wrapper">
        <v-col cols="12" lg="12">
          <v-card
            :style="`background-image: url('${img_baseUrl}${profile.featured_image}');`"
            class="cm-round-1 cm-elevation-1 bg-img profile-banner"
            height="250"
            :class="profile.featured_image ? '' : 'primary'"
          >
            <div class="profile-banner__avatar">
              <div
                v-if="profile.avatar"
                class="thumbnail bg-img"
                :style="`background-image: url('${img_baseUrl}${profile.avatar}');`"
              ></div>
              <div
                class="
                  thumbnail
                  bg-img
                  d-flex
                  justify-center
                  align-center
                  white--text
                "
                v-else
                :class="profile.gender === 1 ? 'man_color' : 'woman_color'"
              >
                <span class="font-weight-bold text-uppercase">
                  {{ profile.first_name[0] }}{{ profile.last_name[0] }}
                </span>
              </div>
            </div>
            <h1 class="profile-banner__fullname">
              {{ profile.first_name }} {{ profile.last_name }}
              <span class="profile-banner__icon">
                <img :src="maleIcon" alt="" v-if="profile.gender === 1" />

                <img :src="femaleIcon" alt="" v-if="profile.gender === 0" />
              </span>
            </h1>
            <div class="profile-banner__btns">
              <v-btn
                class="ml-auto"
                :to="`/messages/${$route.params.id}`"
                color=""
                x-small
                fab
              >
                <v-icon dark> mdi-message </v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>

    <!-- Errors -->
    <v-row class="mt-8" no-gutters v-if="hasErrors">
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
                        white--text
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

    <!-- New Post -->
    <v-sheet
      color="transparent"
      v-if="getUserData && $route.params.id == getUserData.id"
    >
      <v-row no-gutters class="mt-8 publish-wrapper">
        <v-col>
          <v-card class="cm-round-1 cm-elevation-1">
            <v-card-text class="pa-4 pa-sm-8">
              <v-sheet>
                <v-row align="center">
                  <v-col cols="12" sm="auto">
                    <div class="custom-file-wrapper mx-auto">
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
                  <v-col class="mb-5 mb-sm-0" cols="12" sm="">
                    <v-textarea
                      label="¿Qué tienes en mente?"
                      solo
                      auto-grow
                      rows="1"
                      row-height="15"
                      counter
                      :value="postDescription"
                      hide-details=""
                      v-model="postDescription"
                    ></v-textarea>
                    <!-- :rules="rules" -->
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
    </v-sheet>

    <!-- Posts -->
    <v-sheet color="transparent">
      <v-row class="content-wrapper posts mt-8">
        <!-- Profile Banner -->
        <template v-for="(post, index) in posts">
          <v-col
            cols="12"
            sm="6"
            md="4"
            :key="`post-${index}`"
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
                        <div
                          class="post-options"
                          v-if="getUserData.id !== post.profile.user.id"
                        >
                          <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                color="white"
                                v-bind="attrs"
                                v-on="on"
                                small
                                fab
                              >
                                <v-icon dark> mdi-dots-vertical </v-icon>
                              </v-btn>
                            </template>
                            <v-list>
                              <v-list-item @click="reportPost(post.id)">
                                <v-list-item-title
                                  >Reportar Publicación</v-list-item-title
                                >
                              </v-list-item>
                              <v-list-item
                                @click="reportDialogOn(post.profile.user.id)"
                              >
                                <v-list-item-title
                                  >Reportar Usuario</v-list-item-title
                                >
                              </v-list-item>
                              <v-list-item
                                @click="blockUser(post.profile.user.id)"
                              >
                                <v-list-item-title
                                  >Bloquear Usuario</v-list-item-title
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
                              @click.stop="sendReaction(post.id, 1, i)"
                            >
                              <template v-if="post.count_reactions.i_love_it">
                                <v-icon> mdi-heart </v-icon>
                              </template>
                              <v-icon v-else> mdi-heart-outline </v-icon>

                              <span
                                class="interaction-number ml-1"
                                v-if="post.count_reactions.love_it"
                                >{{ post.count_reactions.love_it }}
                              </span>
                            </v-btn>
                          </div>
                          <div class="loves interaction">
                            <v-btn
                              small
                              color="primary"
                              elevation="0"
                              @click.stop="sendReaction(post.id, 2, i)"
                            >
                              <template v-if="post.count_reactions.i_kiss_it">
                                <img
                                  :src="kissIconEnabled"
                                  style="width: 24px; height: auto"
                                  alt=""
                                />
                              </template>
                              <img
                                v-else
                                :src="kissIcon"
                                style="width: 24px; height: auto"
                                alt=""
                              />
                              <span
                                class="interaction-number ml-1"
                                v-if="post.count_reactions.kiss_it"
                                >{{ post.count_reactions.kiss_it }}
                              </span>
                            </v-btn>
                          </div>
                        </div>
                      </div>
                    </v-col>
                  </v-row>

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
                    <v-col cols="auto" class="d-none d-sm-block">
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
                </v-sheet>
              </v-card-text>
            </v-card>
          </v-col>
        </template>
      </v-row>
    </v-sheet>

    <v-dialog v-model="postDetail" width="900">
      <v-card>
        <v-card-text class="pa-15">
          <v-sheet v-if="postSelected !== null" class="post-detail">
            <!-- thumbnail | description -->
            <v-row align="center" class="post-header">
              <!-- Post Thumbnail -->
              <v-col cols="auto" class="post-detail__thumbnail">
                <template v-if="postSelected.image">
                  <img
                    :src="`${img_baseUrl}${postSelected.image}`"
                    class="img-fluid"
                    alt=""
                  />
                </template>
                <div v-else style="width: 300px"></div>
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
                      @click.stop="sendReaction(postSelected.id, 1, i)"
                    >
                      <template v-if="postSelected.count_reactions.i_love_it">
                        <v-icon> mdi-heart </v-icon>
                      </template>
                      <v-icon v-else> mdi-heart-outline </v-icon>

                      <span
                        class="interaction-number ml-1"
                        v-if="postSelected.count_reactions.love_it"
                        >{{ postSelected.count_reactions.love_it }}
                      </span>
                    </v-btn>
                  </div>
                  <div class="loves interaction">
                    <v-btn
                      small
                      color="primary"
                      elevation="0"
                      @click.stop="sendReaction(postSelected.id, 2, i)"
                    >
                      <template v-if="postSelected.count_reactions.i_kiss_it">
                        <img
                          :src="kissIconEnabled"
                          style="width: 24px; height: auto"
                          alt=""
                        />
                      </template>
                      <img
                        v-else
                        :src="kissIcon"
                        style="width: 24px; height: auto"
                        alt=""
                      />
                      <span
                        class="interaction-number ml-1"
                        v-if="postSelected.count_reactions.kiss_it"
                        >{{ postSelected.count_reactions.kiss_it }}
                      </span>
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
            </v-row>
          </v-sheet>
        </v-card-text>

        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import authMixin from '@/mixins/authMixin'
import resources from '@/mixins/resources'
import loadingMixin from '@/mixins/loadingMixin'
import snackMixin from '@/mixins/snackMixin'
import iconPlaceholder from '@/assets/ui-icon-image.svg'
import { mapActions, mapGetters } from 'vuex'
import accountIcon from '@/assets/ui-icon-account.svg'
export default {
  mixins: [authMixin, resources, loadingMixin, snackMixin],
  middleware: ['authenticated'],
  layout: 'dashboard',
  data() {
    return {
      accountIcon,
      iconPlaceholder,
      profile: false,
      posts: [],
      postDetail: false,
      postSelected: null,
      //? new post
      postImagePreview: null,
      image: null,
      postDescription: null,
      postProps: { size: '', height: '', width: '' },
      hasErrors: false,
      errors: [],
    }
  },
  created() {
    this.getMyProfile()
  },
  methods: {
    ...mapActions({
      setProfileData: 'profile/setProfileData',
    }),
    async getMyProfile() {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      await this.$axios
        .$get(
          `${this.$axios.defaults.baseURL}auth/profile/${this.$route.params.id}`,
          config
        )
        .then((res) => {
          console.debug(res)
          this.loadingOff()
          this.profile = res.profile
          this.setProfileData(res.profile)
          this.getPostsByProfile()
        })
        .catch((e) => {
          this.loadingOff()
          // console.debug(e)
          this.snackbarOn(
            'Ha ocurrido un problema al obtener el perfil. Por favor pongase en contacto con el soporte.'
          )
        })
    },
    async getPostsByProfile() {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      await this.$axios
        .$get(
          `${this.$axios.defaults.baseURL}auth/posts/user/${this.$route.params.id}`,
          config
        )
        .then((res) => {
          console.debug(res)
          this.loadingOff()
          this.posts = res.posts
        })
        .catch((e) => {
          this.loadingOff()
          // console.debug(e)
          this.snackbarOn(
            'Ha ocurrido un problema al obtener el perfil. Por favor pongase en contacto con el soporte.'
          )
        })
    },
    async showPostDetail(post) {
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))
      // // console.debug('hey friendo', newComment)
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
          this.getPostsByProfile()
          this.postDetail = true
          this.postSelected = res.post
          // this.showPostDetail(post)
          // this.snackbarOn('Comentario creado exitosamente')
        })
        .catch((e) => {
          // console.debug(e)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error al ver la publicación, por favor pongase en contacto con el soporte.'
          )
        })
    },
    async sendReaction(postId, reactionId, index) {
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

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
          this.postDetail = false
          this.getPostsByProfile()
        })
        .catch((e) => {
          // console.debug(e)
          // this.loadingOff()
        })
    },
    async sendComment(post) {
      const { newComment, id } = post
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))
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
          this.getPostsByProfile()
          this.showPostDetail(post)
          this.snackbarOn('Comentario creado exitosamente')
        })
        .catch((e) => {
          // console.debug(e)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error al crear la publicación, por favor pongase en contacto con el soporte.'
          )
        })
    },
    async newPost() {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))
      const formData = new FormData()
      formData.append('post', this.image)
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
          this.getPostsByProfile()
          this.snackbarOn('La publicación fue creada exitosamente')
        })
        .catch((e) => {
          // console.debug(e)
          this.loadingOff()
          // this.snackbarOn(
          //   'Ha ocurrido un error al crear la publicación, por favor pongase en contacto con el soporte.'
          // )
          this.snackbarOn(e.response.data.error)
        })
    },
    preview_image() {
      if (this.image != null) {
        this.postImagePreview = URL.createObjectURL(this.image)
        let file = this.image
        this.postProps.size = file.size
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (evt) => {
          let img = new Image()
          img.onload = () => {
            this.postProps.width = img.width
            this.postProps.height = img.height
            if (this.postProps.height <= 500 && this.postProps.width <= 500) {
              isAvailableImages = true
            } else {
              this.errors.push(
                'La imagen del post supera las dimensiones recomendadas (500x500)'
              )
              this.hasErrors = this.errors.length ? true : false
            }
            return isAvailableImages
          }
          img.src = evt.target.result
        }
        reader.onerror = (evt) => {
          console.error(evt)
        }
        if (this.hasErrors) {
          this.snackbarOn(
            'Ha ocurrido un problema con las imagenes, por favor siga las recomendaciones'
          )
        }
      } else {
        this.postImagePreview = null
      }
    },
  },
}
</script>

<style lang="scss">
.participant-page {
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
        // transform: translate(-1rem, -150%);
        transform: translate(-1rem, 1rem);
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
        // transform: translateY(150%);
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
      // &:hover {
      //   .post-options {
      //     opacity: 1;
      //     transform: translate(-1rem, 1rem);
      //   }
      //   .post-interactions {
      //     opacity: 1;
      //     transform: translateY(0%);
      //   }
      // }
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
  .publish-wrapper {
    position: relative;
    z-index: 4;
    .publish-btn {
      position: absolute;
      bottom: 0;
      right: 0;
      transform: translate(-45px, 50%);
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
  .profile-banner {
    padding: 19px 27px;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr auto;
    &__avatar {
      height: 181px;
      width: 181px;
      grid-row: 1 / -1;
      grid-column: 1 / 2;
      align-self: center;

      .thumbnail {
        height: 100%;
        border-radius: 10px;
        border: 5px solid #ffffff !important;
      }
    }
    &__fullname {
      margin-bottom: 30px;
      margin-left: 20px;
      grid-column: 2 / 3;
      grid-row: 3 / 4;
      font-family: Raleway;
      font-style: normal;
      font-weight: bold;
      font-size: 24px;
      line-height: 30px;
      letter-spacing: -0.025em;
      color: #fefefe;
      text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
    }
    &__icon {
      img {
        width: 23px;
        height: auto;
      }
    }
    &__btns {
      justify-self: end;
      grid-column: 2 / 3;
      grid-row: 1 / 2;
      button {
        margin: 0 10px !important;
      }
    }
    @media (max-width: 576px) {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: auto 1fr auto;
      &__avatar {
        height: 100px;
        width: 100px;
        grid-row: 2 / 3;
        grid-column: 2 / 3;
        align-self: center;
        justify-self: center;
      }
      &__fullname {
        grid-column: 1 / -1;
        margin-bottom: 0;
        text-align: center;
      }
      &__btns {
        grid-column: 3 / 4;
      }
    }
  }
  .content-wrapper.posts {
    margin-bottom: 150px;
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
