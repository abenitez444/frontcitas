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
                            class="user-avatar bg-img"
                            :style="`background-image: url('${getAvatar(
                              item
                            )}')`"
                          ></div>
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

                <!-- send message form -->
                <v-row class="message-box mt-5">
                  <v-col>
                    <v-card>
                      <v-card-text>
                        <v-sheet>
                          <v-row>
                            <v-col>
                              <v-textarea
                                name="input-7-4"
                                label=""
                                placeholder="Deja tu mensaje"
                                outlined
                                class="message-input"
                                hide-details=""
                                v-model="message"
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
                              >
                                enviar
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
      defaultButtonText: 'upload',
      selectedImg: null,
      isSelectingImg: false,
      selectedVideo: null,
      isSelectingVideo: false,
      //
      files: [],
      //
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
      // messages: [],
      chat: [],
    }
  },
  components: {
    vuescroll,
  },
  mounted() {
    // this.getMessagesByProfile(this.$route.params.id)

    this.broadcastMessages(this.$route.params.id)

    this.$echo.channel('chat').listen('NewMessage', (e) => {
      console.debug('Hey punk', e)
      this.chat = e.chat
    })
  },
  updated() {
    this.scrollToBottom()
  },
  methods: {
    async getMessagesByProfile(id) {
      this.loadingOn()
      const { token, sub } = JSON.parse(localStorage.getItem('wdc_token'))
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
          // console.debug(e)
        })
    },
    async sendMessage() {
      this.loadingOn()
      const { token, sub } = JSON.parse(localStorage.getItem('wdc_token'))
      const profileId = this.$route.params.id
      const newMessage = {
        content: this.message,
      }
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      await this.$axios
        .$post(
          `${this.$axios.defaults.baseURL}auth/message-to/profile/${profileId}`,
          newMessage,
          config
        )
        .then((res) => {
          this.loadingOff()
          // this.getMessagesByProfile(profileId)
          this.broadcastMessages(profileId)
          this.message = ''
          // this.snackbarOn('La publicación fue creada exitosamente')
        })
        .catch((e) => {
          // console.debug(e)
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
    async broadcastMessages(id) {
      this.loadingOn()
      const { token, sub } = JSON.parse(localStorage.getItem('wdc_token'))
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
          console.debug(res)
          this.loadingOff()
          this.messages = res.chat
          // this.scrollToBottom()
          // this.settingUserData(res.profile)
        })
        .catch((e) => {
          console.debug(e)
          this.loadingOff()
          // this.scrollToBottom()
          // console.debug(e)
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
      this.selectedImg = e.target.files[0]

      // do something
    },
    async onVideoChanged(e) {
      this.selectedVideo = e.target.files[0]
      const duration = await this.getVideoDuration(this.selectedVideo)
      // console.debug(this.selectedVideo)

      // do something
    },
    getVideoDuration(file) {
      new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          const media = new Audio(reader.result)
          media.onloadedmetadata = () => resolve(media.duration)
          console.debug(media)
        }
        reader.readAsDataURL(file)
        reader.onerror = (error) => reject(error)
      })
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
    z-index: 6;
    position: relative;
  }
  .__bar-is-vertical {
    background: #480b0e !important;
  }
}
</style>
