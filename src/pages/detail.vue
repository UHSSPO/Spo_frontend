<template>
  <div id="container" class="line">
    <div class="content  dynamic-layout">
      <div class="rank-wrap">
        <div class="commend-wrap w-100">
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
          <div class="details-warp">
            <div class="details-warp-title">
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
              <div class="detailsItem chart-wrap">
                <div class="chart">
                  <s-line-chart v-if="chartData" :options="options" :data="chartData" type="line" :height="200" />
                </div>
              </div>
            </div>
            <div class="invest-wrap">
<!--              <div class="details-warp-invest">-->
<!--                <span v-if="stockInfo.pastLongRate">-->
<!--                  1년전 투자했을경우 수익률은-->
<!--                  <span v-if="stockInfo.pastLongRate === 0">-->
<!--                    {{ stockInfo.pastLongRate }}-->
<!--                  </span>-->
<!--                  <span v-else :class="{minus: stockInfo.pastLongRate < 0, plus: stockInfo.pastLongRate > 0}">-->
<!--                    {{ stockInfo.pastLongRate }}-->
<!--                  </span>-->
<!--                  입니다.-->
<!--                </span>-->
<!--                <span v-else-if="stockInfo.pastShortRate">-->
<!--                  15일 전 투자했을 경우 수익률은-->
<!--                  <span v-if="stockInfo.pastShortRate === 0">-->
<!--                    {{ stockInfo.pastShortRate }}-->
<!--                  </span>-->
<!--                  <span v-else :class="{minus: stockInfo.pastShortRate < 0, plus: stockInfo.pastShortRate > 0}">-->
<!--                    {{ stockInfo.pastShortRate }}-->
<!--                  </span>-->
<!--                  입니다.-->
<!--                </span>-->
<!--              </div>-->
            </div>
            <div class="details-content">
              <div class="details-content-item">
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
                    <span class="detail-value">{{ stockInfo.priceInfo?.trqu | setNumberComma }}건</span>
                  </li>
                  <li class="detail-item">
                    <span class="detail-title">거래대금</span>
                    <span class="detail-value">{{ stockInfo.priceInfo?.trPrc | setNumberComma }}원</span>
                  </li>
                  <li class="detail-item">
                    <span class="detail-title">시가총액</span>
                    <span class="detail-value">{{ stockInfo.priceInfo?.mrktTotAmt | setNumberComma }}원</span>
                  </li>
                  <li class="detail-item">
                    <span class="detail-title">매출성장률</span>
                    <span class="detail-value">{{ stockInfo.enterpriseCategories?.salesGrowthRate | setDecimalNumberComma }}%</span>
                  </li>
                  <li class="detail-item">
                    <span class="detail-title">PER</span>
                    <span class="detail-value">{{ stockInfo.enterpriseCategories?.per | setNumberComma }}배</span>
                  </li>
                  <li class="detail-item">
                    <span class="detail-title">PBR</span>
                    <span class="detail-value">{{ stockInfo.enterpriseCategories?.pbr | setNumberComma }}배</span>
                  </li>
                  <li class="detail-item">
                    <span class="detail-title">법인세 차감 전 <br />순이익 성장률</span>
                    <span class="detail-value">{{ stockInfo.enterpriseCategories?.incomeBeforeTaxExpenseDiff | setDecimalNumberComma }}%</span>
                  </li>
                  <li class="detail-item">
                    <span class="detail-title">부채비율</span>
                    <span class="detail-value">{{ stockInfo.enterpriseCategories?.financialStatementDebtRatio | setNumberComma }}%</span>
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
                    <span class="detail-title">시가총액 변화 비율</span>
                    <span class="detail-value">{{ stockInfo.enterpriseCategories?.changeMarketGap | setDecimalNumberComma }}%</span>
                  </li>
                  <li class="detail-item moblie-last">
                    <span class="detail-title">시가총액 기준 거래대금 비율</span>
                    <span class="detail-value">{{ stockInfo.enterpriseCategories?.volumeRatio | setDecimalNumberComma }}%</span>
                  </li>
                </ul>
              </div>
              <div class="details-content-item">
                <h3>손익</h3>
                <div class="stickchart">
                  <s-line-chart v-if="incomeChartData" :options="barOptions" :data="incomeChartData" type="bar" :height="200" />
                </div>
              </div>
              <div class="details-content-item">
                <h3>재무상태</h3>
                <div class="stickchart">
                  <s-line-chart v-if="financialData" :options="barOptions2" :data="financialData" type="bar" :height="200" />
                </div>
              </div>
              <div class="details-content-item">
                <h3>기업 정보</h3>
                <div class="detail-Info-wrap">
                  <ul>
                    <li>
                      <p class="detail-info-title">
                        설립일
                      </p>
                      <p>{{ stockInfo.enterpriseInfo?.enpEstbDt | setDate }}</p>
                    </li>
                    <li>
                      <p class="detail-info-title">
                        대표자
                      </p>
                      <p>{{ stockInfo.enterpriseInfo?.enpRprFnm }}</p>
                    </li>
                    <li>
                      <p class="detail-info-title">
                        주요산업
                      </p>
                      <p>{{ stockInfo.enterpriseInfo?.enpMainBizNm }}</p>
                    </li>
                    <li>
                      <p class="detail-info-title">
                        종업원 수
                      </p>
                      <p>{{ stockInfo.enterpriseInfo?.enpEmpeCnt | setNumberComma }} 명</p>
                    </li>
                    <li>
                      <p class="detail-info-title">
                        홈페이지
                      </p>
                      <a>{{ stockInfo.enterpriseInfo?.enpHmpgUrl }}</a>
                    </li>
                    <li>
                      <p class="detail-info-title">
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
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import _ from 'lodash'
import { IEnterpriseInfo, IIncoInfo, IPriceInfo, IStockInfo, ISummFinaInfo } from '~/types/details/details'
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
  private barOptions = BarChartUtil.getBarCommonOptions()
  private barOptions2 = BarChartUtil.getBarCommonOptions2()
  private chartData = {}
  private incomeChartData = {}
  private financialData = {}

  @Watch('$route')
  private async watchRoute() {
    await this.initDetail()
  }

  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  async created() {
    await this.initDetail()
  }

  private async initDetail() {
    this.stockInfoSequence = Number(this.$route.query.stockInfoSequence)
    await this.getDetail()
  }

  private async getDetail() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    this.stockInfo = await getDetail(this.stockInfoSequence)
    this.chartData = this.setSummedData(this.stockInfo.prc15tnMonInfo)
    this.incomeChartData = this.setIncomeChartData(this.stockInfo.incoInfo)
    this.financialData = this.setFinancialData(this.stockInfo.summFinaInfo)
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  }

  private setIncomeChartData(data: Array<IIncoInfo>) {
    const labels = [] as any
    const datasets = [] as any

    // 각 그룹에 대한 데이터 배열 초기화
    const crtmAcitAmtData = [] as any
    const pvtrAcitAmtData = [] as any
    const bpvtrAcitAmtData = [] as any

    // 데이터를 그룹으로 나누어서 각 그룹에 대한 데이터 배열에 추가
    data.forEach((item: IIncoInfo) => {
      labels.push(item.acitNm)
      crtmAcitAmtData.push(item.crtmAcitAmt)
      pvtrAcitAmtData.push(item.pvtrAcitAmt)
      bpvtrAcitAmtData.push(item.bpvtrAcitAmt)
    })

    // 각 그룹에 대한 데이터셋을 생성하고 datasets에 추가
    datasets.push({
      label: data[0].bizYear,
      backgroundColor: 'rgba(255, 99, 132, 0.7)', // 빨간색
      data: crtmAcitAmtData
    })
    datasets.push({
      label: '전기',
      backgroundColor: 'rgba(54, 162, 235, 0.7)', // 파란색
      data: pvtrAcitAmtData
    })
    datasets.push({
      label: '전전기',
      backgroundColor: 'rgba(255, 206, 86, 0.7)', // 노란색
      data: bpvtrAcitAmtData
    })

    return {
      datasets,
      labels
    }
  }

  private setFinancialData(data: ISummFinaInfo) {
    // 데이터 객체에서 각 항목의 값을 가져옵니다.
    const enpTastAmtData = data.enpTastAmt
    const enpTdbtAmtData = data.enpTdbtAmt
    const enpTcptAmtData = data.enpTcptAmt

    // 레이블과 데이터셋을 초기화합니다.
    const labels = ['자산', '자본', '부채']
    const datasets = [] as any

    // 데이터셋을 생성합니다.
    datasets.push({
      label: '자산',
      backgroundColor: ['rgba(255, 99, 132, 0.7)', 'rgba(54, 162, 235, 0.7)', 'rgba(255, 206, 86, 0.7)'],
      data: [enpTastAmtData, enpTdbtAmtData, enpTcptAmtData]
    })

    return {
      datasets,
      labels
    }
  }

  private setSummedData(array: any) {
    const reversedArray = _.reverse([...array])
    return {
      datasets: [
        {
          borderColor: 'rgba(255,173,182,0.94)',
          backgroundColor: 'rgba(250,178,183,0.94)',
          borderWidth: 2,
          lineTension: 0,
          pointRadius: 0,
          data: _.map(reversedArray, 'clpr') as any
        }
      ],
      labels: _.map(reversedArray, 'basDt') as any
    }
  }
}
</script>
