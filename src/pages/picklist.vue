<template>
  <div id="container" class="line">
    <div class="content dynamic-layout">
      <div class="rank-wrap">
        <div class="picklist-content">
          <h1>주식 추천</h1>
          <div v-if="loading" class="loading">
            로딩 중...
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
          <div v-if="!surveyDone" to="/survey">
            성향 분석 바로 하러가기
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
  private stockInfo: Array<ICommendPersonalStock> = []
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
    this.$nuxt.$loading.start()
    this.stockInfo = await getPicklist()
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
}
</script>
