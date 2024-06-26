import { Globals } from '~/util/Globals'

export default class ChartUtil {
  public static getLineCommonOptions(): any {
    return {
      legend: {
        display: false
      },
      responsive: true,
      cutoutPercentage: 0,
      maintainAspectRatio: false,
      tooltips: {
        mode: 'nearest',
        intersect: false,
        callbacks: {
          label: function(tooltipItem: any, data: any) {
            let value = tooltipItem.yLabel
            if (value >= 1000) {
              value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            return value
          }
        }
      },
      scales: {
        xAxes: [
          {
            display: false
          }
        ],
        yAxes: [
          {
            display: false
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

  public static getLineCommonData(data: any): any {
    return {
      datasets: [
        {
          borderWidth: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.1)', // 뒷 배경 색상
          borderColor: 'rgba(0, 0, 0, 0)', // 라인 색상
          lineTension: 0,
          pointRadius: 0,
          fill: true,
          data
        }
      ]
    }
  }
}
