<template>
  <canvas :id="id" :height="height" />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import Chart from 'chart.js'
import { v4 } from 'uuid'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const zoom = require('chartjs-plugin-zoom')

@Component({
  name: 'SLineChart'
})
export default class SLineChart extends Vue {
  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/
  private id = ''
  private ctx: HTMLCanvasElement | null = null
  private myChart: Chart | null = null

  /********************************************************************************
   * Properties
   ********************************************************************************/
  @Prop(String) private readonly type!: 'line' | 'doughnut'
  @Prop() private readonly options!: any
  @Prop() private readonly data!: any
  @Prop({ default: 200 }) private readonly height!: number

  @Watch('data')
  private onWatchData(value: any) {
    if (value) {
      setTimeout(() => {
        this.renderChart()
      }, 10)
    }
  }

  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  created(): void {
    this.id = v4()
  }

  mounted(): void {
    this.ctx = document.getElementById(this.id) as HTMLCanvasElement
    this.renderChart()
  }

  /********************************************************************************
   * Method (Event, Business Logic)
   ********************************************************************************/
  private renderChart(): void {
    if (this.ctx && this.data) {
      if (this.myChart == null) {
        this.myChart = new Chart(this.ctx, {
          type: this.type,
          options: this.options,
          data: this.data,
          plugins: [zoom] // Add zoom plugin here
        })
      } else {
        this.myChart.data = this.data
        this.myChart.update()
      }
    }
  }
}
</script>
