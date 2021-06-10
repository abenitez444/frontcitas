<template>
  <v-container fluid fill-height class="page-sigin">
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <v-card width="500px">
          <v-sheet max-width="500px" class="login-wrapper">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Usuario"
                  solo
                  hide-details=""
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Contraseña"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  solo
                  :type="!show2 ? 'text' : 'password'"
                  @click:append="show2 = !show2"
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
                  >Unirse</v-btn
                >
                <p class="text-center mt-2">
                  ¿Eres nuevo?, registrate
                  <router-link class="text-decoration-none" to="/auth/sign-in">
                    aqui
                  </router-link>
                </p>
              </v-col>
            </v-row>
          </v-sheet>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'auth',
  data() {
    return {
      show2: true,
    }
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
