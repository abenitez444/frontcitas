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
      class="ma-auto rounded-b"
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
            <h2>Brand</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel
              deserunt quisquam unde pariatur quaerat vitae rerum nihil
              distinctio voluptate! Quam magni illum laborum voluptate quisquam
              ullam sunt hic consequatur maxime.
            </p>
          </v-col>
          <v-col class="text-center" cols="6">
            <h2>Secciones</h2>
            <ul>
              <li>Inicio</li>
              <li>Videos</li>
              <li>Miembros del club</li>
              <li>Testimonios</li>
              <li>Membresía</li>
            </ul>
          </v-col>
          <v-col class="text-right">
            <h2>Extras</h2>
            <ul>
              <li>Iniciar Sesión</li>
              <li>Nueva Cuenta</li>
              <li>Preguntas Frecuentes</li>
              <li>Politicas de Privacidad</li>
              <li>Términos y condiciones</li>
            </ul>
          </v-col>
        </v-row>
        <!-- copyright -->
        <v-row>
          <v-col cols="4">
            <img src="" alt="" />
          </v-col>
          <v-col cols="4" class="text-center">
            <p>Lorem Corporation © 2021</p>
          </v-col>
          <v-col cols="4" class="text-right">
            <a href="#" class="white--text"> Paypal </a> |
            <a href="#" class="white--text">Binance</a>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import asset_wave from '@/assets/asset_wave.svg'
export default {
  data() {
    return {
      //
      asset_wave,
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
html {
  // overflow: hidden;
}
// .v-toolbar {
//   position: absolute !important;
//   background: teal !important;
// }
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
}
</style>
