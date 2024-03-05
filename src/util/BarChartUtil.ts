import { Globals } from '~/util/Globals'

export default class BarChartUtil {
  public static getBarCommonOptions(): any {
    return {
      legend: {
        display: true
      },
      responsive: true,
      cutoutPercentage: 0,
      maintainAspectRatio: false,
      tooltips: {
        mode: 'nearest',
        intersect: false
      },
      scales: {
        xAxes: [
          {
            display: true // x축 라벨과 눈금 표시 활성화
          }
        ],
        yAxes: [
          {
            display: true // y축 라벨과 눈금 표시 활성화
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
        mode: 'nearest',
        intersect: false
      },
      scales: {
        xAxes: [
          {
            display: true // x축 라벨과 눈금 표시 활성화
          }
        ],
        yAxes: [
          {
            display: true // y축 라벨과 눈금 표시 활성화
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

  public static getBarCommonData(data: any): any {
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
