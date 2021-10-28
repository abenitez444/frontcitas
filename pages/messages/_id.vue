<template>
  <!-- content -->
  <v-col
    cols="12"
    sm="12"
    md="8"
    lg="6"
    class="messages-page order-2 order-md-1"
    v-if="getUserData"
  >
    <v-sheet color="transparent">
      <!-- chatbox -->
      <v-row no-gutters class="messages-wrapper">
        <v-col>
          <v-card class="cm-round-1 cm-elevation-1">
            <v-card-text class="pa-4 pa-sm-8">
              <v-sheet>
                <div>
                  <div class="parent-wrapper">
                    <!-- bind your configurations -->
                    <vuescroll :ops="ops" ref="vuescroll">
                      <v-sheet class="child-wrapper">
                        <div
                          class="message-body"
                          :class="
                            item.from_id === getUserData.id
                              ? 'from-me'
                              : 'to-me'
                          "
                          v-for="(item, i) in chat"
                          :key="i"
                        >
                          <div
                            v-if="item.from.avatar"
                            class="user-avatar bg-img"
                            :style="`background-image: url('${getAvatar(
                              item
                            )}')`"
                            :class="
                              item.from.gender === 1
                                ? 'man_color'
                                : 'woman_color'
                            "
                          ></div>
                          <div
                            class="
                              user-avatar
                              bg-img
                              d-flex
                              justify-center
                              align-center
                              white--text
                            "
                            v-else
                            :class="
                              item.from.gender === 1
                                ? 'man_color'
                                : 'woman_color'
                            "
                          >
                            <span class="font-weight-bold text-uppercase">
                              {{ item.from.first_name[0]
                              }}{{ item.from.last_name[0] }}
                            </span>
                          </div>
                          <v-card class="message-card">
                            <v-card-text>
                              <v-sheet>
                                <v-row justify="end" no-gutters>
                                  <v-col cols="auto">
                                    <span class="message-time">
                                      {{ dateToHuman(item.created_at) }}
                                    </span>
                                  </v-col>
                                </v-row>
                                <v-row no-gutters>
                                  <v-col>
                                    <p class="message-content font_one--text">
                                      {{ item.content }}
                                    </p>
                                  </v-col>
                                </v-row>
                                <v-row no-gutters>
                                  <template v-if="item.images.length">
                                    <v-col
                                      cols="auto"
                                      v-for="(item, index) in item.images"
                                      :key="index"
                                    >
                                      <v-dialog width="500">
                                        <template
                                          v-slot:activator="{ on, attrs }"
                                        >
                                          <v-btn
                                            height="auto"
                                            width="auto"
                                            class="pa-0"
                                            v-bind="attrs"
                                            v-on="on"
                                          >
                                            <!-- :src="`${img_baseUrl}${item.image}`" -->
                                            <img
                                              :src="`${img_baseUrl}${item.path}`"
                                              class="message-img-thumb"
                                              alt=""
                                            />
                                          </v-btn>
                                        </template>

                                        <v-card class="pa-8">
                                          <v-card-text class="pa-0">
                                            <img
                                              :src="`${img_baseUrl}${item.path}`"
                                              class="img-fluid rounded-lg"
                                              alt=""
                                            />
                                          </v-card-text>
                                        </v-card>
                                      </v-dialog>
                                    </v-col>
                                  </template>

                                  <template v-if="item.videos.length">
                                    <v-col
                                      cols="12"
                                      class="mt-5"
                                      v-for="(item, index) in item.videos"
                                      :key="index"
                                    >
                                      <video
                                        width="100%"
                                        height="auto"
                                        controls
                                      >
                                        <source
                                          :src="`${img_baseUrl}${item.path}`"
                                          type="video/mp4"
                                        />
                                      </video>
                                    </v-col>
                                  </template>
                                </v-row>
                              </v-sheet>
                              <!-- <pre>
                                {{ item }}
                              </pre> -->
                            </v-card-text>
                          </v-card>
                        </div>
                      </v-sheet>
                    </vuescroll>
                  </div>
                </div>
                <!-- <v-row>
                  <pre>
                    {{ selectedImg }}
                    {{ selectedVideo }}
                    {{ !!isSelectingImg }}
                    {{ !!isSelectingVideo }}
                  </pre>
                </v-row> -->
                <v-row>
                  <template v-if="selectedImg">
                    <v-col
                      cols="auto"
                      v-for="(item, index) in selectedImg"
                      :key="index"
                      class="images-wrapper"
                    >
                      <img
                        class="img-fluid preview-img rounded-b"
                        :src="getPreviewImage(item)"
                        alt=""
                      />
                      <v-btn
                        fab
                        x-small
                        color="error"
                        class="remove-item"
                        @click="deletePhoto(index)"
                      >
                        <v-icon> mdi-minus </v-icon>
                      </v-btn>
                    </v-col>
                  </template>

                  <template v-if="selectedVideo">
                    <v-col
                      class="videos-wrapper"
                      v-for="(item, index) in selectedVideo"
                      :key="index"
                      cols="auto"
                    >
                      <video width="250px" ref="video" height="auto" controls>
                        <source
                          :src="getPreviewVideo(item).url"
                          :type="getPreviewVideo(item).type"
                        />
                      </video>
                      <v-btn
                        fab
                        x-small
                        color="error"
                        class="remove-item"
                        @click="deleteVideo(item)"
                      >
                        <v-icon> mdi-minus </v-icon>
                      </v-btn>
                      <!-- <p class="text-center">
                        {{ checkVideoDuration(index) }}
                      </p> -->
                    </v-col>
                  </template>
                </v-row>
                <!-- send message form -->
                <v-row class="message-box mt-5">
                  <v-col>
                    <v-card>
                      <v-card-text>
                        <v-sheet>
                          <v-row>
                            <v-col class="mb-15">
                              <v-textarea
                                color="bada55"
                                name="input-7-4"
                                label=""
                                placeholder="Deja tu mensaje"
                                outlined
                                class="message-input"
                                hide-details=""
                                v-model="message"
                                @keyup.enter="sendMessage()"
                              ></v-textarea>
                            </v-col>
                            <div class="wrapper-toolbar">
                              <div>
                                <v-btn
                                  color="primary"
                                  class="text-none"
                                  small
                                  fab
                                  :loading="isSelectingVideo"
                                  @click="onButtonClickVideo"
                                >
                                  <v-icon> mdi-video </v-icon>
                                  <!-- {{ buttonText }} -->
                                </v-btn>
                                <input
                                  ref="uploader_video"
                                  class="d-none"
                                  type="file"
                                  accept="video/*"
                                  multiple
                                  @change="onVideoChanged"
                                />
                              </div>
                              <div class="mx-3">
                                <v-btn
                                  color="primary"
                                  class="text-none"
                                  small
                                  fab
                                  :loading="isSelectingImg"
                                  @click="onButtonClickImg"
                                >
                                  <v-icon> mdi-image </v-icon>
                                  <!-- {{ buttonText }} -->
                                </v-btn>
                                <input
                                  ref="uploader_img"
                                  class="d-none"
                                  type="file"
                                  accept="image/*"
                                  @change="onImgChanged"
                                  multiple
                                />
                              </div>
                              <!-- <v-btn fab x-small class="">
                                <v-icon color="primary"> mdi-video </v-icon>
                              </v-btn>
                              <v-btn fab x-small class="mx-3">
                                <v-icon color="primary"> mdi-image </v-icon>
                              </v-btn> -->
                              <!-- <v-file-input
                                v-model="files"
                                placeholder="Upload your documents"
                                label="File input"
                                multiple
                                prepend-icon="mdi-paperclip"
                              >
                                <template v-slot:selection="{ text }">
                                  <v-chip small label color="primary">
                                    {{ text }}
                                  </v-chip>
                                </template>
                              </v-file-input> -->
                              <v-btn
                                class="send-message-btn text-capitalize"
                                color="primary"
                                width="115px"
                                @click="sendMessage()"

                                :disabled="disableSubmit"
                              >
                                enviar1
                              </v-btn>
                              <!-- <v-btn
                                class="send-message-btn text-capitalize"
                                color="primary"
                                width="115px"
                                @click="sendMessage()"
                              >
                                <v-icon> mdi-image </v-icon>
                              </v-btn> -->
                            </div>
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
      <!-- <v-row>
        <pre>
          {{ chat[0] }}
        </pre>
      </v-row> -->
    </v-sheet>
  </v-col>
