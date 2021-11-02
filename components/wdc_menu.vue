<template>
  <v-card class="cm-round-1 cm-elevation-1 main-menu">
    <!-- confirm delete account -->
    <v-dialog v-model="confirmDeleteAccModal" persistent max-width="500">
      <v-card>
        <!-- password verification step -->
        <v-card-text class="pa-5">
          <h3>
            ¿Usted desea eliminar toda su información de su cuenta en Club Sugar
            Daddy?
          </h3>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="confirmDeleteAccModal = false">
            No
          </v-btn>
          <v-btn color="error" @click="sendVerificationCode()"> Si </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Payment Methods -->
    <v-dialog v-model="getPaymentDialog" persistent max-width="768">
      <v-card>
        <v-card-title class="pt-10">
          <span class="text-center ma-auto">
            <h3 class="primary--text">OBTÉN TU MEMBRESÍA VIP</h3>
          </span>
        </v-card-title>
        <!-- password verification step -->
        <v-card-text class="pa-5 pa-sm-8">
          <v-sheet v-if="paymentStep === 1">
            <v-radio-group v-model="radioGroup">
              <v-sheet>
                <v-row>
                  <v-col class="">
                    <v-card class="fill-height">
                      <v-toolbar
                        color="#00b8d9"
                        class="white--text text-center d-flex justify-center"
                        height="100px"
                        flat
                        ><h2 class="font-weight-bold">
                          Membresía VIP <br />
                          1 Mes
                        </h2></v-toolbar
                      >
                      <v-card-text class="pa-5 pa-sm-8 text-center">
                        <h3>$14 USD al mes</h3>
                        <h3 class="hide">Ahorra 20%</h3>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="#00b8d9" dark @click="paymentMethod(1)"
                          >seleccionar</v-btn
                        >
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                  <v-col>
                    <v-card>
                      <v-toolbar
                        color="#6554c0"
                        class="white--text text-center d-flex justify-center"
                        height="100px"
                        flat
                        ><h2 class="font-weight-bold">
                          Membresía VIP <br />
                          6 Meses
                        </h2></v-toolbar
                      >
                      <v-card-text class="pa-5 pa-sm-8 text-center">
                        <h3>$64 USD al mes</h3>
                        <h3 class="accent--text font-weight-bold">
                          Ahorra 20%
                        </h3>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="#6554c0" dark @click="paymentMethod(2)"
                          >seleccionar</v-btn
                        >
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
                <!-- <v-row>
                  <v-col class="d-flex flex-column align-center">
                    <v-btn
                      :color="radioGroup !== 1 ? 'grey' : '#00b8d9'"
                      height="250"
                      @click="radioGroup = 1"
                      dark
                      >Membresía VIP 1 mes
                    </v-btn>
                    <v-radio class="mt-3" label="1 Mes" :value="1"></v-radio>
                  </v-col>
                  <v-col class="d-flex flex-column align-center">
                    <v-btn
                      :color="radioGroup !== 2 ? 'grey' : '#6554c0'"
                      width="150"
                      height="250"
                      @click="radioGroup = 2"
                      dark
                      >6 Meses
                    </v-btn>
                    <v-radio class="mt-3" label="6 Mes" :value="2"></v-radio>
                  </v-col>
                </v-row> -->
              </v-sheet>
            </v-radio-group>

            <!-- <v-row justify="center">
              <v-col cols="auto">

              </v-col>
            </v-row> -->
          </v-sheet>
          <v-sheet v-else-if="paymentStep === 2">
            <v-row>
              <v-col cols="auto"
                ><h3>
                  Usted seleccionó:
                  <v-btn
                    dark
                    :color="planSelected === 1 ? '#00b8d9' : '#6554c0'"
                  >
                    <span v-if="planSelected === 1">Membresía VIP 1 mes</span>
                    <span v-else-if="planSelected === 2"
                      >Membresía VIP 6 mes</span
                    >
                  </v-btn>
                </h3>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="auto">
                <span class="font-weight-bold">Total:</span>
                <span v-if="planSelected === 1">$14 USD</span>
                <span v-else-if="planSelected === 2">$64 USD</span></v-col
              >
            </v-row>
            <!-- <v-row>
              <v-spacer></v-spacer>
              <v-col cols="auto">

              </v-col>
            </v-row> -->
          </v-sheet>
        </v-card-text>
        <v-card-actions class="pb-10">
          <template v-if="paymentStep === 1">
            <v-spacer></v-spacer>
            <v-btn color="error" @click="paymentDialogOff()"> Cancelar </v-btn>
            <v-spacer></v-spacer>
          </template>
          <template v-else-if="paymentStep === 2">
            <v-btn color="error" text @click="paymentStep = 1"> volver </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="cancelPaymentDialogOff()">
              Cancelar
            </v-btn>
            <v-btn
              :color="planSelected === 1 ? '#00b8d9' : '#6554c0'"
              dark
              @click="paymentPlan()"
            >
              COMPRAR PLAN AHORA
            </v-btn>
          </template>
        </v-card-actions>
      </v-card>
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
          <!-- <pre>
            {{ password }}
          </pre> -->
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

          <!-- <pre>
            {{ newCodeDisabled }}
          </pre> -->
        </v-card-text>
        <v-card-actions>
          <v-btn
            v-if="generateCodeStep"
            :disabled="newCodeDisabled"
            @click="submit()"
            color="success"
            >Generar Código</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="deleteAccModal = false">
            Cancelar
          </v-btn>
          <v-btn color="primary" v-if="!generateCodeStep" @click="submit()">
            Enviar
          </v-btn>
          <v-btn color="primary" v-else @click="confirmDeleteAcc()">
            Enviar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- admin -->
    <template v-if="getUserData && getUserData.user.id_rol === 1">
      <v-card-text class="pa-8">
        <v-sheet>
          <v-row>
            <v-col>
              <v-btn
                :ripple="false"
                color="primary"
                text
                class="text-capitalize"
                to="/dashboard"
                >Inicio</v-btn
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn
                :ripple="false"
                color="primary"
                text
                class="text-capitalize"
                to="/admin/logs"
                >Historial</v-btn
              >
            </v-col>
          </v-row>
          <!-- Usuarios -->
          <v-row>
            <v-col>
              <v-btn
                :ripple="false"
                color="primary"
                text
                class="text-capitalize"
                to="/admin/users"
                >Usuarios</v-btn
              >
            </v-col>
          </v-row>

          <!-- Configuracion -->
          <v-row>
            <v-col>
              <v-btn
                :ripple="false"
                color="primary"
                text
                class="text-capitalize"
                to="/admin/settings"
                >Configuración</v-btn
              >
            </v-col>
          </v-row>
          <!-- Soporte Técnico -->
          <!-- Cerrar sesión -->
          <v-row>
            <v-col>
              <v-btn
                :ripple="false"
                color="primary"
                text
                class="text-capitalize"
                @click="logoutAccount()"
                >Cerrar sesión</v-btn
              >
            </v-col>
          </v-row>
        </v-sheet>
      </v-card-text>
      <!-- <pre>
      {{ getUserData.user.id_rol }}
      </pre> -->
    </template>
    <!-- Normal user -->
    <v-card-text class="pa-8" v-else>
      <v-sheet>
        <v-row>
          <v-col>
            <v-btn
              :ripple="false"
              color="primary"
              text
              class="text-capitalize"
              to="/dashboard"
              >Inicio</v-btn
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              :ripple="false"
              color="primary"
              text
              class="text-capitalize"
              @click="paymentDialogOn()"
              >Metodos de pago</v-btn
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-badge bordered color="error" overlap :content="messagesCount">
              <v-btn
                :ripple="false"
                active-class=""
                color="primary"
                text
                class="text-capitalize"
                to="/messages"
                >Mensajes</v-btn
              >
            </v-badge>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
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
          </v-col>
        </v-row>
        <v-row>
          <v-col>
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
            <!-- <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  :ripple="false"
                  color="primary"
                  text
                  class="text-capitalize"
                  >Ver Participantes</v-btn
                >
              </template>
              <v-list>
                <v-list-item to="/participants">
                  <v-list-item-title>Participantes</v-list-item-title>
                </v-list-item>
                <v-list-item to="/participants/block">
                  <v-list-item-title>Miembros bloqueados</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu> -->
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              :ripple="false"
              color="primary"
              text
              class="text-capitalize"
              @click="logoutAccount()"
              >Cerrar sesión</v-btn
            >
          </v-col>
        </v-row>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
