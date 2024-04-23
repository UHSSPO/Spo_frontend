<template>
  <div id="container" class="line">
    <div class="content dynamic-layout">
      <div class="rank-wrap">
        <div class="picklist-content">
          <h1>주식 추천</h1>
          <div v-if="loading">
            로딩 중...
          </div>
          <div v-else>
            <div v-if="error" class="error">
              {{ error }}
            </div>
            <div v-else>
              <div v-if="recommendations.length === 0">
                추천 로직을 실행 중입니다. 잠시만 기다려주세요...
              </div>
              <div v-else>
                <div v-for="(recommendation, index) in recommendations" :key="index" class="card">
                  <h2>{{ recommendation.symbol }}</h2>
                  <p>{{ recommendation.description }}</p>
                  <p>추천: {{ recommendation.rating }}</p>
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
import { Vue, Component } from 'vue-property-decorator'
import { getDetail } from '~/api/stock'
import { IStockInfo } from '~/types/details/details'

@Component
export default class Picklist extends Vue {
  /********************************************************************************
     * Variables (Local, VUEX)
     ********************************************************************************/
  private stockInfo = {} as IStockInfo
  private userInfoSequence = 0
  loading = true
  error: string | null = null
  recommendations: any[] = []
  stockInfoSequence = 0

  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  async created() {
    await this.initDetail()
  }

  private async initDetail() {
    this.stockInfoSequence = Number(this.$route.query.userInfoSequence)
    await this.getDetail()
  }

  private async getDetail() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    this.stockInfo = await getDetail(this.userInfoSequence)
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  }
}
</script>

<style scoped>
.card {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
}

.error {
    color: red;
}
</style>
