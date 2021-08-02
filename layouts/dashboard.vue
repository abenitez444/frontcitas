<template>
  <v-app dark>
    <!-- trial dialog -->
    <v-dialog
      transition="dialog-bottom-transition"
      max-width="600"
      v-model="dialogInTrial"
    >
      <template v-slot:default="dialogInTrial">
        <v-card>
          <v-toolbar color="primary" dark>Modo Trial Activado</v-toolbar>
          <v-card-text>
            <p class="trial-description mt-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              voluptas quasi sunt modi dolorem, aliquam odit recusandae eligendi
              voluptate corporis voluptatem odio ad error labore aspernatur
              repellat. Obcaecati, rem placeat!
            </p>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="closeDialog()">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

    <!-- Appbar -->
    <v-app-bar
      :clipped-left="true"
      fixed
      app
      color="white"
      class="ma-auto custom-appbar"
      width="90%"
      height="114px"
    >
      <router-link to="/" class="text-decoration-none">
        <img :src="logoDefault" class="brand-image" alt="" />
      </router-link>
      <v-spacer />
      <v-btn
        class="mx-2 d-flex d-md-none"
        @click.stop="drawer = !drawer"
        small
        fab
        dark
        color="primary"
      >
        <v-icon dark> mdi-menu </v-icon>
      </v-btn>
      <template v-if="getUserData === null">
        <v-btn
          to="/auth/sign-up"
          elevation="0"
          rounded
          class="text-capitalize px-7 d-none d-md-flex"
          color="primary"
        >
          Registro
        </v-btn>
        <v-btn
          to="/auth/sign-in"
          elevation="0"
          rounded
          class="ml-5 text-capitalize px-7 d-none d-md-flex"
          color="primary"
        >
          Ingresar
        </v-btn>
      </template>
      <template v-else>
        <span class="font-weight-bold primary--text mr-6 d-none d-md-block">
          {{ getUserData.first_name }} {{ getUserData.last_name }}
        </span>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              text
              :ripple="false"
              :hover="false"
              width="auto"
              rounded
              fab
              class="mr-5 d-none d-md-flex"
            >
              <v-avatar size="60" color="primary">
                <img
                  :src="`${img_baseUrl}${getUserData.avatar}`"
                  v-if="getUserData.avatar !== ''"
                  alt="John"
                />
                <span v-else class="white--text text-h6">
                  {{ getUserData.first_name[0] }} {{ getUserData.last_name[0] }}
                </span>
              </v-avatar>
            </v-btn>
          </template>
          <v-list>
            <v-list-item to="/profile">
              <v-list-item-title>Perfil</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title @click="logoutAccount()"
                >Cerrar sesión</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed bottom temporary>
      <v-list nav>
        <v-list-item-group active-class="primary--text text--accent-4">
          <v-list-item to="/dashboard">
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item>

          <v-list-item to="/messages">
            <v-list-item-title>Mensajes</v-list-item-title>
          </v-list-item>

          <v-list-item to="/profile">
            <v-list-item-title>Perfil</v-list-item-title>
          </v-list-item>

          <v-list-item to="/participants">
            <v-list-item-title>Participantes</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="logoutAccount()"
              >Cerrar sesión</v-list-item-title
            >
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- UI dialogs -->
    <wdc-snackbar />
    <wdc-loading />
    <wdc-notifications />

    <!-- page content -->
    <v-main class="main-content" :class="`${$route.name}-main`">
      <!-- <nuxt /> -->
      <v-container fluid fill-height class="page-layout-1 profile">
        <v-row>
          <!-- Users list -->
          <v-col cols="3" v-if="!$vuetify.breakpoint.mdAndDown">
            <v-card class="cm-round-1 cm-elevation-1 participants-wrapper">
              <v-card-text class="pa-8">
                <wdc-participants />
              </v-card-text>
            </v-card>
          </v-col>

          <!-- content -->
          <nuxt />

          <!-- profile | menu | users on -->
          <v-col class="order-1 order-md-2" cols="12" sm="12" md="4" lg="3">
            <v-sheet color="transparent">
              <!-- profile -->
              <template v-if="!$vuetify.breakpoint.mdAndDown">
                <v-row no-gutters v-if="getUserData !== null">
                  <v-col>
                    <wdc-profile-card />
                  </v-col>
                </v-row>
              </template>

              <!-- Menu -->
              <v-row
                no-gutters
                class="mt-8 menu-wrapper"
                v-if="!$vuetify.breakpoint.mdAndDown"
              >
                <v-col> <wdc-menu /> </v-col>
              </v-row>

              <!-- Users online -->
              <!-- <v-row no-gutters class="mt-8">
                <v-col>
                  <v-card class="cm-round-1 cm-elevation-1">
                    <v-card-text class="pa-8"> En desarrollo </v-card-text>
                  </v-card>
                </v-col>
              </v-row> -->
              <!-- users -->
              <v-row no-gutters class="">
                <v-col v-if="$vuetify.breakpoint.mdAndDown">
                  <v-card
                    class="cm-round-1 cm-elevation-1 participants-wrapper"
                  >
                    <v-card-text class="pa-4 pa-sm-8">
                      <wdc-participants />
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- footer -->
    <wdc-footer />

    <!-- whatss app btn -->
    <!-- <div class="ws-btn">
      <a href=" https://web.whatsapp.com/" target="_blank">
        <v-btn fab large color="primary" elevation="0">
          <img :src="asset_ws" class="ws-icon" alt="" />
        </v-btn>
      </a>
    </div> -->
  </v-app>
