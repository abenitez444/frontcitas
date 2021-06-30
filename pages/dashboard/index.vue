<template>
  <!-- content -->
  <v-col cols="6" class="timeline-page">
    <v-sheet color="transparent">
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
                  <v-col cols="1">
                    <div class="custom-file-wrapper">
                      <!-- @change="Preview_image" -->
                      <!-- @click:clear="resetThumbnail()" -->
                      <v-file-input
                        v-model="image"
                        height="100px"
                        class="custom-file-input"
                        accept="image/*"
                        label=""
                        hide-details=""
                        prepend-icon=""
                      >
                      </v-file-input>
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
                      <!-- <v-card-title class="text-h5 grey lighten-2">
                        En desarrollo
                      </v-card-title> -->

                      <v-card-text class="pa-15">
                        <v-sheet>
                          <v-row align="center">
                            <!-- Post Thumbnail -->
                            <v-col cols="auto" class="post-detail">
                              <img
                                src="http://placehold.it/300"
                                class="img-fluid"
                                alt=""
                              />
                              <!-- interaction bar -->
                              <div class="post-interactions">
                                <div class="comments interaction">
                                  <v-icon color="white">
                                    mdi-comment-outline
                                  </v-icon>
                                  <span class="interaction-number">1</span>
                                </div>
                                <div class="likes interaction">
                                  <v-icon color="white">
                                    mdi-thumb-up-outline
                                  </v-icon>
                                  <span class="interaction-number">1</span>
                                </div>
                                <div class="loves interaction">
                                  <v-icon color="white">
                                    mdi-heart-outline
                                  </v-icon>
                                  <span class="interaction-number">1</span>
                                </div>
                              </div>
                            </v-col>

                            <!-- Description -->
                            <v-col>
                              <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Atque iusto consequuntur dolor
                                consequatur dicta error reprehenderit adipisci
                                ut dolore provident dolorum perspiciatis
                                nesciunt saepe, vitae dolorem expedita autem
                                neque nihil.
                              </p>
                            </v-col>
                          </v-row>
                          <!-- Comments -->
                          <v-row align="center">
                            <v-col cols="auto">
                              <img src="http://placehold.it/75" alt="" />
                            </v-col>
                            <v-col>
                              <p class="mb-0">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Necessitatibus culpa
                                praesentium aliquid ab quidem dolores
                                doloremque, iusto laborum, minus maxime facilis
                                tempora tempore ipsam recusandae quas accusamus
                                similique modi impedit.
                              </p>
                            </v-col>
                          </v-row>
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
                                <!-- image -->
                                <!-- <img
                                  src="http://placehold.it/300"
                                  class="img-fluid timeline-thumbnail"
                                  alt=""
                                /> -->
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
                                          >Reportar</v-list-item-title
                                        >
                                      </v-list-item>
                                      <!-- <v-list-item>
                                        <v-list-item-title
                                          >Opción 2</v-list-item-title
                                        >
                                      </v-list-item> -->
                                    </v-list>
                                  </v-menu>
                                </div>

                                <!-- interaction bar -->
                                <div class="post-interactions">
                                  <div class="comments interaction">
                                    <v-icon color="white">
                                      mdi-comment-outline
                                    </v-icon>
                                    <span class="interaction-number">1</span>
                                  </div>
                                  <div class="likes interaction">
                                    <v-icon color="white">
                                      mdi-thumb-up-outline
                                    </v-icon>
                                    <span class="interaction-number">1</span>
                                  </div>
                                  <div class="loves interaction">
                                    <v-icon color="white">
                                      mdi-heart-outline
                                    </v-icon>
                                    <span class="interaction-number">1</span>
                                  </div>
                                </div>
                              </div>
                            </v-col>
                          </v-row>

                          <!-- description -->
                          <v-row
                            align="center"
                            class="cursor-pointer"
                            @click="showPostDetail(post)"
                          >
                            <v-col cols="auto">
                              <div
                                class="author-avatar bg-img"
                                :style="`background-image: url('${img_baseUrl}${post.profile.avatar}')`"
                              ></div>
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
                                :style="`background-image: url('${img_baseUrl}${getUserData.avatar}')`"
                                class="comment-avatar bg-img"
                                alt=""
                              />
                            </v-col>
                          </v-row>
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

      <!-- debug -->
      <v-row>
        <pre>
          <!-- {{ getUserData }} -->
          <!-- {{ posts }} -->
        </pre>
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
export default {
  mixins: [authMixin, resources, loadingMixin, snackMixin],
  middleware: ['authenticated'],
  components: {
    Carousel,
    Slide,
  },
  layout: 'dashboard',
  data() {
    return {
      featuredSlides: null,
      postDetail: false,
      posts: null,
      postSelected: null,
      //? new post
      image: null,
      postDescription: null,
    }
  },
  mounted() {
    this.getCarouselTimeline()
    this.getAllPosts()
  },
  methods: {
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
    showPostDetail(post) {
      this.postDetail = true
      this.postSelected = post
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
  .custom-file-wrapper {
    border-radius: 15px !important;
    overflow: hidden;
    box-shadow: 0px 1px 5px rgba(50, 18, 21, 0.29);
    .custom-file-input {
      margin-top: 0 !important;
      padding: 0 !important;
      .v-input__control {
        height: 42px;
        width: 42px;
      }
      .v-text-field__slot {
        opacity: 0;
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
      // margin-bottom: 10px;
      .post-options {
        top: 0;
        right: 0;
        transform: translate(-1rem, 1rem);
        position: absolute;
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
        .interaction {
        }
        .likes {
          margin: 0 20px;
        }
      }
      .timeline-thumbnail {
        border-radius: 10px;
      }
    }
    .author-avatar {
      height: 70px;
      width: 70px;
      border-radius: 10px;
      background-color: #bada55;
      border: 3px solid #ffffff;
      box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
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
    }
  }
}
.post-detail {
  position: relative;
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
    .likes {
      margin: 0 20px;
    }
  }
}
</style>
