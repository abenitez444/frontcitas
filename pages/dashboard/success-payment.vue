<template>
  <v-col
    cols="12"
    sm="12"
    md="8"
    lg="6"
    class="success-page order-2 order-md-1"
  >
    <v-sheet color="transparent">
      <v-row no-gutters class="messages-wrapper">
        <v-col>
          <v-card class="cm-round-1 cm-elevation-1">
            <v-toolbar color="primary" dark
              ><strong>Pago Exitoso</strong></v-toolbar
            >
            <v-card-text class="pa-4 pa-sm-8">
              Su pago fue realizado exitosamente, ahora puede disfrutar de todos
              nuestros beneficios
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" to="/profile">Continuar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
  </v-col>
</template>

<script>
import loadingMixin from '~/mixins/loadingMixin'
import { mapGetters, mapActions } from 'vuex'
export default {
  layout: 'dashboard',
  mixins: [loadingMixin],
  mounted() {
    this.getUserStatus()
  },
  methods: {
    ...mapActions({
      paymentDialogOn: 'dialogs/paymentDialogOn',
      paymentDialogOff: 'dialogs/paymentDialogOff',
    }),
    async getUserStatus() {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      const options = {
        method: 'GET',
        url: `${this.$axios.defaults.baseURL}auth/profile-current-status`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }

      await this.$axios
        .request(options)
        .then((res) => {
          this.loadingOff()
          let profile = JSON.parse(localStorage.getItem('wdc_token'))
          profile.status = res.data.status
          console.debug(profile)
          // update status
          localStorage.setItem('wdc_token', JSON.stringify(profile))
        })
        .catch((e) => {
          // console.debug(e.response.data.error)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error, pongase en contacto con el soporte.'
          )
        })
    },
  },
  computed: {
    ...mapGetters({
      getPaymentDialog: 'dialogs/getPaymentDialog',
    }),
  },
}
</script>

<style>
</style>
