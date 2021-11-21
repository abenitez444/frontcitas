<template>
  <v-col
    cols="12"
    sm="12"
    md="8"
    lg="6"
    class="payment-methods-page order-2 order-md-1"
  >
    <v-dialog v-model="loginRequiredDialog" persistent max-width="500">
      <v-card>
        <!-- password verification step -->
        <v-card-text class="pa-5">
          <h3>Debe iniciar Sesion para continuar</h3>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="loginRequiredDialog = false">
            cancelar
          </v-btn>
          <v-btn color="error" to="/auth/sign-in"> Ir al login </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-sheet color="transparent">
      <!-- info -->
      <v-row no-gutters>
        <v-col>
          <v-card color="" class="cm-round-1 cm-elevation-1 light">
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
                            class="
                              white--text
                              text-center
                              d-flex
                              justify-center
                            "
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
                            <v-btn
                              color="#00b8d9"
                              dark
                              @click="paymentMethod(1)"
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
                            class="
                              white--text
                              text-center
                              d-flex
                              justify-center
                            "
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
                            <v-btn
                              color="#6554c0"
                              dark
                              @click="paymentMethod(2)"
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
                        <span v-if="planSelected === 1"
                          >Membresía VIP 1 mes</span
                        >
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
                    <span v-else-if="planSelected === 2"
                      >$64 USD</span
                    ></v-col
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
                <!-- <v-btn color="error" @click="paymentDialogOff()">
                  Cancelar
                </v-btn> -->
                <v-spacer></v-spacer>
              </template>
              <template v-else-if="paymentStep === 2">
                <v-spacer></v-spacer>
                <v-btn color="error" text @click="paymentStep = 1">
                  volver
                </v-btn>
                <!-- <v-spacer></v-spacer>
                <v-btn color="error" text @click="paymentDialogOff()">
                  Cancelar
                </v-btn> -->
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
        </v-col>
      </v-row>
    </v-sheet>
  </v-col>
</template>

<script>
import resourcesMixin from '@/mixins/resources'
import authMixin from '@/mixins/authMixin'
import loadingMixin from '~/mixins/loadingMixin'

export default {
  mixins: [resourcesMixin, authMixin, loadingMixin],
  // middleware: ['authenticated'],
  layout: 'dashboard',
  mounted() {
    // console.debug(this.isAuthenticated)
    if (localStorage.getItem('wdc_token') === null) {
      this.$router.push('/auth/sign-in')
    }
  },
  data() {
    return {
      paymentStep: 1,
      planSelected: null,
      radioGroup: 1,
      loginRequiredDialog: false,
    }
  },
  methods: {
    paymentMethod(planId) {
      this.paymentStep = 2
      this.planSelected = planId
    },
    async paymentPlan() {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

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
          // this.paymentDialogOff()
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
  },
}
</script>

<style lang="scss">
.payment-methods-page {
  margin-bottom: 250px;
}
</style>
