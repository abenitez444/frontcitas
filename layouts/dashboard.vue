<template>
  <v-app dark>
    <v-dialog
      transition="dialog-bottom-transition"
      max-width="600"
      v-model="dialogSupport"
    >
      <template v-slot:default="dialogSupport">
        <v-card>
          <v-toolbar color="primary" dark>Soporte Técnico</v-toolbar>
          <v-card-text class="dialog-support">
            <v-sheet>
              <v-row>
                <v-col cols="12">
                  <h3 class="mt-8 mx-5 text-center">
                    Si tiene algún inconveniente te ofrecemos los siguientes
                    canales de comunicación:
                  </h3>
                </v-col>
                <v-col cols="12" class="text-center">
                  <h4 class="text-center">
                    Ponemos a su disposición directa nuestro Whatsapp
                  </h4>
                  <v-btn
                    href="https://wa.me/15551234567"
                    target="_blank"
                    color="#25D366"
                    elevation="0"
                    class="mt-5"
                  >
                    <img
                      :src="asset_ws"
                      style="width: auto; height: 20px"
                      alt=""
                    />
                  </v-btn>
                </v-col>
                <v-col cols="12" class="text-center">
                  <h4 class="text-center">
                    También puede escribirnos a través del siguiente correo
                    electrónico
                  </h4>
                  <v-btn
                    href="mailto:soporte@clubsugardaddy.cl"
                    target="_blank"
                    color="blue"
                    elevation="0"
                    class="mt-5"
                    text
                  >
                    <v-icon left dark> mdi-email </v-icon>
                    <span> soporte@clubsugardaddy.cl </span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-sheet>
          </v-card-text>
          <!-- <v-card-actions class="justify-end">
            <v-btn text @click="dialogSupport = false">Cerrar</v-btn>
          </v-card-actions> -->
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
            <v-list-item @click="dialogSupport = true">
              <v-list-item-title>Soporte Técnico</v-list-item-title>
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
      <!-- Normal Users mobile menu -->
      <v-list nav v-if="getUserData && getUserData.user.id_rol !== 1">
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
      <!-- Admin Users mobile menu -->
      <v-list nav v-else>
        <v-list-item-group active-class="primary--text text--accent-4">
          <v-list-item to="/dashboard">
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item>

          <v-list-item to="/admin/logs">
            <v-list-item-title>Historial</v-list-item-title>
          </v-list-item>

          <v-list-item to="/admin/users">
            <v-list-item-title>Usuarios</v-list-item-title>
          </v-list-item>

          <v-list-item to="/admin/settings">
            <v-list-item-title>Configuración</v-list-item-title>
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
          <!-- && $route.name !== 'admin-settings' -->
          <v-col
            cols="3"
            v-if="
              !$vuetify.breakpoint.mdAndDown &&
              $route.name !== 'admin-settings' &&
              $route.name !== 'participant-id'
            "
          >
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
              <template
                v-if="
                  !$vuetify.breakpoint.mdAndDown &&
                  $route.name !== 'participant-id'
                "
              >
                <v-row no-gutters class="mb-8" v-if="getUserData !== null">
                  <v-col>
                    <wdc-profile-card />
                  </v-col>
                </v-row>
              </template>

              <!-- Menu -->
              <v-row
                no-gutters
                class="menu-wrapper"
                v-if="!$vuetify.breakpoint.mdAndDown"
              >
                <v-col> <wdc-menu /> </v-col>
              </v-row>

              <!-- About me -->
              <template
                v-if="
                  $route.name === 'participant-id' && getProfileData !== false
                "
              >
                <v-row no-gutters class="mt-8" v-if="getUserData !== null">
                  <v-col>
                    <v-card class="cm-round-1 cm-elevation-1 about-me">
                      <v-card-text class="pa-8">
                        <h2 class="primary--text mb-3 about-me__title">
                          Sobre mi
                        </h2>
                        <span
                          class="about-me__description"
                          v-if="getProfileData.gender === 0"
                        >
                          Hola, mi nombre es {{ getProfileData.first_name }}
                          <span v-if="getProfileData.region"
                            >soy de {{ getProfileData.region.name }}</span
                          >
                          y naci en
                          {{ getProfileData.birth_day.split('-')[0] }}. Trabajo
                          como {{ getProfileData.profession }}, actualmente
                          estoy {{ getProfileData.civil_status }} y gano
                          {{ getProfileData.monthly_salary.name }} al mes.
                        </span>
                        <span class="about-me__description" v-else>
                          Hola, mi nombre es {{ getProfileData.first_name }}
                          <span v-if="getProfileData.region"
                            >soy de {{ getProfileData.region.name }}</span
                          >
                          y naci en
                          {{ getProfileData.birth_day.split('-')[0] }}. Trabajo
                          como {{ getProfileData.profession }}
                          <span v-if="getProfileData.economic_level">
                            , actualmente mi nivel economico es
                            {{ getProfileData.economic_level.name }}
                          </span>
                          <!-- estoy {{ getProfileData.civil_status }} y gano
                          {{ getProfileData.monthly_salary.name }} al mes. -->
                        </span>

                        <h3
                          class="primary--text mt-4 mb-1"
                          v-if="getProfileData.gender === 0"
                        >
                          ¿Qué buscas en un Sugar Daddy?
                        </h3>
                        <h3 class="primary--text mt-4 mb-1" v-else>
                          ¿Qué buscas en una Sugar Baby?
                        </h3>
                        <span class="about-me__description">
                          {{ getProfileData.what_i_want }}
                        </span>
                        <h3 class="primary--text mt-4 mb-1">
                          ¿Cuál es tu cita ideal?
                        </h3>
                        <span class="about-me__description">
                          {{ getProfileData.ideal_date }}
                        </span>
                        <h3 class="primary--text mt-4 mb-1">
                          Intereses o hobbies
                        </h3>
                        <span class="about-me__description">
                          {{ getProfileData.hobbies }}
                        </span>
                        <h3
                          v-if="getProfileData.physical_figure"
                          class="primary--text mt-4 mb-1"
                        >
                          Estado Físico
                        </h3>

                        <span
                          v-if="getProfileData.physical_figure"
                          class="about-me__description"
                        >
                          {{ getProfileData.physical_figure.name }}
                        </span>
                        <template v-if="getProfileData.gender === 0">
                          <h3 class="primary--text mt-4 mb-1">Hijos</h3>
                          <span class="about-me__description">
                            {{ getProfileData.children.name }}
                          </span>
                          <h3 class="primary--text mt-4 mb-1">
                            Preferencia de contacto
                          </h3>
                          <span class="about-me__description">
                            {{ getProfileData.contact_preference.name }}
                          </span>
                        </template>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row no-gutters class="mt-8" v-if="getUserData !== null">
                  <v-col>
                    <v-card class="cm-round-1 cm-elevation-1 gallery">
                      <v-card-text class="pa-8">
                        <h2 class="primary--text mb-5 gallery__title">
                          Mis Fotos
                        </h2>
                        <div
                          class="gallery__photos"
                          :class="`images-${getProfileData.images.length}`"
                        >
                          <template v-for="(image, i) in getProfileData.images">
                            <v-dialog width="500" :key="`image-${i}`">
                              <template v-slot:activator="{ on, attrs }">
                                <img
                                  v-bind="attrs"
                                  v-on="on"
                                  :src="`${img_baseUrl}${image.path}`"
                                  class="message-img-thumb img-fluid"
                                  alt=""
                                />
                              </template>

                              <v-card class="pa-8">
                                <v-card-text class="pa-0">
                                  <img
                                    :src="`${img_baseUrl}${image.path}`"
                                    class="img-fluid rounded-lg"
                                    alt=""
                                  />
                                </v-card-text>
                              </v-card>
                            </v-dialog>
                          </template>
                        </div>
                      </v-card-text>
                    </v-card>
                    <!-- <wdc-profile-card /> -->
                  </v-col>
                </v-row>
              </template>

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
  </v-app>
