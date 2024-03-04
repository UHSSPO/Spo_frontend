<template>
  <div id="container" class="line">
    <div class="content  dynamic-layout">
      <div class="rankWrap">
        <div class="commendWrap w-100">
          <div class="commend-main-title">
            <div class="commend-main-area">
              <div class="flex-center">
                <v-icon>
                  mdi-finance
                </v-icon>
                <h3>SPO에서 직접 기업을 평가하여 추천해주고 있는 </h3><h2>추천종목</h2>
              </div>
              <div class="commend-main-txt">
                종목들을 상세히 나타낸 상세 페이지에요 🙈🙉
              </div>
            </div>
          </div>
          <!--          v-if="StockInfo.stockInfoSequence === $route.query.currentOrderIndex"-->
          <div class="detailsWarp">
            <div class="detailsWarpTitle">
              <div class="detailsItem">
                <span class="ItemCode">{{ stockInfo.srtnCd }} {{ stockInfo.mrktCtg }}</span>
                <h3 class="ItemName">
                  {{ stockInfo.itmsNm }}
                </h3>
                <h1 class="ItemValue">
                  {{ stockInfo.priceInfo?.clpr | setNumberComma }} <span>원
                    <span v-if="stockInfo.priceInfo?.fltRt === 0" class="zero"><em>{{ stockInfo.priceInfo?.fltRt }}</em></span>
                    <span v-else :class="{minus: stockInfo.priceInfo?.fltRt < 0, plus: stockInfo.priceInfo?.fltRt > 0}"><em>{{ stockInfo.priceInfo?.fltRt }}</em></span>

                  </span>
                </h1>
              </div>
              <div class="detailsItem chartWrap">
                <div class="chart">
                  <s-line-chart v-if="chartData" :options="options" :data="chartData" type="line" :height="200" />
                </div>
              </div>
            </div>
            <div class="detailsContent">
              <div class="detailsContentItem">
                <ul class="detail-list">
                  <li class="detail-item detail-list-title">
                    상세정보
                  </li>
                  <li class="detail-item">
                    <span class="detail-title">전일종가</span>
                    <span class="detail-value">{{ stockInfo.priceInfo?.clpr | setNumberComma }}</span>
                  </li>
                  <li class="detail-item">
                    <span class="detail-title">시가</span>
                    <span class="detail-value">{{ stockInfo.priceInfo?.mkp | setNumberComma }}</span>
                  </li>
                  <li class="detail-item">
                    <span class="detail-title">고가</span>
                    <span class="detail-value red--text">{{ stockInfo.priceInfo?.hipr | setNumberComma }}</span>
                  </li>
                  <li class="detail-item">
                    <span class="detail-title">저가</span>
                    <span class="detail-value minus">{{ stockInfo.priceInfo?.lopr | setNumberComma }}</span>
                  </li>
                  <li class="detail-item">
                    <span class="detail-title">거래량</span>
                    <span class="detail-value">{{ stockInfo.priceInfo?.trqu | setNumberComma }}</span>
                  </li>
                  <li class="detail-item">
                    <span class="detail-title">거래대금</span>
                    <span class="detail-value">{{ stockInfo.priceInfo?.trPrc | setNumberComma }}</span>
                  </li>
                  <li class="detail-item">
                    <span class="detail-title">시가총액</span>
                    <span class="detail-value">{{ stockInfo.priceInfo?.mrktTotAmt | setNumberComma }}</span>
                  </li>
                  <li class="detail-item">
                    <span class="detail-title">매출성장률</span>
                    <span class="detail-value">{{ stockInfo.enterpriseCategories?.salesGrowthRate | setNumberComma }}</span>
                  </li>
                  <li class="detail-item">
                    <span class="detail-title">per</span>
                    <span class="detail-value">{{ stockInfo.enterpriseCategories?.per | setNumberComma }}</span>
                  </li>
                  <li class="detail-item">
                    <span class="detail-title">pbr</span>
                    <span class="detail-value">{{ stockInfo.enterpriseCategories?.pbr | setNumberComma }}</span>
                  </li>
                  <li class="detail-item">
                    <span class="detail-title">순이익</span>
                    <span class="detail-value">{{ stockInfo.enterpriseCategories?.incomeBeforeTaxExpenseDiff | setNumberComma }}</span>
                  </li>
                  <li class="detail-item">
                    <span class="detail-title">부채비율</span>
                    <span class="detail-value">{{ stockInfo.enterpriseCategories?.financialStatementDebtRatio | setNumberComma }}</span>
                  </li>
                  <li class="detail-item web-last">
                    <span class="detail-title">ROE</span>
                    <span class="detail-value">{{ stockInfo.enterpriseCategories?.roe | setNumberComma }}</span>
                  </li>
                  <li class="detail-item web-last">
                    <span class="detail-title">ROA</span>
                    <span class="detail-value">{{ stockInfo.enterpriseCategories?.roa | setNumberComma }}</span>
                  </li>
                  <li class="detail-item moblie-last">
                    <span class="detail-title">시가총액 기준</span>
                    <span class="detail-value">{{ stockInfo.enterpriseCategories?.volumeRatio | setNumberComma }}</span>
                  </li>
                  <li class="detail-item moblie-last">
                    <span class="detail-title">거래대금 비율</span>
                    <span class="detail-value">{{ stockInfo.enterpriseCategories?.volumeRatio | setNumberComma }}</span>
                  </li>
                </ul>
              </div>
              <div class="detailsContentItem">
                <h3>손익</h3>
                <div class="stickchart">
                  <s-line-chart v-if="incomeChartData" :options="baroptions" :data="incomeChartData" type="bar" :height="200" />
                </div>
              </div>
              <div class="detailsContentItem">
                <h3>재무상태</h3>
                <div class="stickchart">
                  <s-line-chart v-if="financialData" :options="baroptions" :data="financialData" type="bar" :height="200" />
                </div>
              </div>
              <div class="detailsContentItem">
                <h3>기업 정보</h3>
                <div class="detailsInfoWrap">
                  <ul>
                    <li>
                      <p class="detailsInfoTitle">
                        설립일
                      </p>
                      <p>{{ stockInfo.enterpriseInfo?.enpEstbDt | setDate }}</p>
                    </li>
                    <li>
                      <p class="detailsInfoTitle">
                        대표자
                      </p>
                      <p>{{ stockInfo.enterpriseInfo?.enpRprFnm }}</p>
                    </li>
                    <li>
                      <p class="detailsInfoTitle">
                        주요산업
                      </p>
                      <p>{{ stockInfo.enterpriseInfo?.enpMainBizNm }}</p>
                    </li>
                    <li>
                      <p class="detailsInfoTitle">
                        종업원 수
                      </p>
                      <p>{{ stockInfo.enterpriseInfo?.enpEmpeCnt | setNumberComma }} 명</p>
                    </li>
                    <li>
                      <p class="detailsInfoTitle">
                        홈페이지
                      </p>
                      <a>{{ stockInfo.enterpriseInfo?.enpHmpgUrl }}</a>
                    </li>
                    <li>
                      <p class="detailsInfoTitle">
                        본사주소
                      </p>
                      <p>{{ stockInfo.enterpriseInfo?.enpBsadr }}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import _ from 'lodash'
