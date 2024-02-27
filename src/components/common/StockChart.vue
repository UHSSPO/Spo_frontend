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
import { Vue, Component, Watch } from 'vue-property-decorator'
import SLineChart from './SLineChart.vue'

@Component({
  components: {
    SLineChart
  }
})
export default class StockChart extends Vue {
  chartData = {
    labels: [],
    datasets: [
      {
        label: 'Stock Price',
        data: [],
        fill: false,
        borderColor: 'blue',
        borderWidth: 1
      }
    ]
  }

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'day'
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: false
        }
      }]
    }
  }

  mounted() {
    this.updateChartData()
    setInterval(() => {
      this.updateChartData()
    }, 60000)
  }

  updateChartData() {
    const newData = {
      labels: ['10:00', '10:15', '10:30', '10:45', '11:00', '11:15'], // 예시 시간, 받은걸로할꺼임
      datasets: [
        {
          label: 'Stock Price',
          data: [100, 110, 105, 108, 115, 112], // 얘도
          fill: false,
          borderColor: 'hotpink',
          borderWidth: 1
        }
      ]
    }
    this.chartData = newData
  }
}
</script>

<style scoped>
</style>
