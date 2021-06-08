<template>
  <v-app dark>
    <!-- <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="white"
      class="ma-auto rounded-b custom-appbar"
      width="90%"
    >
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <v-toolbar-title class="pl-5" v-text="title" />
      <v-spacer />
      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
      <v-btn
        to="/"
        elevation="0"
        rounded
        class="text-capitalize px-7"
        color="primary"
      >
        Registro
      </v-btn>
      <v-btn
        to="/"
        elevation="0"
        rounded
        class="ml-5 text-capitalize px-7"
        color="primary"
      >
        Ingresar
      </v-btn>
    </v-app-bar>
    <v-main class="main-content">
      <nuxt />
    </v-main>
    <!-- <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-footer
      :absolute="!fixed"
      app
      height="300px"
      color="primary"
      dark
      class="footer-app"
    >
      <img :src="asset_wave" class="wave-footer" alt="" />
      <v-container>
        <!-- content -->
        <v-row>
          <v-col>
            <h2 class="footer-title">Brand</h2>
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
            </ul>
          </v-col>
          <v-col class="text-right">
            <h2 class="footer-title hidden">Extras</h2>
            <ul>
              <!-- <li>Iniciar Sesión</li>
              <li>Nueva Cuenta</li> -->
              <li>
                <router-link to="/" class="footer-anchor"
                  >Preguntas Frecuentes</router-link
                >
              </li>
              <li>
                <router-link to="/" class="footer-anchor"
                  >Politicas de Privacidad</router-link
                >
              </li>
              <li>
                <router-link to="/" class="footer-anchor"
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
export default {
  data() {
    return {
      //
      asset_wave,
      asset_ws,
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
