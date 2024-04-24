<template>
  <div id="container" class="line">
    <div class="content dynamic-layout">
      <div class="rank-wrap">
        <div class="picklist-content">
          <h1>주식 추천</h1>
          <router-link v-for="(stock, index) in stockInfo" :key="index" :to="{ path: '/detail', query: { stockInfoSequence: stock.stockInfoSequence.toString() } }">
            <div class="card" @click="onClickToDetails(stock.stockInfoSequence)">
              <h2>{{ stock.srtnCd }}</h2>
              <p>{{ stock.mrktCtg }}</p>
              <p>{{ stock.itmsNm }}</p>
            </div>
          </router-link>
          <router-link v-if="!surveyDone" to="/survey">
            성향 분석 바로 하러가기
          </router-link>
          <!--                    <div v-if="loading">-->
          <!--                      로딩 중...-->
          <!--                    </div>-->
          <!--                    <div v-else>-->
          <!--                      <div v-if="error" class="error">-->
          <!--                        {{ error }}-->
          <!--                      </div>-->
          <!--                      <div v-else>-->
          <!--                        <div v-if="recommendations.length === 0">-->
          <!--                          추천 로직을 실행 중입니다. 잠시만 기다려주세요...-->
          <!--                        </div>-->
          <!--                        <div v-else>-->
          <!--                          <div v-for="(recommendation, index) in recommendations" :key="index" class="card">-->
          <!--                            <h2>{{ recommendation.symbol }}</h2>-->
          <!--                            <p>{{ recommendation.description }}</p>-->
          <!--                            <p>추천: {{ recommendation.rating }}</p>-->
          <!--                          </div>-->
          <!--                        </div>-->
          <!--                      </div>-->
          <!--                    </div>-->
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
  private loading = true
  private error = null as string | null
  private surveyDone = true

  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  async created() {
    await this.getPicklist()
  }

  private async getPicklist() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    this.stockInfo = await getPicklist()
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
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
