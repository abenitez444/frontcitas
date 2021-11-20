<template>
  <v-app dark>
    <!-- Dialog Trial mode -->
    <v-dialog
      transition="dialog-bottom-transition"
      max-width="600"
      v-model="dialogInTrial"
      v-if="$route.name === 'profile'"
    >
      <template v-slot:default="dialogInTrial">
        <v-card>
          <v-toolbar color="success" dark
            ><span class="mr-3">Modo Trial Activado </span>
            <img
              :src="successIcon"
              style="width: 30px"
              class="img-fluid"
              alt=""
            />
          </v-toolbar>
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

    <!-- Update password -->
    <v-dialog v-model="updatePasswordModal" persistent max-width="500">
      <v-card>
        <v-toolbar color="primary" dark>Cambiar Contraseña</v-toolbar>
        <!-- password verification step -->
        <v-card-text class="pa-5">
          <v-text-field
            v-if="!confirmPasswordStep"
            autocomplete="off"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="!showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            label="Contraseña actual"
            class="rounded-b"
            outlined
            v-model="password"
          ></v-text-field>
          <template v-else>
            <v-alert border="top" color="accent" dark>
              Por favor, Introduzca la nueva contraseña
            </v-alert>
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  autocomplete="off"
                  v-bind="attrs"
                  v-on="on"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="!showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  label="Nueva Contraseña"
                  class="rounded-b"
                  outlined
                  v-model="newUser.password"
                  :error-messages="passwordErrors"
                  @input="$v.newUser.password.$touch()"
                  @blur="$v.newUser.password.$touch()"
                ></v-text-field>
              </template>
              <ul>
                <li>Debe contener mínimo 8 caracteres</li>
                <li>Al menos 1 Letra minúscula del alfabeto (a-z)</li>
                <li>Al menos 1 Letra Mayuscula del alfabeto (A-Z)</li>
                <li>Al menos 1 Cifra entera (0-9)</li>
                <li>Al menos 1 caracter especial, tales como @#$%&*-+=/</li>
                <li>
                  No se permite la letra “ñ” ni letras con tilde ni espacios
                </li>
              </ul>
            </v-tooltip>
            <v-text-field
              autocomplete="off"
              :append-icon="confirmPasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
              :type="!confirmPasswordShow ? 'text' : 'password'"
              @click:append="confirmPasswordShow = !confirmPasswordShow"
              label="Confirmar Contraseña"
              class="rounded-b"
              outlined
              v-model="newUser.password_confirmation"
              :error-messages="passwordConfirmErrors"
              @input="$v.newUser.password_confirmation.$touch()"
              @blur="$v.newUser.password_confirmation.$touch()"
            ></v-text-field>
          </template>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="cancelUpdatePassword()">
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            v-if="!confirmPasswordStep"
            @click="checkPassword()"
          >
            Enviar
          </v-btn>
          <v-btn
            color="primary"
            :disabled="
              !$v.newUser.password.required ||
              !$v.newUser.password.minLength ||
              !$v.newUser.password.containsLowercase ||
              !$v.newUser.password.containsUppercase ||
              !$v.newUser.password.containsNumber ||
              !$v.newUser.password.containsSpecial ||
              !$v.newUser.password_confirmation.sameAsPassword
            "
            v-else
            @click="updatePassword()"
          >
            Enviar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- delete account -->
    <v-dialog v-model="deleteAccModal" persistent max-width="500">
      <v-card>
        <!-- password verification step -->
        <v-card-text class="pa-5" v-if="!generateCodeStep">
          <v-text-field
            label="Contraseña"
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="!showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            outlined
            hide-details=""
          ></v-text-field>
        </v-card-text>
        <!-- code veritifaction steo -->
        <v-card-text class="pa-5" v-else>
          <v-sheet>
            <v-row>
              <v-col cols="">
                <v-text-field
                  outlined
                  label="Código de Seguridad"
                  v-model="verificationCode"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-sheet>
        </v-card-text>
        <v-card-actions>
          <v-btn
            v-if="generateCodeStep"
            :disabled="newCodeDisabled"
            @click="deleteAccount()"
            color="success"
            >Generar Código</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="deleteAccModal = false">
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            v-if="!generateCodeStep"
            @click="deleteAccount()"
          >
            Enviar
          </v-btn>
          <v-btn color="primary" v-else @click="confirmDeleteAcc()">
            Enviar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Support dialog -->
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

    <!-- Main menu -->
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

    <!-- Mobile drawer -->
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
        <!-- normal users -->
        <v-list nav v-if="getUserData.user.id_rol !== 1">
          <v-list-item-group active-class="primary--text text--accent-4">
            <v-list-item to="/dashboard">
              <v-list-item-title>Inicio</v-list-item-title>
            </v-list-item>

            <v-list-item to="/messages">
              <v-list-item-title>Mensajes</v-list-item-title>
            </v-list-item>

            <template v-if="$route.name === 'profile'">
              <v-list-group :value="false" no-action>
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>Perfil</v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item link to="/profile">
                  <v-list-item-title>Perfil</v-list-item-title>
                </v-list-item>
                <v-list-item link @click="updatePasswordModal = true">
                  <v-list-item-title>Cambio de contraseña</v-list-item-title>
                </v-list-item>
                <v-list-item link @click="deleteAccModal = true">
                  <v-list-item-title>Eliminar cuenta</v-list-item-title>
                </v-list-item>
              </v-list-group>
            </template>
            <template v-else>
              <v-btn
                :ripple="false"
                color="primary"
                text
                class="text-capitalize"
                to="/profile"
                >Perfil</v-btn
              >
            </template>

            <!-- <v-list-item to="/participants">
            <v-list-item-title>Participantes</v-list-item-title>
          </v-list-item> -->
            <v-list-group :value="false" no-action class="hidden-participants">
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
        <!-- admins -->
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
import successIcon from '@/assets/ui-success-icon.png'
import snackMixin from '@/mixins/snackMixin'
import { validationMixin } from 'vuelidate'
import {
  required,
  sameAs,
  minLength,
  email,
  alpha,
} from 'vuelidate/lib/validators'
export default {
  components: {
    wdc_snackbar,
    Wdc_footer,
    Wdc_notifications,
  },
  mixins: [
    authMixin,
    resourcesMixin,
    loadingMixin,
    validationMixin,
    snackMixin,
  ],
  // head() {
  //   return {
  //     title: 'Club Sugar',
  //   }
  // },
  data() {
    return {
      deleteAccModal: false,
      updatePasswordModal: false,
      confirmDeleteAccModal: false,
      showPassword: true,
      confirmPasswordShow: true,
      password: null,
      verificationCode: null,
      generateCodeStep: false,
      confirmPasswordStep: false,
      newCodeDisabled: true,
      newUser: {
        password: '',
        password_confirmation: '',
      },
      //
      notiSnack: true,
      //
      putiBtn,
      successIcon,
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
    async checkPassword() {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      const options = {
        method: 'POST',
        url: `${this.$axios.defaults.baseURL}auth/current-password`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          password: this.password,
        },
      }

      await this.$axios
        .request(options)
        .then((res) => {
          // console.debug(res)
          this.loadingOff()
          this.confirmPasswordStep = true
        })
        .catch((e) => {
          // // console.debug(e.response.data.message)
          this.loadingOff()
          this.snackbarOn(
            'La contraseña actual no es correcta, por favor intente de nuevo.'
          )
        })
    },
    async updatePassword() {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      const options = {
        method: 'PUT',
        url: `${this.$axios.defaults.baseURL}auth/change-password`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: this.newUser,
      }

      await this.$axios
        .request(options)
        .then((res) => {
          // console.debug(res)
          this.loadingOff()
          this.cancelUpdatePassword()
          this.snackbarOn('Su contraseña ha sido cambiada exitosamente.')
        })
        .catch((e) => {
          // // console.debug(e.response.data.message)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un problema por favor pongase en contacto con el soporte.'
          )
        })
    },
    cancelUpdatePassword() {
      this.updatePasswordModal = false
      this.confirmPasswordStep = false
      this.password = null
    },
    async deleteAccount() {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))
      const profileId = this.$route.params.id

      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      let data = {
        password: this.password,
      }
      await this.$axios
        .$put(
          `${this.$axios.defaults.baseURL}auth/generate-delete-acount-code`,
          data,
          config
        )
        .then((res) => {
          this.loadingOff()
          // console.debug(res)
          this.snackbarOn(
            'La Contraseña es correcta. Le enviamos un código de seguridad a su correo eléctrónico registrado en nuestro sitio web. Por favor introduzcalo a continuación'
          )
          this.generateCodeStep = true
        })
        .catch((e) => {
          this.loadingOff()
          // console.debug(e.response.data.error)
          this.snackbarOn(e.response.data.error)
        })
    },
  },
  validations: {
    newUser: {
      password: {
        required,
        minLength: minLength(8),
        containsLowercase: function (value) {
          return /[a-z]/.test(value)
        },
        containsUppercase: function (value) {
          return /[A-Z]/.test(value)
        },
        containsNumber: function (value) {
          return /[0-9]/.test(value)
        },
        containsSpecial: function (value) {
          return /[#?!@$%^&*-]/.test(value)
        },
        containsAccent: function (value) {
          return /[À-ÿ\u00f1\u00d1\s]/.test(value)
        },
      },
      password_confirmation: {
        sameAsPassword: sameAs(function () {
          return this.newUser.password
        }),
      },
    },
  },
  computed: {
    passwordErrors() {
      const errors = []
      if (!this.$v.newUser.password.$dirty) return errors
      !this.$v.newUser.password.minLength &&
        errors.push('La contraseña debe contener mínimo 8 caracteres')
      !this.$v.newUser.password.required &&
        errors.push('La contraseña es requerida')
      !this.$v.newUser.password.containsLowercase &&
        errors.push(
          'Debe contener al menos 1 Letra minúscula del alfabeto (a-z)'
        )
      !this.$v.newUser.password.containsUppercase &&
        errors.push(
          'Debe contener al menos 1 Letra mayúscula del alfabeto (A-Z)'
        )
      !this.$v.newUser.password.containsNumber &&
        errors.push('Debe contener al menos 1 Cifra entera (0-9)')
      !this.$v.newUser.password.containsSpecial &&
        errors.push(
          'Debe contener al menos 1 caracter especial, tales como @#$%&*-+=/'
        )
      this.$v.newUser.password.containsAccent &&
        errors.push(
          'No se permite la letra “ñ” ni letras con tilde ni espacios'
        )
      return errors
    },
    passwordConfirmErrors() {
      const errors = []
      if (!this.$v.newUser.password_confirmation.$dirty) return errors
      !this.$v.newUser.password_confirmation.sameAsPassword &&
        errors.push(
          'La contraseña introducida es distinta a la anterior, por favor intente de nuevo'
        )
      return errors
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
@media all and(min-width: 360px){
  .hidden-participants{
    display: none !important;
  }
}
@media all and(min-width: 1280px){
  .hidden-participants{
    display: inline !important;
  }
}
</style>
