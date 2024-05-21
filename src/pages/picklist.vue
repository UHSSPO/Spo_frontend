<template>
  <div id="container" class="line">
    <div class="content dynamic-layout">
      <div class="rank-wrap">
        <div class="commend-wrap w-100">
          <div class="commend-main-title">
            <div class="commend-main-area">
              <div class="flex-center">
                <v-icon>
                  mdi-finance
                </v-icon>
                <h3>SPO에서 직접 기업을 평가하여 추천해주고 있는 </h3><h2>개인추천목록</h2>
              </div>
              <div class="commend-main-txt">
                전년도 재무제표와 손익계산서, 최근 주가현황 등 분석해서 평가 후 투자성향과 종목별 위험도를 통해 추천 드리는 종목이에요 🙈🙉
              </div>
            </div>
          </div>
          <div class="picklist-content">
            <h1>개인 추천</h1>
            <div v-if="loading" class="loading">
              <div class="droplet_spinner">
                <div class="droplet" />
                <div class="droplet" />
                <div class="droplet" />
              </div>
              <h5>LOADING...</h5>
              <h3>개인추천 분석중입니다.</h3>
              <h3>잠시만 기다려주세요.</h3>
            </div>
            <div class="picklist-item">
              <div v-for="(stock, index) in stockInfo" :key="index" class="card" @click="onClickToDetails(stock.stockInfoSequence)">
                <h2>{{ stock.itmsNm }}</h2>
                <p>{{ stock.mrktCtg }}</p>
                <h1 class="ItemValue">
                  {{ stock.clpr | setNumberComma }} <span>원
                    <span v-if="stock.fltRt === 0" class="zero"><em>{{ stock.fltRt }}</em></span>
                    <span v-else :class="{minus: stock.fltRt < 0, plus: stock.fltRt > 0}"><em>{{ stock.fltRt }}</em></span>
                  </span>
                </h1>
              </div>
            </div>
            <button v-if="!loading" @click="goToSurvey">
              성향분석하기
            </button>
            <div class="dis-flex">
              <div class="mark">
                ※
              </div>
              <div class="mt-2">
                주식의 표준편차와 고가와 저가 차이를 토대로 고객님의 투자 성향과 매칭하여 나온 종목입니다. <br>
                SPO는 투자 권유를 하지 않습니다. 모든 투자는 개인의 책임입니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getDetail, getPicklist, Stock } from '~/api/stock'
import { IStockInfo } from '~/types/details/details'
import { ICommendPersonalStock, ISelectMyInfoRes } from '~/types/user/user'
import { commonStore } from '~/util/store-accessor'
import { ISearchStockInfo } from '~/types/home/home'

@Component
export default class Picklist extends Vue {
  /********************************************************************************
     * Variables (Local, VUEX)
     ********************************************************************************/
  private stockInfo: Array<ICommendPersonalStock> = []
  private loading = true
  private error = null as string | null
  private surveyDone = true

  /********************************************************************************
     * Life Cycle
     ********************************************************************************/
  created() {
    setTimeout(async () => {
      await this.getPicklist()
    }, 4000)
  }

  private async getPicklist() {
    this.loading = true
    this.$nuxt.$loading.start()
    this.stockInfo = await getPicklist()
    commonStore.ADD_PICK_LIST(this.stockInfo)
    this.$nuxt.$loading.finish()
    this.loading = false
  }

  private onClickToDetails(stockInfoSequence: number) {
    if (!this.surveyDone) {
      this.$router.push('/survey')
    } else {
      this.$router.push({
        name: 'detail',
        query: {
          stockInfoSequence: stockInfoSequence.toString()
        }
      })
    }
  }

  private goToSurvey() {
    this.$router.push('/survey')
  }
}
</script>