</template>

<script>
import asset_wave from '@/assets/asset_wave.svg'
import asset_ws from '@/assets/ui-icon-whats_app.svg'
import logoDefault from '@/assets/ui-logo-default.svg'
import logoDark from '@/assets/ui-logo-dark.svg'
import logoInsta from '@/assets/ui-logo-insta.svg'
import authMixin from '@/mixins/authMixin'
import resourcesMixin from '@/mixins/resources'
import loadingMixin from '@/mixins/loadingMixin'
import wdc_snackbar from '~/components/wdc_snackbar.vue'
import Wdc_participants from '~/components/wdc_participants.vue'
import Wdc_footer from '~/components/wdc_footer.vue'
export default {
  components: { wdc_snackbar, Wdc_participants, Wdc_footer },
  mixins: [authMixin, resourcesMixin, loadingMixin],
  data() {
    return {
      drawer: false,
      //
      asset_wave,
      asset_ws,
      logoDefault,
      logoDark,
      logoInsta,
      //
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'WDC',
      //dialog
      dialogInTrial: false,
    }
  },
  mounted() {
    this.checkAuth()
    this.checkInTrial()
    if (localStorage.getItem('wdc_token') !== null) {
      this.getProfile()
    }
  },
  methods: {
    checkInTrial() {
      this.dialogInTrial = this.inTrial
    },
    closeDialog() {
      this.dialogInTrial = false
    },
    async getProfile() {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      await this.$axios
        .$get(
          `${this.$axios.defaults.baseURL}auth/profile/${prof}`,
          config
        )
        .then((res) => {
          this.loadingOff()
          this.user = res.profile
          this.settingUserData(res.profile)
        })
        .catch((e) => {
          this.loadingOff()
          console.debug(e)
        })
    },
  },
}
</script>
<style lang="scss">
//! footer top margins for pages

.main-content {
  padding-top: 0 !important;
  padding-bottom: 150px !important;
  &.profile-main,
  &.terms-main,
  &.policies-main {
    padding-bottom: 350px !important;
  }
}
.footer-app {
  position: relative;
  .insta-picture {
    width: 25px;
    height: auto;
    // box-shadow: 0 0 0 5px hsl(0, 0%, 80%);
  }
  .wave-footer {
    position: absolute;
    // background-color: teal;
    width: 100%;
    height: auto;
    top: 0;
    left: 0;
    transform: translateY(-99%);
  }
  .footer-title {
    margin-bottom: 12px;
    &.hidden {
      opacity: 0;
    }
  }
  .brand-description {
    max-width: 285px;
    letter-spacing: 0.015em;
    font-size: 18px;
    line-height: 28px;
    color: #fefefe;
    opacity: 0.5;
  }
  .footer-anchor,
  .copyright {
    opacity: 0.5;
    text-decoration: none;
    color: #fefefe;
    letter-spacing: 0.015em;
    font-size: 18px;
    line-height: 28px;
    color: #fefefe;
    opacity: 0.5;
  }
  .copyright {
    opacity: 1;
  }
  .methods-payment {
    .footer-anchor,
    .copyright {
      opacity: 1;
    }
  }
}
</style>
