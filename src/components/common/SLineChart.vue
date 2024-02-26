<template>
  <div>
    <s-line-chart
      id="chart"
      ref="lineChart"
      :chart-data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['chartData', 'options'],
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
</script>

<style scoped>
</style>
