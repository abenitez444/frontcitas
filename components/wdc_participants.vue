<template>
  <v-sheet color="transparent" class="">
    <v-row>
      <v-col>
        <h2 class="primary--text text-center text-sm-left">
          Participantes Recientes
        </h2>
      </v-col>
    </v-row>
    <v-row
      v-for="(item, i) in getParticipantsByIndex"
      :key="item.profile_id"
      class="participant-card"
      ref="participants"
      :data-id="`${item.id}`"
    >
      <v-col>
        <v-card class="card-wrapper" :to="`/participant/${item.id}`">
          <v-card-text>
            <v-sheet color="transparent" v-if="$route.name !== 'trial_out'">
              <v-row align="center">
                <v-col cols="auto">
                  <div
                    v-if="item.avatar"
                    class="thumbnail bg-img"
                    :style="`background-image: url('${img_baseUrl}${item.avatar}');`"
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
                    :class="item.gender === 1 ? 'man_color' : 'woman_color'"
                  >
                    <span class="font-weight-bold text-uppercase">
                      {{ item.first_name[0] }}{{ item.last_name[0] }}
                    </span>
                    <span v-if="item.online === true"> online </span>
                  </div>
                </v-col>
                <v-col>
                  <!-- <p>{{ getActiveClasses(item.id) }}</p> -->
                  <p class="fullname font_one--text ma-0 text-capitalize">
                    {{ item.first_name }} {{ item.last_name }}
                    <span class="gender">
                      <img :src="maleIcon" alt="" v-if="item.gender === 1" />

                      <img :src="femaleIcon" alt="" v-if="item.gender === 0" />
                    </span>
                  </p>
                  <p v-if="item.region" class="region ma-0">
                    {{ item.region.name }}
                  </p>
                </v-col>
              </v-row>
            </v-sheet>
            <v-sheet v-else>
              <v-row>
                <v-col>
                  <h3>Trial Caducado</h3>
                </v-col>
              </v-row>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" justify-center>
        <div class="text-center">
          <v-pagination
            color="primary"
            v-model="page"
            :length="participants.length"
          ></v-pagination>
        </div>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import authMixin from '@/mixins/authMixin'
import resources from '@/mixins/resources'
import loadingMixin from '@/mixins/loadingMixin'
import snackMixin from '@/mixins/snackMixin'
export default {
  mixins: [authMixin, resources, loadingMixin, snackMixin],
  middleware: ['authenticated'],
  data() {
    return {
      page: 1,
      participants: [],
    }
  },
  async mounted() {
    await this.getParticipants()
    this.usersOnline()
    this.checkUsers()
  },
  methods: {
    async getParticipants() {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      await this.$axios
        .$get(`${this.$axios.defaults.baseURL}auth/opposite-sex`, config)
        .then((res) => {
          // // // console.debug(res)
          this.loadingOff()
          this.participants = res.users
          console.debug(res.users[0])
          // this.usersOnline()
          // this.checkUsers()
        })
        .catch((e) => {
          this.loadingOff()
          // console.debug(e)
          this.snackbarOn(
            'Ha ocurrido un problema al cargar los participantes por favor pongase en contacto con el soporte.'
          )
        })
    },

    getActiveClasses(participantId) {
      let activeClasses =
        this.$route.name === 'messages-id' &&
        participantId == this.$route.params.id
          ? 'enabled'
          : ''

      return activeClasses
    },
  },
  computed: {
    getParticipantsByIndex() {
      let position = this.page - 1
      return this.participants[position]
    },
  },
}
</script>

<style lang="scss">
// @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;500;700&display=swap');
.participant-card {
  .thumbnail {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    position: relative;
    &::after {
      // background-color: #bada55;
      position: absolute;
      content: '';
      height: 15px;
      width: 15px;
      bottom: 0;
      right: 0;
    }
    &.online {
      &::after {
        // background-color: green;
      }
    }
  }
  .fullname {
    font-family: Raleway;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    // line-height: 30px;
    display: flex;
    align-items: flex-end;
    letter-spacing: -0.025em;
    // color: #321215;
    span {
      margin-left: 10px;
      display: block;
    }
  }
  .gender {
  }
  .region {
    font-family: Raleway;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    display: flex;
    align-items: flex-end;
    letter-spacing: -0.025em;
    color: #321215;
    opacity: 0.5;
  }
  .card-wrapper {
    &.nuxt-link-active {
      background-color: #eee;
      &::before {
      }
    }
  }
}
</style>
