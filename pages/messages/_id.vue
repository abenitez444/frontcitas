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
            <v-card-text class="pa-8">
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
                            <v-btn
                              class="send-message-btn text-capitalize"
                              color="primary"
                              width="115px"
                              @click="sendMessage()"
                            >
                              enviar
                            </v-btn>
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
//Echo
// import Echo from 'laravel-echo'
// window.Pusher = require('pusher-js')
// window.Echo = new Echo({
//   broadcaster: 'pusher',
//   key: 'ASDASD2121',
//   wsHost: '127.0.0.1',
//   wsPort: 6001,
//   forceTLS: false,
//   disableStats: true,
// })
//Fin Echo
export default {
  mixins: [authMixin, resources, loadingMixin, snackMixin],
  middleware: ['authenticated'],
  layout: 'dashboard',
  data() {
    return {
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
  },
  computed: {},
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
      &.from-me {
        grid-template-columns: 1fr auto;
      }
      .user-avatar {
        width: 90px;
        height: 90px;
        border-radius: 15px;
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
  .send-message-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    transform: translate(-12px, -12px);
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
