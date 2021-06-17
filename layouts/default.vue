<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="white"
      class="ma-auto custom-appbar"
      width="90%"
      height="114px"
    >
      <router-link to="/" class="text-decoration-none">
        <img :src="logoDefault" alt="" />
      </router-link>
      <v-spacer />
      <template v-if="!isAuthenticated">
        <v-btn
          to="/auth/sign-up"
          elevation="0"
          rounded
          class="text-capitalize px-7"
          color="primary"
        >
          Registro
        </v-btn>
        <v-btn
          to="/auth/sign-in"
          elevation="0"
          rounded
          class="ml-5 text-capitalize px-7"
          color="primary"
        >
          Ingresar
        </v-btn>
      </template>
      <template v-else>
        <router-link to="/profile" class="text-decoration-none">
          <span class="font-weight-bold primary--text mr-6"> John Doe </span>
          <v-avatar size="60" class="mr-5">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
        </router-link>
      </template>
    </v-app-bar>

    <!-- page content -->
    <v-main class="main-content">
      <nuxt />
    </v-main>

    <v-footer :absolute="!fixed" app color="primary" dark class="footer-app">
      <img :src="asset_wave" class="wave-footer" alt="" />
      <v-container>
        <!-- content -->
        <v-row>
          <v-col>
            <img :src="logoDark" alt="" />
            <p class="brand-description">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod incididunt ut labore et dolore magna aliqua.
            </p>
          </v-col>
          <v-col class="text-center" cols="6">
            <h2 class="footer-title">Secciones</h2>
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
          <v-col class="text-right">
            <h2 class="footer-title hidden">Extras</h2>
            <ul>
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
        <v-row>
          <v-col cols="4">
            <img src="" alt="" />
          </v-col>
          <v-col cols="4" class="text-center copyright">
            <p>Lorem Corporation © 2021</p>
          </v-col>
          <v-col cols="4" class="text-right methods-payment">
            <a href="#" class="white--text footer-anchor"> Paypal </a> |
            <a href="#" class="white--text footer-anchor">Binance</a>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
    <!-- whatss app btn -->
    <div class="ws-btn">
      <v-btn fab large color="primary" elevation="0">
        <img :src="asset_ws" class="ws-icon" alt="" />
      </v-btn>
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
export default {
  mixins: [authMixin],
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
    }
  },
}
</script>
<style lang="scss">
.custom-appbar {
  border-radius: 0px 0px 10px 10px !important;
}
main {
  background-color: #f5f7fa;
}
ul {
  list-style: none;
  margin: 0;
  padding-left: 0 !important;
}
.main-content {
  padding-top: 0 !important;
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
.v-sheet.v-app-bar.v-toolbar {
  z-index: 300;
}
.ws-btn {
  position: fixed;
  bottom: 45px;
  right: 45px;
  z-index: 500;
  border-radius: 100%;
  border: 4px solid white !important;
  .ws-icon {
    width: 45px;
    height: auto;
  }
}
</style>
