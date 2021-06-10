<template>
  <v-app light>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="primary"
      class="ma-auto custom-appbar"
      width="90%"
    >
      <!-- <v-toolbar-title  to="/" v-text="title" /> -->
      <router-link to="/" class="pl-5 white--text text-decoration-none">
        {{ title }}
      </router-link>
      <v-spacer />
      <v-btn
        to="/auth/sign-in"
        elevation="0"
        rounded
        class="text-capitalize px-7 white--text"
        color="accent_2"
      >
        Registro
      </v-btn>
      <v-btn
        to="/auth/sign-up"
        elevation="0"
        rounded
        class="ml-5 text-capitalize px-7 white--text"
        color="accent_2"
      >
        Ingresar
      </v-btn>
    </v-app-bar>
    <v-main class="main-content">
      <nuxt />
    </v-main>
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
