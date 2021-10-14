<template>
  <v-app dark>
    <v-dialog
      transition="dialog-bottom-transition"
      max-width="600"
      v-model="dialogInTrial"
    >
      <template v-slot:default="dialogInTrial">
        <v-card>
          <v-toolbar color="primary" dark>Modo Trial Activado</v-toolbar>
          <v-card-text v-if="getUserData">
            <!--  -->
            <template v-if="getUser.remains_days.remains > 0">
              <p class="trial-description mt-8 font-weight-bold">
                {{ getUserData.gender === 1 ? 'Estimado' : 'Estimada' }}
                {{ getUserData.first_name }} {{ getUserData.last_name }} ({{
                  getUserData.user.username
                }}),
              </p>
              <p class="trial-description mt-4 font-weight-bold">
                Usted se encuentra disfrutando de CLUB SUGAR DADDY en Modo TRIAL
                y cuenta con “{{ getUser.remains_days.remains }}” “días” para
                disfrutar de todos los beneficios.
              </p>
              <p class="trial-description mt-4 font-weight-bold">
                Le invitamos a unirse al CLUB SUGAR DADDY comprando su membresía
                y así poder disfrutar sin límites de todos los beneficios, en su
                perfil en la sección MÉTODO DE PAGO puede escoger el plan que
                más le conviene.
              </p>
            </template>
            <template v-else>
              <p class="trial-description mt-8 font-weight-bold">
                {{ getUserData.gender === 1 ? 'Estimado' : 'Estimada' }}
                {{ getUserData.first_name }} {{ getUserData.last_name }} ({{
                  getUserData.user.username
                }}),
              </p>
              <p class="trial-description mt-4 font-weight-bold">
                EL MODO TRIAL a caducado, le invitamos a unirse al CLUB SUGAR
                DADDY comprando su membresía y así poder disfrutar sin límites
                de todos los beneficios, en su perfil en la sección MÉTODO DE
                PAGO puede escoger el plan que más le conviene.
              </p>
            </template>
          </v-card-text>
          <v-card-text v-else>
            <v-sheet>
              <v-row justify="center">
                <v-col cols="auto" class="mt-8">
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </v-col>
              </v-row>
            </v-sheet>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="closeDialog()">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
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
    <v-app-bar
      :clipped-left="true"
      fixed
      app
      color="white"
      class="ma-auto custom-appbar"
      width="90%"
    >
      <router-link to="/" class="text-decoration-none">
        <img :src="logoDefault" class="brand-image" alt="" />
      </router-link>
      <v-spacer />
      <!-- login / register -->
      <!-- <p>
        {{ $route.name }}
      </p> -->
      <!-- :class="$route.name === 'index' ? '' : 'd-none d-md-flex'" -->
      <v-btn
        class="mx-2"
        :class="getUserData === null ? 'd-none' : 'd-flex d-md-none'"
        @click.stop="drawer = !drawer"
        x-small
        fab
        dark
        color="primary"
      >
        <v-icon dark> mdi-menu </v-icon>
      </v-btn>
      <!-- logged -->
      <template v-if="getUserData === null">
        <v-spacer></v-spacer>
        <div class="d-flex flex-wrap justify-end">
          <v-btn
            to="/auth/sign-up"
            elevation="0"
            rounded
            class="mx-0 mx-sm-2 my-1 my-sm-0 text-capitalize px-7"
            :class="$route.name === 'index' ? '' : 'd-none d-md-flex'"
            color="accent"
          >
            Registro
          </v-btn>
          <v-btn
            to="/auth/sign-in"
            elevation="0"
            rounded
            class="mx-0 mx-sm-2 my-1 my-sm-0 text-capitalize px-7"
            :class="$route.name === 'index' ? '' : 'd-none d-md-flex'"
            color="primary"
          >
            Ingresar
          </v-btn>
        </div>
      </template>

      <!-- profile template -->
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
      <template v-if="getUserData === null">
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
      </template>
      <template v-else>
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

            <!-- <v-list-item to="/participants">
            <v-list-item-title>Participantes</v-list-item-title>
          </v-list-item> -->
            <v-list-group :value="false" no-action>
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>Participantes</v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item link to="/participants">
                <v-list-item-title>Participantes</v-list-item-title>
              </v-list-item>
              <v-list-item link to="/participants/blocks">
                <v-list-item-title>Miembros Bloqueados</v-list-item-title>
              </v-list-item>
            </v-list-group>
            <v-list-item>
              <v-list-item-title @click="logoutAccount()"
                >Cerrar sesión</v-list-item-title
              >
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </template>
    </v-navigation-drawer>

    <wdc-snackbar />
    <wdc-loading />
    <!-- <v-btn dark color="indigo" @click="notiSnack = true"> Open Snackbar </v-btn> -->

    <wdc-notifications />

    <!-- page content -->
    <v-main class="main-content" :class="`${$route.name}-main`">
      <nuxt />
    </v-main>

    <wdc-footer />
    <!-- whatss app btn -->
    <template v-if="$route.name === 'index'">
      <div class="ws-btn">
        <a href=" https://web.whatsapp.com/" target="_blank">
          <v-btn fab color="whatsapp" elevation="0">
            <img :src="asset_ws" class="ws-icon" alt="" />
          </v-btn>
        </a>
        <div class="text-center join-btn">
          <router-link to="/auth/sign-up">
            <img :src="putiBtn" alt="" />
          </router-link>
        </div>
      </div>
    </template>
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
import Wdc_footer from '~/components/wdc_footer.vue'
import Wdc_notifications from '~/components/wdc_notifications.vue'
import putiBtn from '@/assets/puticlub-btn.png'
export default {
  components: {
    wdc_snackbar,
    Wdc_footer,
    Wdc_notifications,
  },
  mixins: [authMixin, resourcesMixin, loadingMixin],
  // head() {
  //   return {
  //     title: 'Club Sugar',
  //   }
  // },
  data() {
    return {
      notiSnack: true,
      //
      putiBtn,
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
      dialogSupport: false,
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
.dialog-support {
  .img-fluid {
    height: 100%;
    width: auto;
  }
}
</style>
