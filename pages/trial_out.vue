<template>
  <v-col cols="12" sm="12" md="8" lg="6" class="logs-page order-2 order-md-1">
    <v-sheet color="transparent">
      <!-- info -->
      <v-row no-gutters>
        <v-col>
          <v-card color="" class="cm-round-1 cm-elevation-1 light">
            <v-card-text class="pa-4 pa-sm-8" v-if="getUserData">
              <h2 class="text-center">Trial Caducado</h2>
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
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
  </v-col>
</template>

<script>
import resourcesMixin from '@/mixins/resources'
import authMixin from '@/mixins/authMixin'
import { mapActions } from 'vuex'
export default {
  mixins: [resourcesMixin, authMixin],
  // middleware: ['authenticated'],
  layout: 'dashboard',
  mounted() {
    this.paymentDialogOn()
    if (localStorage.getItem('wdc_token') === null) {
      this.$router.push('/auth/sign-in')
    }
  },
  methods: {
    ...mapActions({
      paymentDialogOn: 'dialogs/paymentDialogOn',
      paymentDialogOff: 'dialogs/paymentDialogOff',
    }),
  },
}
</script>

<style>
</style>