</template>

<script>
import authMixin from '@/mixins/authMixin'
import resources from '@/mixins/resources'
import loadingMixin from '@/mixins/loadingMixin'
import snackMixin from '@/mixins/snackMixin'
import vuescroll from 'vuescroll'
export default {
  mixins: [authMixin, resources, loadingMixin, snackMixin],
  middleware: ['authenticated'],
  layout: 'dashboard',
  data() {
    return {
      disableSubmit: false,
      defaultButtonText: 'upload',
      selectedImg: null,
      isSelectingImg: false,
      selectedVideo: null,
      isSelectingVideo: false,
      files: [],
      ops: {
        vuescroll: {},
        scrollPanel: {
          initialScrollY: '100%',
          scrollingX: true,
          scrollingY: true,
        },
        rail: {
          background: '#bada55',
          opacity: 0,
          size: '6px',
          specifyBorderRadius: false,
          gutterOfEnds: null,
          gutterOfSide: '2px',
          keepShow: true,
        },
        bar: {},
      },
      message: '',
      chat: [],
    }
  },
  components: {
    vuescroll,
  },
  mounted() {
    this.getChatRoom()
  },
  updated() {
    this.scrollToBottom()
  },
  methods: {
    getChatRoom() {
      this.broadcastMessages(this.$route.params.id)
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))
      // // console.debug(prof)
      // // console.debug(this.$route.params.id)
      let salaId
      if (this.$route.params.id < prof) {
        salaId = `${this.$route.params.id}${prof}`
      } else {
        salaId = `${prof}${this.$route.params.id}`
      }
      // // console.debug(salaId)

      this.$echo.channel(`chat.${salaId}`).listen('NewMessage', (e) => {
        // // console.debug(`Chat`, e)
        this.chat = e.chat
        this.countUnreadMessages()
        this.readMessage()
      })
      this.readMessage()
    },
    async checkVideoDuration(index) {
      let isOk = false
      await setTimeout(() => {
        const videoDuration = this.$refs['video'][index].duration
        if (videoDuration >= 10.6) {
          // return 'este video dura mas de 10 segundos'
          isOk = false
          // // console.debug(isOk)
        } else {
          // return 'Bien'
          isOk = true
          // // console.debug(isOk)
        }
      }, 1000)
      // // console.debug(isOk)
      // return isOk
    },
    getPreviewImage(image) {
      return URL.createObjectURL(image)
    },
    getPreviewVideo(video) {
      // // console.debug(video)
      return {
        url: URL.createObjectURL(video),
        type: video.type,
      }
    },
    async getMessagesByProfile(id) {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      await this.$axios
        .$get(
          `${this.$axios.defaults.baseURL}auth/chat-with/profile/${id}`,
          config
        )
        .then((res) => {
          this.loadingOff()
          this.messages = res.chat
          this.scrollToBottom()
          // this.settingUserData(res.profile)
        })
        .catch((e) => {
          this.loadingOff()
          this.scrollToBottom()
          // // console.debug(e)
        })
    },
    async sendMessage() {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))
      const profileId = this.$route.params.id
      const newMessage = {
        content: this.message,
      }
      const formData = new FormData()
      formData.append('content', this.message)

      if (this.selectedImg) {
        this.selectedImg.forEach((image, i) => {
          formData.append(`images[${i}]`, image)
        })
      }

      if (this.selectedVideo) {
        this.selectedVideo.forEach((video, i) => {
          formData.append(`videos[${i}]`, video)
        })
      }

      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      await this.$axios
        .$post(
          `${this.$axios.defaults.baseURL}auth/message-to/profile/${profileId}`,
          formData,
          config
        )
        .then((res) => {
          this.loadingOff()
          // this.getMessagesByProfile(profileId)
          this.broadcastMessages(profileId)
          this.messagesNotifications(profileId)
          this.message = ''
          this.resetSelectedImg()
          this.resetSelectedVideo()
          // this.snackbarOn('La publicación fue creada exitosamente')
        })
        .catch((e) => {
          // // console.debug(e)
          this.loadingOff()
          // this.snackbarOn(
          //   'Ha ocurrido un error al crear la publicación, por favor pongase en contacto con el soporte.'
          // )
        })
    },
    dateToHuman(date) {
      const dateObject = new Date(date)
      const humanDateFormat = dateObject.toLocaleString() //2019-12-9 10:30:15
      return humanDateFormat
    },
    scrollToBottom() {
      vuescroll.refreshAll()
      this.$refs.vuescroll.scrollTo(
        {
          y: '100%',
        },
        500,
        'easeInQuad'
      )
      // if (process.browser) {
      //   this.$refs.vuescroll.scrollTo(
      //     {
      //       y: '100%',
      //     },
      //     500,
      //     'easeInQuad'
      //   )
      // }
    },
    getAvatar(item) {
      return `${this.img_baseUrl}${item.from.avatar}`
    },
    // messages
    async broadcastMessages(id) {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      await this.$axios
        .$get(
          `${this.$axios.defaults.baseURL}auth/chat-websocket-with/profile/${id}`,
          config
        )
        .then((res) => {
          // // console.debug(res)
          this.loadingOff()
          this.messages = res.chat
          // this.scrollToBottom()
          // this.settingUserData(res.profile)
        })
        .catch((e) => {
          // console.debug(e)
          this.loadingOff()
          // this.scrollToBottom()
          // // console.debug(e)
        })
    },
    async messagesNotifications(id) {
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      await this.$axios
        .$get(
          `${this.$axios.defaults.baseURL}auth/notification-to/profile/${id}`,
          config
        )
        .then((res) => {
          // // console.debug(`messagesNotifications: ${res}`)
          // this.loadingOff()
          // this.messages = res.chat
          // this.scrollToBottom()
          // this.settingUserData(res.profile)
        })
        .catch((e) => {
          // console.debug(e)
          // this.loadingOff()
          // this.scrollToBottom()
          // // console.debug(e)
        })
    },
    async readMessage() {
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      // 'http://127.0.0.1:8000/api/auth/count-to/' +
      //   IdUsuarioLogeado +
      //   '/from/' +
      //   IdUsuarioAMandarMensaje,
      //   config
      const options = {
        method: 'GET',
        url: `${this.$axios.defaults.baseURL}auth/count-to/${prof}/from/${this.$route.params.id}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }

      await this.$axios
        .request(options)
        .then((res) => {
          // this.loadingOff()
          // console.debug(res.data[1].men, res.data[0].women)
          // console.debug('hey', this.chartDataGeneral.datasets[0].data)
        })
        .catch((e) => {
          // console.debug(e.response.data.error)
          // this.loadingOff()
          // this.snackbarOn(
          //   'Ha ocurrido un error, pongase en contacto con el soporte.'
          // )
        })
    },
    async countUnreadMessages() {
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      // 'http://127.0.0.1:8000/api/auth/count-unread/'+IdUsuarioAMandarMensaje, config
      const options = {
        method: 'GET',
        url: `${this.$axios.defaults.baseURL}auth/count-unread/${this.$route.params.id}`,
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
          // this.loadingOff()
          // console.debug(res.data[1].men, res.data[0].women)
          // console.debug('hey', this.chartDataGeneral.datasets[0].data)
        })
        .catch((e) => {
          // console.debug(e.response.data.error)
          // this.loadingOff()
          // this.snackbarOn(
          //   'Ha ocurrido un error, pongase en contacto con el soporte.'
          // )
        })
    },
    //custom file
    onButtonClickImg() {
      this.isSelectingImg = true
      window.addEventListener(
        'focus',
        () => {
          this.isSelectingImg = false
        },
        { once: true }
      )

      this.$refs.uploader_img.click()
    },
    onButtonClickVideo() {
      this.isSelectingVideo = true
      window.addEventListener(
        'focus',
        () => {
          this.isSelectingVideo = false
        },
        { once: true }
      )

      this.$refs.uploader_video.click()
    },
    onImgChanged(e) {
      this.selectedImg = e.target.files

      // do something
    },
    onVideoChanged(e) {
      this.selectedVideo = e.target.files

      let video = document.createElement('video')
      video.preload = 'metadata'
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src)

        if (video.duration >= 10.6) {
          // // console.debug('Invalid video')
          this.snackbarOn('La duración máxima de los videos es de 10 segundos')
          this.disableSubmit = true
          return
        } else {
          this.disableSubmit = false
        }
      }

      this.selectedVideo.forEach((item) => {
        video.src = URL.createObjectURL(item)
      })

      // e.target.value = ''
    },
    resetSelectedImg() {
      this.selectedImg = null
      this.isSelectingImg = false
    },
    deletePhoto(index) {
      this.selectedImg = Array.from(this.selectedImg)
      this.selectedImg.splice(index, 1)
    },
    deleteVideo(index) {
      this.selectedVideo = Array.from(this.selectedVideo)
      this.selectedVideo.splice(index, 1)
    },
    resetSelectedVideo() {
      this.selectedVideo = null
      this.isSelectingVideo = false
    },
  },
  computed: {
    // buttonText() {
    //   return this.selectedFile ? this.selectedFile.name : this.defaultButtonText
    // },
  },
}
</script>

<style lang="scss">
.messages-page {
  .parent-wrapper {
    // background-color: tomato;
    height: calc(100vh - (114px + 64px + 70px + 250px));
    overflow: auto;
    min-height: 511px;
    .child-wrapper {
      // background-color: teal;
      // height: 100vh;
    }
    .message-body {
      display: grid;
      margin: 1rem 1.5rem 2rem 0.5rem;
      grid-template-columns: auto 1fr;
      grid-gap: 15px;
      position: relative;
      &.from-me {
        grid-template-columns: 1fr auto;
      }
      .user-avatar {
        width: 90px;
        height: 90px;
        border-radius: 15px;
      }
      @media (max-width: 576px) {
        grid-template-columns: 1fr;
        margin: 1rem 1.5rem 4rem 0.5rem;
        &:first-child {
          margin: 4rem 1.5rem 4rem 0.5rem;
        }
        &:last-child {
          margin: 1rem 1.5rem 2rem 0.5rem;
        }
        .user-avatar {
          width: 50px;
          height: 50px;
          position: absolute;
          top: 0;
          right: unset;
          left: 0;
          transform: translate(-10px, -35px);
          z-index: 2;
        }
        &.from-me {
          grid-template-columns: 1fr;
          .user-avatar {
            top: 0;
            right: 0;
            left: unset;
            transform: translate(10px, -35px);
          }
        }
      }
      .message-card {
        .message-time {
          font-family: Roboto;
          font-weight: 500;
          font-size: 14px;
          line-height: 30px;
          display: flex;
          align-items: center;
          text-align: right;
          letter-spacing: -0.04em;
          color: rgba(50, 18, 21, 0.29);
          margin-bottom: 0.5rem;
        }
        .message-content {
          font-family: Roboto;
          font-style: normal;
          font-weight: 500;
          font-size: 18px;
          line-height: 1.25;
          letter-spacing: -0.02em;
          opacity: 0.75;
          padding: 0 1rem;
        }
        .message-img-thumb {
          width: 150px;
          height: auto;
        }
      }
      &.to-me {
        .user-avatar {
          order: 1;
        }
        .message-card {
          order: 2;
        }
      }
      &.from-me {
        .user-avatar {
          order: 2;
        }
        .message-card {
          order: 1;
        }
      }
    }
  }
  .message-box {
    .message-input {
      fieldset {
        border: 0;
      }
    }
  }
  .wrapper-toolbar {
    // background-color: #bada55;
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: flex-end;
    transform: translate(-12px, -12px);
    // height: 20px;
    width: 100%;
    .send-message-btn {
    }
  }
  .messages-wrapper {
    z-index: 4;
    position: relative;
    min-height: 768px;
  }
  .__bar-is-vertical {
    background: #480b0e !important;
  }
  .preview-img {
    width: 100px;
  }
  .images-wrapper,
  .videos-wrapper {
    position: relative;
    .remove-item {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
</style>
