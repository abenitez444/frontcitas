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
              ><strong>Pago No Exitoso</strong></v-toolbar
            >
            <v-card-text class="pa-4 pa-sm-8">
              Su pago no pudo ser realizado, por favor intente de nuevo.
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="paymentDialogOn()"
                >Continuar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet></v-col
  >
</template>

<script>
import loadingMixin from '~/mixins/loadingMixin'
import { mapGetters, mapActions } from 'vuex'
export default {
  layout: 'dashboard',
  mixins: [loadingMixin],
  mounted() {
    // this.paymentDialogOn()
  },
  methods: {
    ...mapActions({
      paymentDialogOn: 'dialogs/paymentDialogOn',
      paymentDialogOff: 'dialogs/paymentDialogOff',
    }),
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
