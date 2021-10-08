<template>
  <v-col cols="12" sm="12" md="8" lg="6" class="logs-page order-2 order-md-1">
    <v-sheet color="transparent">
      <!-- info -->
      <v-row>
        <v-col cols="12">
          <v-card color="" class="cm-round-1 cm-elevation-1 light">
            <v-card-title>
              <v-row>
                <v-col cols="auto"><span> Usuarios Activos </span></v-col>

                <v-spacer></v-spacer>

                <v-col cols="auto">
                  <v-tabs v-model="usersActivesTab">
                    <v-tab>General</v-tab>
                    <v-tab>Por región</v-tab>
                  </v-tabs>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text class="pa-4 pa-sm-8">
              <v-tabs-items v-model="usersActivesTab">
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <wdcBar
                        :chartData="chartDataGeneral"
                        :options="chartOptionsGeneral"
                      />
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <wdcBar
                        :chartData="chartDataRegion"
                        :options="chartOptionsRegion"
                      />
                      <v-select
                        :items="regions"
                        :item-text="(item) => item.name"
                        :item-value="(item) => item.id"
                        label="Región"
                        hide-details=""
                        v-model="regionSelected"
                        solo
                      ></v-select>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card color="" class="cm-round-1 cm-elevation-1 light">
            <v-card-title>
              <v-row>
                <v-col cols="auto"><span> Pagos Mensuales </span></v-col>

                <v-col></v-col>

                <v-col cols="auto">
                  <v-tabs v-model="monthPaymentTab">
                    <v-tab>Hombres</v-tab>
                    <v-tab>Mujeres</v-tab>
                  </v-tabs>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text class="pa-4 pa-sm-8">
              <v-tabs-items v-model="monthPaymentTab">
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <wdcLine
                        :chartData="chartDataMonthMen"
                        :options="chartOptionsMonthMen"
                      />
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                    <wdcLine
                      :chartData="chartDataMonthWoman"
                      :options="chartOptionsMonthWoman"
                    />
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
  </v-col>
</template>

