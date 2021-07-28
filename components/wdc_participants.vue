<template>
  <v-sheet color="transparent">
    <v-row>
      <v-col>
        <h2 class="primary--text font-weight-light">Participantes Recientes</h2>
      </v-col>
    </v-row>
    <v-row v-for="(item, i) in participants" :key="i" class="participant-card">
      <v-col>
        <v-card class="card-wrapper" :to="`/messages/${item.id}`">
          <v-card-text>
            <v-sheet color="transparent">
              <v-row align="center">
                <v-col cols="auto">
                  <div
                    class="thumbnail bg-img"
                    :style="`background-image: url('${img_baseUrl}${item.avatar}');`"
                  ></div>
                </v-col>
                <v-col>
                  <!-- <p>{{ getActiveClasses(item.id) }}</p> -->
                  <p class="fullname font_one--text ma-0">
                    {{ item.first_name }} {{ item.last_name }}
                    <span class="gender">
                      <img :src="maleIcon" alt="" v-if="item.gender === 1" />

                      <img :src="femaleIcon" alt="" v-if="item.gender === 0" />
                    </span>
                  </p>
                  <p class="region ma-0">{{ item.region.name }}</p>
                </v-col>
              </v-row>
            </v-sheet>
          </v-card-text>
        </v-card>
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
      participants: [],
    }
  },
  mounted() {
    this.getParticipants()
  },
  methods: {
    async getParticipants() {
      this.loadingOn()
      const { token, sub } = JSON.parse(localStorage.getItem('wdc_token'))
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      await this.$axios
        .$get(`${this.$axios.defaults.baseURL}auth/opposite-sex/`, config)
        .then((res) => {
          console.debug(res)
          this.loadingOff()
          this.participants = res.users
        })
        .catch((e) => {
          this.loadingOff()
          console.debug(e)
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
  computed: {},
}
</script>

<style lang="scss">
.participant-card {
  .thumbnail {
    width: 60px;
    height: 60px;
    border-radius: 5px;
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
