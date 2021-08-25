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
                        :chartdata="chartDataGeneral"
                        :options="chartOptionsGeneral"
                      />
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <wdcBar
                        :chartdata="chartDataRegion"
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
                      <!-- <pre>
                        {{ regionSelected }}
                      </pre> -->
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
                        :chartdata="chartDataMonthMen"
                        :options="chartOptionsMonthMen"
                      />
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                    <wdcLine
                      :chartdata="chartDataMonthWoman"
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
export default {
  components: { wdcBar, wdcLine },
  mixins: [resourcesMixin],
  layout: 'dashboard',
  data() {
    return {
      usersActivesTab: null,
      monthPaymentTab: null,
      regionSelected: null,
      chartDataGeneral: {
        labels: ['Hombres', 'Mujeres'],
        datasets: [
          {
            label: 'Data One',
            data: [50, 50],
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
  },
}
</script>

<style lang="scss">
.logs-page {
  margin-bottom: 250px;
}
</style>
