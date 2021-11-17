<template>
  <!-- content -->
  <v-col
    cols="12"
    sm="12"
    md="8"
    lg="6"
    class="messages-page order-2 order-md-1"
  >
    <v-sheet color="transparent">
      <!-- chatbox -->
      <v-row no-gutters class="messages-wrapper">
        <v-col>
          <v-card class="cm-round-1 cm-elevation-1">
            <v-card-text class="pa-8">
              <v-sheet>
                <v-row>
                  <v-col class="text-center">
                    <h2>Seleccione un participante</h2>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-card
                      :to="`/messages/${notification.from_id}`"
                      v-for="(notification, i) in inbox"
                      :key="`card-${i}`"
                      class="mb-5"
                    >
                      <v-card-text>
                        <v-row>
                          <v-col cols="auto">
                            <v-col cols="auto" class="avatar-wrapper">
                              <div
                                class="profile-card__avatar"
                                :class="
                                  notification.from_avatar !== ''
                                    ? ''
                                    : 'primary  d-flex justify-center align-center'
                                "
                                :style="`background-image: url('${img_baseUrl}${notification.from_avatar}')`"
                              >
                                <span
                                  v-if="notification.from_avatar === ''"
                                  class="white--text text-h5 text-uppercase"
                                >
                                  {{ notification.from_first_name[0] }}
                                  {{ notification.from_last_name[0] }}
                                </span>
                              </div>

                              <img
                                v-if="!inTrial && $route.name !== 'trial_out'"
                                :src="membershipIcon"
                                class="profile-card__membership"
                                alt=""
                              /> </v-col
                          ></v-col>
                          <v-col cols="" align-self="center">
                            <h4 class="text-capitalize">
                              <b
                                >{{ notification.from_first_name }}
                                {{ notification.from_last_name }}
                              </b>
                            </h4>
                            <p>
                              {{ notification.last_message }}
                            </p>
                          </v-col>
                          <v-col cols="auto"
                            >{{ notification.ago }}
                            <small class="d-block">
                              Mensajes sin leer:
                              {{ notification.messages_unread }}
                            </small></v-col
                          >
                        </v-row>
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
import authMixin from '@/mixins/authMixin'
import resources from '@/mixins/resources'
import loadingMixin from '@/mixins/loadingMixin'
import snackMixin from '@/mixins/snackMixin'
import vuescroll from 'vuescroll'
import notificationMixin from '~/mixins/notificationMixin'
// import vuescroll from 'vuescroll/dist/vuescroll-native'
export default {
  mixins: [authMixin, resources, loadingMixin, snackMixin, notificationMixin],
  middleware: ['authenticated'],
  layout: 'dashboard',
  data() {
    return {
      inbox: [],
      ops: {
        vuescroll: {},
        scrollPanel: {},
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
    }
  },
  components: {
    vuescroll,
  },
  mounted() {
    const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

    this.$echo
      .channel(`my-unread-messages.${prof}`)
      .listen('CountMyUnreadMessages', (e) => {
        this.inbox = e.unread_by_user
        // console.debug(`CountMyUnreadMessages`, e)
      })
    this.countUnreadByUser()
  },

  methods: {
    dateToHuman(date) {
      const dateObject = new Date(date)
      const humanDateFormat = dateObject.toLocaleString() //2019-12-9 10:30:15
      return humanDateFormat
    },
    async countUnreadByUser() {
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      await this.$axios
        .$get(
          `${this.$axios.defaults.baseURL}auth/count-unread-by-user/${prof}`,
          config
        )
        .then((res) => {
          // this.inbox = res
          console.debug('en bandeja', res)
        })
        .catch((e) => {
          // this.loadingOff()
          // this.snackbarOn(e.response.data.error)
          console.debug(e.response.data)
        })
    },
  },
  computed: {},
  created() {
    this.settingNotifications()
  },
}
</script>

<style lang="scss">
.messages-page {
  .parent-wrapper {
    // background-color: tomato;
    height: calc(100vh - (114px + 64px + 70px + 250px));
    min-height: 511px;
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
    // position: absolute;
    // bottom: 0;
    // right: 0;
    // transform: translate(-12px, -12px);
  }
  .messages-wrapper {
    z-index: 4;
    position: relative;
    min-height: 768px;
  }
}
</style>