import authMixin from '@/mixins/authMixin'
import resources from '@/mixins/resources'
import loadingMixin from '@/mixins/loadingMixin'
import snackMixin from '@/mixins/snackMixin'
import { validationMixin } from 'vuelidate'
import { mapGetters, mapActions } from 'vuex'
import {
  required,
  sameAs,
  minLength,
  email,
  alpha,
} from 'vuelidate/lib/validators'
export default {
  mixins: [authMixin, resources, loadingMixin, snackMixin, validationMixin],
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
      newUser: {
        password: '',
        password_confirmation: '',
      },
      newCodeDisabled: true,
      paymentModal: false,
      radioGroup: 1,
      paymentStep: 1,
      planSelected: null,
      messagesCount: 0,
    }
  },
  methods: {
    cancelPaymentDialogOff() {
      this.paymentStep = 1
      this.paymentDialogOff()
    },
    async submit() {
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
    confirmDeleteAcc() {
      this.confirmDeleteAccModal = true
    },
    async sendVerificationCode() {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      const options = {
        method: 'DELETE',
        url: `${this.$axios.defaults.baseURL}auth/delete-profile`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: { code: this.verificationCode },
      }

      await this.$axios
        .request(options)
        .then((res) => {
          this.loadingOff()
          this.logout()
          this.$router.push('/')
          this.snackbarOn(
            'Se procederá a eliminar su cuenta del CLUB SUGAR DADDY, no podrá ingresar nuevamente. En cualquier otro momento puede volver a registrarse en CLUB SUGAR DADDY'
          )
          // // console.debug(res)
        })
        .catch((e) => {
          this.loadingOff()
          // console.debug(e.response.data.error)
          this.snackbarOn(e.response.data.error)
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
    paymentMethod(planId) {
      this.paymentStep = 2
      this.planSelected = planId
    },
    async countUnreadMessages() {
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      // 'http://127.0.0.1:8000/api/auth/count-unread/'+IdUsuarioAMandarMensaje, config
      const options = {
        method: 'GET',
        url: `${this.$axios.defaults.baseURL}auth/count-unread/${this.$route.params.id}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }

      await this.$axios
        .request(options)
        .then((res) => {
          console.debug(res)
          // this.loadingOff()
          // console.debug(res.data[1].men, res.data[0].women)
          // console.debug('hey', this.chartDataGeneral.datasets[0].data)
        })
        .catch((e) => {
          // console.debug(e.response.data.error)
          // this.loadingOff()
          // this.snackbarOn(
          //   'Ha ocurrido un error, pongase en contacto con el soporte.'
          // )
        })
    },
    async paymentPlan() {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      // 'http://127.0.0.1:8000/api/auth/count-unread/'+IdUsuarioAMandarMensaje, config
      const options = {
        method: 'POST',
        url: `${this.$axios.defaults.baseURL}auth/start-buy`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: { price_id: this.planSelected },
      }

      await this.$axios
        .request(options)
        .then((res) => {
          console.debug(res.data)
          this.loadingOff()
          this.paymentDialogOff()
          window.open(res.data, '_blank').focus()
          // window.open('www.youtube.com', '_blank')
          // console.debug(res.data[1].men, res.data[0].women)
          // console.debug('hey', this.chartDataGeneral.datasets[0].data)
        })
        .catch((e) => {
          this.loadingOff()
          // console.debug(e.response.data.error)
          // this.snackbarOn(
          //   'Ha ocurrido un error, pongase en contacto con el soporte.'
          // )
        })
    },
    ...mapActions({
      paymentDialogOn: 'dialogs/paymentDialogOn',
      paymentDialogOff: 'dialogs/paymentDialogOff',
    }),
  },
  mounted() {
    const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))
    this.$echo
      .channel('unread-messages.' + prof)
      .listen('CountUnreadMessage', (e) => {
        console.debug('CountUnreadMessage', e.unread_messages)
        this.messagesCount = e.unread_messages
      })
    this.countUnreadMessages()
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
    ...mapGetters({
      getPaymentDialog: 'dialogs/getPaymentDialog',
    }),
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
  watch: {
    generateCodeStep(val) {
      if (val) {
        setInterval(
          function (scope) {
            scope.newCodeDisabled = false
            scope.snackbarOn(
              'El código de seguridad caducó, por favor genere un nuevo código.'
            )
          },
          300000,
          this
        )
      }
    },
  },
}
</script>

<style lang="scss">
.main-menu {
  z-index: 4;
  position: relative;
}
.menu-wrapper {
  .v-btn {
    font-weight: bold;
    font-size: 18px;
    line-height: 30px;
    color: #9d8080 !important;
    opacity: 0.5;
    &--active {
      opacity: 1;
      color: #f42f43 !important;
      &::before {
        opacity: 0;
      }
    }
  }
  .v-list-item {
    &__title {
      font-weight: bold;
      font-size: 18px;
      line-height: 30px;
      color: #9d8080 !important;
      opacity: 0.5;
    }
  }
  .v-list-group__items {
    .v-list-item {
      padding-left: 2rem !important;
    }
  }
}
.hide {
  opacity: 0;
}
</style>