<script>
import wdcBar from '~/components/charts/wdc_bar.vue'
import wdcLine from '~/components/charts/wdc_line.vue'
import resourcesMixin from '@/mixins/resources'
import loadingMixin from '@/mixins/loadingMixin'
import authMixin from '~/mixins/authMixin'
export default {
  components: { wdcBar, wdcLine },
  mixins: [resourcesMixin, loadingMixin, authMixin],
  middleware: ['authenticated'],
  layout: 'dashboard',
  data() {
    return {
      usersActivesTab: null,
      monthPaymentTab: null,
      regionSelected: null,
      menByRegion: [],
      womenByRegion: [],
      paymentsMen: [],
      paymentsWoman: [],
      chartDataGeneral: {
        labels: ['Hombres', 'Mujeres'],
        datasets: [
          {
            label: 'Data One',
            data: [1, 1],
            backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
          },
        ],
      },
      chartOptionsGeneral: {
        responsive: true,
        maintainAspectRatio: false,
      },
      chartDataRegion: {
        labels: ['Hombres', 'Mujeres'],
        datasets: [
          {
            label: 'Data One',
            data: [50, 50],
            backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
          },
        ],
      },
      chartOptionsRegion: {
        responsive: true,
        maintainAspectRatio: false,
      },
      chartDataMonthMen: {
        labels: [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre',
        ],
        datasets: [
          {
            label: 'Membresías Pagadas',
            data: [20, 50, 25, 75, 90, 100, 20, 50, 25, 75, 90, 100],
            backgroundColor: ['rgb(54, 162, 235)'],
          },
        ],
      },
      chartOptionsMonthMen: {
        responsive: true,
        maintainAspectRatio: false,
      },
      chartDataMonthWoman: {
        labels: [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre',
        ],
        datasets: [
          {
            label: 'Membresías Pagadas',
            data: [75, 90, 100, 20, 50, 25, 90, 100, 20, 75, 50, 25],
            backgroundColor: ['rgb(255, 99, 132)'],
          },
        ],
      },
      chartOptionsMonthWoman: {
        responsive: true,
        maintainAspectRatio: false,
      },
    }
  },
  mounted() {
    this.getRegions()
    this.getUsers()
    this.getUsersByRegions()
    this.getMensByPayment()
    this.getWomansByPayment()
  },
  methods: {
    async getUsers() {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      const options = {
        method: 'GET',
        url: `${this.$axios.defaults.baseURL}auth/count-women-and-men-registred`,
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
          // console.debug(res.data[1].men, res.data[0].women)
          this.chartDataGeneral = {
            labels: ['Hombres', 'Mujeres'],
            datasets: [
              {
                label: 'Data One',
                data: [res.data[1].men, res.data[0].women],
                backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
              },
            ],
          }
          // console.debug('hey', this.chartDataGeneral.datasets[0].data)
        })
        .catch((e) => {
          // console.debug(e.response.data.error)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error, pongase en contacto con el soporte.'
          )
        })
    },
    async getUsersByRegions() {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      const options = {
        method: 'GET',
        url: `${this.$axios.defaults.baseURL}auth/count-women-and-men-by-region`,
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
          this.menByRegion = res.data.men
          this.womenByRegion = res.data.women
        })
        .catch((e) => {
          // console.debug(e.response.data.error)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error, pongase en contacto con el soporte.'
          )
        })
    },
    async getMensByPayment() {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      const options = {
        method: 'GET',
        url: `${this.$axios.defaults.baseURL}auth/payments-men`,
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
          this.paymentsMen = res.data.men
          let data = []
          this.paymentsMen.forEach((month) => {
            data.push(month.pays)
          })
          this.chartDataMonthMen = {
            labels: [
              'Enero',
              'Febrero',
              'Marzo',
              'Abril',
              'Mayo',
              'Junio',
              'Julio',
              'Agosto',
              'Septiembre',
              'Octubre',
              'Noviembre',
              'Diciembre',
            ],
            datasets: [
              {
                label: 'Membresías Pagadas',
                data: data,
                backgroundColor: ['rgb(54, 162, 235)'],
              },
            ],
          }
          // this.womenByRegion = res.data.women
        })
        .catch((e) => {
          // console.debug(e.response.data.error)
          this.loadingOff()
          this.snackbarOn(
            'Ha ocurrido un error, pongase en contacto con el soporte.'
          )
        })
    },
    async getWomansByPayment() {
      this.loadingOn()
      const { token, sub, prof } = JSON.parse(localStorage.getItem('wdc_token'))

      const options = {
        method: 'GET',
        url: `${this.$axios.defaults.baseURL}auth/payments-women`,
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
          this.paymentsWoman = res.data.women
          let data = []
          this.paymentsWoman.forEach((month) => {
            data.push(month.pays)
          })
          this.chartDataMonthWoman = {
            labels: [
              'Enero',
              'Febrero',
              'Marzo',
              'Abril',
              'Mayo',
              'Junio',
              'Julio',
              'Agosto',
              'Septiembre',
              'Octubre',
              'Noviembre',
              'Diciembre',
            ],
            datasets: [
              {
                label: 'Membresías Pagadas',
                data: data,
                backgroundColor: ['rgb(255, 99, 132)'],
              },
            ],
          }
          // this.womenByRegion = res.data.women
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
  watch: {
    regionSelected: function (val) {
      let menCount = this.menByRegion.filter((item) => {
        return item.id === val
      })[0].users.count

      let womenCount = this.womenByRegion.filter((item) => {
        return item.id === val
      })[0].users.count

      this.chartDataRegion = {
        labels: ['Hombres', 'Mujeres'],
        datasets: [
          {
            label: 'Data One',
            data: [menCount, womenCount],
            backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
          },
        ],
      }
    },
  },
}
</script>

<style lang="scss">
.logs-page {
  margin-bottom: 250px;
}
</style>