import { IEnterpriseInfo, IPriceInfo, IStockInfo, ISummFinaInfo } from '~/types/details/details'
import { getDetail } from '~/api/stock'
import SLineChart from '~/components/common/SLineChart.vue'
import ChartUtil from '~/util/ChartUtil'
import BarChartUtil from '~/util/BarChartUtil'

@Component({
  layout: 'empty',
  components: {
    SLineChart
  }
})
export default class detail extends Vue {
  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/
  private stockInfo = {} as IStockInfo
  private stockInfoSequence = 0
  private options = ChartUtil.getLineCommonOptions()
  private baroptions = BarChartUtil.getBarCommonOptions()
  private chartData = {}
  private incomeChartData = {}
  private financialData = {}

  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  async created() {
    this.stockInfoSequence = Number(this.$route.query.stockInfoSequence)
    await this.getDetail()
  }

  private async getDetail() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    this.stockInfo = await getDetail(this.stockInfoSequence)
    this.chartData = this.setSummedData(this.stockInfo.prc15tnMonInfo)
    this.incomeChartData = this.setIncomeChartData(this.stockInfo.summFinaInfo)
    this.financialData = this.setFinancialData(this.stockInfo.summFinaInfo)
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  }

  private setIncomeChartData(data: ISummFinaInfo) {
    const operatingProfit = [data.enpBzopPft]
    const netProfit = [data.enpCrtmNpf]
    const years = [data.bizYear]

    return {
      datasets: [
        {
          label: '영업이익',
          backgroundColor: 'rgba(255, 173, 182, 0.94)',
          borderColor: 'rgba(255, 173, 182, 0.94)',
          borderWidth: 2,
          lineTension: 0,
          pointRadius: 0,
          data: operatingProfit
        },
        {
          label: '순이익',
          backgroundColor: 'rgba(0, 123, 255, 0.94)',
          borderColor: 'rgba(0, 123, 255, 0.94)',
          borderWidth: 2,
          lineTension: 0,
          pointRadius: 0,
          data: netProfit
        }
      ],
      labels: years
    }
  }

  private setFinancialData(data: ISummFinaInfo) {
    const enpTastAmt = [data.enpTastAmt]
    const enpTdbtAmt = [data.enpTdbtAmt]
    const enpTcptAmt = [data.enpTcptAmt]

    return {
      datasets: [
        {
          label: '영업이익',
          backgroundColor: 'rgba(255, 173, 182, 0.94)',
          borderColor: 'rgba(255, 173, 182, 0.94)',
          borderWidth: 2,
          lineTension: 0,
          pointRadius: 0,
          data: enpTastAmt
        },
        {
          label: '순이익',
          backgroundColor: 'rgba(0, 123, 255, 0.94)',
          borderColor: 'rgba(0, 123, 255, 0.94)',
          borderWidth: 2,
          lineTension: 0,
          pointRadius: 0,
          data: enpTdbtAmt
        },
        {
          label: '순이익',
          backgroundColor: 'rgba(255,255,0,0.94)',
          borderColor: 'rgba(255,255,0,0.94)',
          borderWidth: 2,
          lineTension: 0,
          pointRadius: 0,
          data: enpTcptAmt
        }
      ],
      labels: ''
    }
  }

  private setSummedData(array: any) {
    return {
      datasets: [
        {
          borderColor: 'rgba(255,173,182,0.94)',
          backgroundColor: 'rgba(250,178,183,0.94)',
          borderWidth: 2,
          lineTension: 0,
          pointRadius: 0,
          data: _.map(array, 'clpr') as any
        }
      ],
      labels: _.map(array, 'updateAt') as any
    }
  }
}
</script>