</template>

<script>
import asset_wave from '@/assets/asset_wave.svg'
import asset_ws from '@/assets/ui-icon-whats_app.svg'
import logoDefault from '@/assets/ui-logo-default.svg'
import logoDark from '@/assets/ui-logo-dark.svg'
import logoInsta from '@/assets/ui-logo-insta.svg'
import successIcon from '@/assets/ui-success-icon.png'
import authMixin from '@/mixins/authMixin'
import resourcesMixin from '@/mixins/resources'
import loadingMixin from '@/mixins/loadingMixin'
import notificationMixin from '@/mixins/notificationMixin'
import wdc_snackbar from '~/components/wdc_snackbar.vue'
import Wdc_participants from '~/components/wdc_participants.vue'
import Wdc_footer from '~/components/wdc_footer.vue'
import { mapActions, mapGetters } from 'vuex'
import accountIcon from '@/assets/ui-icon-account.svg'
export default {
  components: { wdc_snackbar, Wdc_participants, Wdc_footer },
  mixins: [authMixin, resourcesMixin, loadingMixin, notificationMixin],
  data() {
    return {
      drawer: false,
      //
      accountIcon,
      asset_wave,
      asset_ws,
      logoDefault,
      logoDark,
      logoInsta,
      successIcon,
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
      dialogSupport: false,
    }
  },
  mounted() {
    this.checkAuth()
    this.checkInTrial()
    if (localStorage.getItem('wdc_token') !== null) {
      this.getProfile()
      this.checkNotifications()
    }
  },
  methods: {
    checkInTrial() {
      this.dialogInTrial = this.inTrial
    },
    checkNotifications() {
      const { prof } = JSON.parse(localStorage.getItem('wdc_token'))
      // // console.debug(`new-message-received.${prof}`)
      this.$echo
        .channel(`new-message-received.${prof}`)
        .listen('NewMessageNotification', (e) => {
          this.setNotification(e)
          // console.debug(e)
        })
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
        .$get(`${this.$axios.defaults.baseURL}auth/profile/${prof}`, config)
        .then((res) => {
          this.loadingOff()
          this.user = res.profile
          this.settingUserData(res.profile)
        })
        .catch((e) => {
          this.loadingOff()
          // console.debug(e)
        })
    },
  },
  computed: {
    ...mapGetters({
      getProfileData: 'profile/getProfileData',
    }),
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
  .about-me {
    &__title {
      font-family: Raleway;
      font-style: normal;
      font-weight: 800;
      font-size: 20px;
      line-height: 30px;
      letter-spacing: -0.025em;
    }
    &__description {
      // text-transform: capitalize;
      &:first-letter {
        // text-transform: uppercase;
      }
      font-family: Raleway;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 15px;
      letter-spacing: 0.015em;
      color: #321215;
      opacity: 0.5;
    }
  }
  .gallery {
    @media (min-width: 1264px) {
      margin-bottom: 150px;
    }
    @media (max-width: 1263px) {
      margin-bottom: 40px;
    }
    &__title {
      font-family: Raleway;
      font-style: normal;
      font-weight: 800;
      font-size: 20px;
      line-height: 30px;
      letter-spacing: -0.025em;
    }
    &__photos {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto;
      gap: 15px;
      img {
        border-radius: 10px;
      }
      .photo {
        overflow: hidden;
      }
      // .photo:nth-child(1) {
      //   grid-row: 1 / 2;
      //   grid-column: 1 / -1;
      // }
      // .photo:nth-child(2) {
      // }
      // .photo:nth-child(3) {
      // }
      // .photo:nth-child(4) {
      //   grid-row: 2 / 4;
      //   grid-column: 2 / 3;
      // }
      // &.images-0 {
      //   grid-template-columns: 0;
      //   grid-template-rows: 0;
      // }
      // &.images-1 {
      //   grid-template-rows: 130px;
      // }
      // &.images-2 {
      //   grid-template-rows: 130px 130px;
      //   grid-template-columns: 1fr;
      // }
      // &.images-3 {
      //   grid-template-rows: 130px 110px;
      // }
      // &.images-4 {
      // }
    }
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
