import { Globals } from '~/util/Globals'

export default class BarChartUtil {
  static getBarCommonOptions(): any {
    return {
      legend: {
        display: true
      },
      responsive: true,
      cutoutPercentage: 0,
      maintainAspectRatio: false,
      tooltips: {
        enabled: true,
        mode: 'single',
        callbacks: {
          title: function (tooltipItems: any, data: any) {
            return tooltipItems[0].label.replaceAll(',', '')
          },
          label: function (tooltipItem: any, data: any) {
            const tooltipValue = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
            return parseInt(tooltipValue, 10).toLocaleString()
          }
        }
      },
      scales: {
        xAxes: [
          {
            display: true // x축 라벨과 눈금 표시 활성화
          }
        ],
        yAxes: [
          {
            display: true, // y축 라벨과 눈금 표시 활성화
            ticks: {
              callback: function (value: any, index: any, values: any) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
            }
          }
        ]
      },
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            drag: false,
            mode: 'x',
            overScaleMode: 'x',
            speed: 0.5,
            threshold: 10
          },
          zoom: {
            enabled: false
          }
        }
      }
    }
  }

  public static getBarCommonOptions2(): any {
    return {
      legend: {
        display: false
      },
      responsive: true,
      cutoutPercentage: 0,
      maintainAspectRatio: false,
      tooltips: {
        enabled: true,
        mode: 'single',
        callbacks: {
          title: function (tooltipItems: any, data: any) {
            return tooltipItems[0].label.replaceAll(',', '')
          },
          label: function (tooltipItem: any, data: any) {
            const tooltipValue = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
            return parseInt(tooltipValue, 10).toLocaleString()
          }
        }
      },
      scales: {
        xAxes: [
          {
            display: true // x축 라벨과 눈금 표시 활성화
          }
        ],
        yAxes: [
          {
            display: true, // y축 라벨과 눈금 표시 활성화
            ticks: {
              callback: function (value: any, index: any, values: any) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
            }
          }
        ]
      },
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            drag: false,
            mode: 'x',
            overScaleMode: 'x',
            speed: 0.5,
            threshold: 10
          },
          zoom: {
            enabled: false
          }
        }
      }
    }
  }
}
