<template>
  <v-col cols="auto">
    <v-card width="500px">
      <v-sheet max-width="500px" class="login-wrapper">
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Correo"
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
        </v-row>
        <v-row justify="center">
          <v-col cols="auto">
            <v-btn
              rounded
              class="font-weight-bold btn-action"
              width="250px"
              color="primary"
              large
              @click="submit()"
              >Unirse</v-btn
            >
            <p class="text-center mt-2">
              ¿Eres nuevo?, registrate
              <router-link class="text-decoration-none" to="/auth/sign-up">
                aqui
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
export default {
  layout: 'auth',
  mixins: [authMixin],
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
    }
  },
  methods: {
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
          console.debug(e)
          this.loadingForm = false
          this.errors = e.response.data.error
        })
    },
  },
}
</script>

<style lang="scss">
.page-sigin {
  .login-wrapper {
    padding: 90px 60px 47px 60px;
  }
  .btn-action {
    margin-top: 120px;
  }
}
</style>
