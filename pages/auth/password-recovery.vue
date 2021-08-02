<template>
  <v-col
    cols="12"
    order="1"
    order-md="2"
    md="auto"
    class="d-flex justify-center"
  >
    <v-card width="500px">
      <v-sheet max-width="500px" class="login-wrapper">
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Correo Electrónico Registrado"
              outlined
              hide-details=""
              v-model="user.email"
            ></v-text-field>
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
              >Enviar</v-btn
            >
            <p class="text-center mt-2">
              ¿Eres nuevo?, registrate
              <router-link class="text-decoration-none" to="/auth/sign-up">
                aqui
              </router-link>
            </p>
            <p class="text-center">
              ¿Ya eres miembro?,
              <router-link class="text-decoration-none" to="/auth/sign-in">
                Ingresa
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
export default {
  layout: 'auth',
  mixins: [authMixin, snackMixin],
  data() {
    return {
      loadingForm: false,
      user: {
        //? debug
        email: '',
      },
      errors: null,
    }
  },
  methods: {
    async submit() {
      this.loadingForm = true
      await this.$axios
        .$post(`${this.$axios.defaults.baseURL}forgot`, this.user.email)
        .then((res) => {
          this.loadingForm = false
          this.snackbarOn('Enviado.')
        })
        .catch((e) => {
          console.debug(e)
          this.loadingForm = false
          this.snackbarOn(
            'El correo electrónico que introdujo no se encuentra registrado en nuestro sitio web, por favor verifique e intente de nuevo.'
          )
        })
      // alert('Endpoint en desarrollo')
      // alert(
      //   'El correo electrónico que introdujo no se encuentra registrado en nuestro sitio web, por favor verifique e intente de nuevo.'
      // )
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
@media (max-width: 576px) {
  .page-sigin {
    .login-wrapper {
      padding: 90px 30px 47px 30px;
    }
    .btn-action {
      margin-top: 60px;
    }
  }
}
</style>
