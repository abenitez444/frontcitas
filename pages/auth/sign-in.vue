<template>
  <v-col
    cols="12"
    order="1"
    order-md="2"
    md="auto"
    class="d-flex justify-center"
  >
    <v-card width="500px" class="card-sign-in">
      <v-sheet max-width="500px" class="login-wrapper">
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Correo Electrónico"
              outlined
              hide-details=""
              v-model="user.email"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Contraseña"
              v-model="user.password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="!showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              outlined
              hide-details=""
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="recaptcha-wrapper">
            <vue-recaptcha
              @verify="checkCaptcha($event)"
              @expired="disabledSubmit = true"
              @error="disabledSubmit = true"
              sitekey="6Leob_AbAAAAAK7glQt9Dhtd1NhIKVCC_KkkoF2x"
              :loadRecaptchaScript="true"
            ></vue-recaptcha>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="auto">
            <v-btn
              rounded
              class="font-weight-bold btn-action"
              width="220px"
              color="primary"
              large
              @click="submit()"
              :disabled="disabledSubmit"
              >Unirse</v-btn
            >
            <p class="text-center mt-2">
              ¿Eres nuevo?, registrate
              <router-link class="text-decoration-none" to="/auth/sign-up">
                aquí
              </router-link>
            </p>
            <p class="text-center">
              <router-link
                class="text-decoration-none"
                to="/auth/password-recovery"
              >
                Olvidé mi contraseña
              </router-link>
            </p>
          </v-col>
          <v-dialog v-model="loadingForm" hide-overlay persistent width="300">
            <v-card color="primary" dark>
              <v-card-text>
                Espere un momento, por favor.
                <v-progress-linear
                  indeterminate
                  color="white"
                  class="mb-0"
                ></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-row>
      </v-sheet>
    </v-card>
  </v-col>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import authMixin from '@/mixins/authMixin'
import snackMixin from '@/mixins/snackMixin'
import loadingMixin from '@/mixins/loadingMixin'
import VueRecaptcha from 'vue-recaptcha'
export default {
  layout: 'auth',
  mixins: [authMixin, snackMixin, loadingMixin],
  data() {
    return {
      showPassword: true,
      loadingForm: false,
      user: {
        //? debug
        // email: 'Admin@gmail.com',
        // password: '12345678',
        email: '',
        password: '',
      },
      errors: null,
      disabledSubmit: true,
    }
  },
  components: { VueRecaptcha },
  methods: {
    checkCaptcha(event) {
      // console.debug(event)
      this.disabledSubmit = false
    },
    async submit() {
      this.loadingForm = true
      await this.$axios
        .$post(`${this.$axios.defaults.baseURL}login`, this.user)
        .then((res) => {
          this.loadingForm = false
          this.authenticating(res)
          this.$router.push('/profile')
        })
        .catch((e) => {
          // console.debug(e)
          this.loadingForm = false
          // this.errors = e.response.data.error
          this.snackbarOn(
            'El correo electrónico y/o la contraseña son inválidas por favor verifique e intente de nuevo o le invitamos a registrarse en nuestro sitio web CLUB SUGAR.'
          )
        })
    },
  },
  mounted() {
    this.loadingOff()
  },
}
</script>

<style lang="scss">
.page-sigin {
  .login-wrapper {
    padding: 90px 60px 47px 60px;
    // margin-top: 100px;
  }
  .btn-action {
    margin-top: 60px;
  }
}
.card-sign-in {
  margin-top: 100px;
}
.recaptcha-wrapper {
  & > div > div {
    margin: 0 auto;
  }
}
@media (max-width: 576px) {
  .page-sigin {
    .login-wrapper {
      padding: 30px 30px 30px 30px;
    }
    .btn-action {
      margin-top: 30px;
    }
  }
}
</style>
