<template>
  <v-app dark>
    <!-- <pre>
      {{ isAuthenticated }}
      {{ userData }}
    </pre> -->
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
      <!-- login / register -->
      <template v-if="getUserData === null">
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

      <!-- profile template -->
      <template v-else>
        <span class="font-weight-bold primary--text mr-6">
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
              class="mr-5"
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
          <v-list-item to="/auth/sign-up">
            <v-list-item-title>Registro</v-list-item-title>
          </v-list-item>

          <v-list-item to="/auth/sign-in">
            <v-list-item-title>Ingresar</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <wdc-snackbar />
    <wdc-loading />

    <!-- page content -->
    <v-main class="main-content" :class="`${$route.name}-main`">
      <nuxt />
    </v-main>

    <footer class="footer-app primary">
      <img :src="asset_wave" class="wave-footer" alt="" />
      <v-container>
        <!-- content -->
        <v-row>
          <v-col
            class="text-center text-md-left"
            order="1"
            order-lg="1"
            cols="12"
            md="6"
            lg=""
          >
            <img :src="logoDark" alt="" />
            <p class="brand-description ma-auto ma-md-0">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod incididunt ut labore et dolore magna aliqua.
            </p>
          </v-col>
          <v-col
            class="text-center"
            order="2"
            order-md="3"
            order-lg="2"
            cols="12"
            md="12"
            lg="6"
          >
            <h2 class="footer-title white--text">Secciones</h2>
            <ul class="footer-menu">
              <li>
                <router-link to="/" class="footer-anchor">Inicio</router-link>
              </li>
              <li>
                <router-link to="/" class="footer-anchor">Videos</router-link>
              </li>
              <li>
                <router-link to="/" class="footer-anchor"
                  >Miembros del club</router-link
                >
              </li>
              <li>
                <router-link to="/" class="footer-anchor"
                  >Testimonios</router-link
                >
              </li>
              <li>
                <router-link to="/" class="footer-anchor"
                  >Membresía</router-link
                >
              </li>
              <li class="mt-5">
                <a
                  href="https://www.instagram.com/"
                  title="Visita nuestro Instagram"
                  target="_blank"
                  ><img class="insta-picture" :src="logoInsta" alt=""
                /></a>
              </li>
            </ul>
          </v-col>
          <v-col
            class="text-center text-md-right"
            order="3"
            order-md="2"
            order-lg="3"
          >
            <h2 class="footer-title hidden d-none d-md-block">Extras</h2>
            <ul class="mt-0 mt-md-13">
              <!-- <li>Iniciar Sesión</li>
              <li>Nueva Cuenta</li> -->
              <!-- <li>
                <router-link to="/" class="footer-anchor"
                  >Preguntas Frecuentes</router-link
                >
              </li> -->
              <li>
                <router-link to="/policies" class="footer-anchor"
                  >Politicas de Privacidad</router-link
                >
              </li>
              <li>
                <router-link to="/terms" class="footer-anchor"
                  >Términos y condiciones</router-link
                >
              </li>
            </ul>
          </v-col>
        </v-row>

        <!-- copyright -->
        <v-row justify="space-around">
          <!-- <v-col cols="4">
            <img src="" alt="" />
          </v-col> -->
          <v-col
            cols="12"
            md="4"
            offset="0"
            offset-md="4"
            class="text-center copyright"
          >
            <p>Lorem Corporation © 2021</p>
          </v-col>
          <v-col
            cols="12"
            md="4"
            class="text-center text-md-right methods-payment"
          >
            <a href="#" class="white--text footer-anchor"> Paypal </a> |
            <a href="#" class="white--text footer-anchor">Binance</a>
          </v-col>
        </v-row>
      </v-container>
    </footer>
    <!-- whatss app btn -->
    <div class="ws-btn">
      <a href=" https://web.whatsapp.com/" target="_blank">
        <v-btn fab small color="primary" elevation="0">
          <img :src="asset_ws" class="ws-icon" alt="" />
        </v-btn>
      </a>
    </div>
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
export default {
  components: { wdc_snackbar },
  mixins: [authMixin, resourcesMixin, loadingMixin],
  // head() {
  //   return {
  //     title: 'Club Sugar',
  //   }
  // },
  data() {
    return {
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
      const { token, sub } = JSON.parse(localStorage.getItem('wdc_token'))
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      await this.$axios
        .$get(`${this.$axios.defaults.baseURL}auth/profile/${sub}`, config)
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
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;700;800&family=Raleway:wght@100;300;400;600;700&display=swap');
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
.brand-image {
}
@media (max-width: 576px) {
  .brand-image {
    width: 250px;
    height: auto;
  }
}
@media (max-width: 414px) {
  .brand-image {
    width: 150px;
    height: auto;
  }
}
</style>
