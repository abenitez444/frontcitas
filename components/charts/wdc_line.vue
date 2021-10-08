<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    chartData: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
  },

  mounted() {
    this.renderChart(this.chartData, this.options)
  },
  // computed: {
  //   getChartData: function () {
  //     return this.chartData
  //   },
  // },
  watch: {
    chartData() {
      this.$nextTick(() => {
        this.renderChart(this.chartData, this.options)
      })
    },
  },
}
</script>

<style>
</style>
