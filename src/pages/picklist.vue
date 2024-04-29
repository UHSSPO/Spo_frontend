<template>
  <div id="container" class="line">
    <div class="content dynamic-layout">
      <div class="rank-wrap">
        <div class="picklist-content">
          <h1>주식 추천</h1>
          <div v-if="loading" class="loading">
            로딩 중...
          </div>
          <!--          <router-link v-for="(stock, index) in stockInfo" :key="index" :to="{ path: '/detail', query: { stockInfoSequence: stock.stockInfoSequence.toString() } }" class="picklist-item">-->
          <!--            <div class="card" @click="onClickToDetails(stock.stockInfoSequence)">-->
          <!--              <h2>{{ stock.itmsNm }}</h2>-->
          <!--              <p>{{ stock.mrktCtg }}</p>-->
          <!--              <h1 class="ItemValue">-->
          <!--                {{ stockInfo2?.priceInfo?.clpr | setNumberComma }} <span>원-->
          <!--                  <span v-if="stockInfo2?.priceInfo?.fltRt === 0" class="zero"><em>{{ stockInfo2?.priceInfo?.fltRt }}</em></span>-->
          <!--                  <span v-else :class="{minus: stockInfo2?.priceInfo?.fltRt < 0, plus: stockInfo2?.priceInfo?.fltRt > 0}"><em>{{ stockInfo2?.priceInfo?.fltRt }}</em></span>-->
          <!--                </span>-->
          <!--              </h1>-->
          <!--            </div>-->
          <!--          </router-link>-->
          <!--          <router-link v-if="!surveyDone" to="/survey">-->
          <!--            성향 분석 바로 하러가기-->
          <!--          </router-link>-->

          <div class="picklist-item">
            <div v-for="(stock, index) in stockInfo" :key="index" class="card" @click="onClickToDetails(stock.stockInfoSequence)">
              <h2>{{ stock.itmsNm }}</h2>
              <p>{{ stock.mrktCtg }}</p>
              <h1 class="ItemValue">
                {{ stockInfo2?.priceInfo?.clpr | setNumberComma }} <span>원
                  <span v-if="stockInfo2?.priceInfo?.fltRt === 0" class="zero"><em>{{ stockInfo2?.priceInfo?.fltRt }}</em></span>
                  <span v-else :class="{minus: stockInfo2?.priceInfo?.fltRt < 0, plus: stockInfo2?.priceInfo?.fltRt > 0}"><em>{{ stockInfo2?.priceInfo?.fltRt }}</em></span>
                </span>
              </h1>
            </div>
          </div>
          <div v-if="!surveyDone" to="/survey">
            성향 분석 바로 하러가기
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getDetail, getPicklist } from '~/api/stock'
import { IStockInfo } from '~/types/details/details'
import { ICommendPersonalStock, ISelectMyInfoRes } from '~/types/user/user'
import { commonStore } from '~/util/store-accessor'

@Component
export default class Picklist extends Vue {
  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/
  private stockInfo: ICommendPersonalStock[] = []
  private stockInfo2 = {} as IStockInfo
  private loading = true
  private error = null as string | null
  private surveyDone = true

  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  async created() {
    setTimeout(async () => {
      await this.getPicklist()
    }, 4000)
  }

  private async getPicklist() {
    this.loading = true
    try {
      this.$nuxt.$loading.start()
      this.stockInfo = await getPicklist()
      this.stockInfo2 = (await getPicklist()).map((index: IStockInfo) => ({
        clpr: this.stockInfo2.priceInfo?.clpr.toString(),
        fltRt: this.stockInfo2.priceInfo?.fltRt,
      }))

      this.loading = false
    } catch (error) {
      this.loading = false
      console.error('Error while fetching picklist:', error)
    } finally {
      this.$nuxt.$loading.finish()
    }
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
}
</script>
