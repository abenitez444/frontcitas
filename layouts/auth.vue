<template>
  <v-app light>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="primary"
      class="ma-auto custom-appbar custom-appbar--auth"
      width="90%"
      height="114px"
    >
      <!-- <v-toolbar-title  to="/" v-text="title" /> -->
      <router-link to="/" class="pl-5 text-decoration-none">
        <img :src="logoDark" class="brand-image" alt="" />
      </router-link>
      <v-spacer />
      <v-btn
        class="mx-2 d-flex d-md-none"
        @click.stop="drawer = !drawer"
        x-small
        fab
        light
      >
        <v-icon dark> mdi-menu </v-icon>
      </v-btn>
      <v-btn
        to="/auth/sign-up"
        elevation="0"
        rounded
        class="text-capitalize px-7 white--text d-none d-md-flex"
        color="primary lighten-1"
      >
        Registro
      </v-btn>
      <v-btn
        to="/auth/sign-in"
        elevation="0"
        rounded
        class="ml-5 text-capitalize px-7 white--text d-none d-md-flex"
        color="primary lighten-1"
      >
        Ingresar
      </v-btn>
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
    <v-main
      class="main-content d-flex align-center auth-layout"
      :style="`background-image: url('${bgAuth}')`"
    >
      <v-container fluid class="page-sigin">
        <v-row>
          <v-col
            cols="6"
            md=""
            order="2"
            order-md="1"
            class="text-center justify-center align-center d-none d-md-flex"
          >
            <ul class="featured-wrapper">
              <li class="featured-wrapper__phrase">Encuentra tu cita ideal</li>
              <li class="featured-wrapper__phrase">Conoce mujeres solteras</li>
              <li class="featured-wrapper__phrase">Diviértete</li>
            </ul>
          </v-col>
          <nuxt />
          <v-col
            cols="6"
            md=""
            order="2"
            order-md="3"
            class="text-center justify-center align-center d-none d-md-flex"
          >
            <ul class="featured-wrapper">
              <li class="featured-wrapper__phrase">
                Disfruta tu vida al máximo
              </li>
              <li class="featured-wrapper__phrase">
                Diversión y pasión en un club exclusivo
              </li>
              <li class="featured-wrapper__phrase">Pásala bien</li>
            </ul></v-col
          >
        </v-row>
      </v-container>
    </v-main>
    <!-- whatss app btn -->
    <template v-if="$route.name === 'auth-sign-up'">
      <div class="ws-btn">
        <a href=" https://web.whatsapp.com/" target="_blank">
          <v-btn fab color="whatsapp" elevation="0">
            <img :src="asset_ws" class="ws-icon" alt="" />
          </v-btn>
        </a>
      </div>
    </template>
  </v-app>
</template>

<script>
import asset_wave from '@/assets/asset_wave.svg'
import asset_ws from '@/assets/ui-icon-whats_app.svg'
import logoDefault from '@/assets/ui-logo-default.svg'
import logoDark from '@/assets/ui-logo-dark.svg'
import iconGems from '@/assets/ui-icon-gems.svg'
import iconHeart from '@/assets/ui-icon-heart-filled.svg'
import iconHighHeel from '@/assets/ui-icon-high-heel.svg'
import bgHero from '@/assets/bg-hero.jpg'
import bgAuth from '@/assets/bg-auth.png'
export default {
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
      bgHero,
      bgAuth,
      iconGems,
      iconHeart,
      iconHighHeel,
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
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;700;800&family=Raleway:wght@100;300;400;600;700&display=swap');
.main-content {
  padding-top: 0 !important;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  &.auth-layout {
    padding-bottom: unset !important;
  }
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

.auth-layout {
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    left: 0;
    background: linear-gradient(
      359.64deg,
      #ff273e 0.3%,
      rgba(255, 39, 62, 0) 99.69%
    );
    mix-blend-mode: normal;
    opacity: 0.5;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    left: 0;
    // background-image: url('~@/assets/ui-pattern-auth.png');
    background-repeat: repeat;
    opacity: 0.08;
  }
  .page-sigin {
    // background-color: #bada55;
    position: relative;
    // z-index: 100;
    z-index: 6;
  }
  .featured-wrapper {
    &__phrase {
      font-size: 24px;
      line-height: 28px;
      letter-spacing: 0.05em;
      color: #f5f7fa;
      font-weight: bold;
      max-width: 290px;
      text-shadow: 1px 1px 10px rgba($primary, $alpha: 0.7);
      &:nth-child(2) {
        margin: 60px 0;
      }
    }
  }
  .icons-wrapper {
    display: flex;
    justify-content: space-around;
    transform: translateY(3rem);
    &__icon {
      &:nth-child(2) {
        margin: 0 60px;
      }
    }
  }
}
@media (max-width: 991px) {
  .auth-layout {
    .featured-wrapper {
      &__phrase {
        font-size: 16px;
        line-height: 28px;
        letter-spacing: 0.05em;
        color: #f5f7fa;
        font-weight: bold;
        max-width: 290px;
        text-shadow: 1px 1px 10px rgba($primary, $alpha: 0.7);
        &:nth-child(2) {
          margin: 0;
        }
      }
    }
  }
}
</style>
