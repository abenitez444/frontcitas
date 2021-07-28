<template>
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
              <router-link to="/" class="footer-anchor">Membresía</router-link>
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
</template>

<script>
import asset_wave from '@/assets/asset_wave.svg'
import logoDefault from '@/assets/ui-logo-default.svg'
import logoDark from '@/assets/ui-logo-dark.svg'
import logoInsta from '@/assets/ui-logo-insta.svg'
export default {
  data() {
    return {
      asset_wave,
      logoDefault,
      logoDark,
      logoInsta,
    }
  },
}
</script>

<style lang="scss">
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
