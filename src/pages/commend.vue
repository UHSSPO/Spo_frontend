<template>
  <div id="container" class="line">
    <div class="content dynamic-layout">
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
                전년도 재무제표와 손익계산서, 최근 주가현황 등 분석해서 평가 받은 종목들이에요 🙈🙉
              </div>
            </div>
          </div>
          <div class="commend-wrap-tit">
            <div class="commend-title-wrap">
              <h3>추천 종목</h3>
              <s-tool-tip class="commend-wrap-tit-tool" detail="등급별로 재무상태가 건전하거나 최근 주가 움직임이 좋은 종목이에요." />
            </div>
            <div class="commend-btn-wrap">
              <div class="mr-2 table-field">
                <s-text-field v-model="search" placeholder="종목명 검색" class="table-input" :single-line="true" :hide-details="true" />
              </div>
              <s-button :class="{click : currentOrderIndex === 0 }" @click="changeOrder(0)">
                단기추천
              </s-button>
              <s-button :class="{click : currentOrderIndex === 1 }" @click="changeOrder(1)">
                장기추천
              </s-button>
            </div>
          </div>
          <s-data-table :headers="headers" :items="currentOrderIndex === 0 ? shortStockData : longStockData" :is-search="false" :search="search">
            <template #clpr="{item}">
              {{ item.clpr | setNumberComma }}
            </template>
            <template #fltRt="{item}">
              <div v-if="item.fltRt === 0">
                {{ item.fltRt }}
              </div>
              <div v-else :class="{minus: item.fltRt < 0, plus: item.fltRt > 0}">
                {{ item.fltRt }}
              </div>
            </template>
            <template #mrktTotAmt="{item}">
              {{ item.mrktTotAmt | setKoreanNumber }}
            </template>
            <template #interest="{item}">
              <img v-if="item.interestStockYn === Globals.NO" class="table-start" src="~/assets/image/star.png" alt="favorites" @click="favoritesList(item.stockInfoSequence)">
              <img v-else class="table-start" src="~/assets/image/colorstar.png" alt="favorites" @click="favoritesList(item.stockInfoSequence)">
            </template>
          </s-data-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'nuxt-property-decorator'
import SToolTip from '~/components/common/SToolTip.vue'
import SButton from '~/components/common/SButton.vue'
import { ILongInvestment, IShortInvestment } from '~/types/home/home'
import SDataTable from '~/components/common/SDataTable.vue'
import { LongInvestmentAll, ShortInvestmentAll, UpdateInterestStock } from '~/api/stock'
import { IDataTableHeader } from '~/types/common'
import StringUtil from '~/util/StringUtil'
import STextField from '~/components/common/STextField.vue'

@Component({
  layout: 'empty',
  components: { SButton, SToolTip, SDataTable, STextField }
})
export default class Commend extends Vue {
  /********************************************************************************
   * Properties
   ********************************************************************************/
  @Prop() private readonly shortInvestment!: Array<IShortInvestment>
  @Prop() private readonly longInvestment!: Array<ILongInvestment>

  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/
  private orders: string[] = ['short', 'long']
  private search = ''

  private currentOrderIndex = 0
  private longStockData = [] as Array<ILongInvestment>
  private shortStockData = [] as Array<IShortInvestment>
  private stockData = [] as Array<IShortInvestment>
  private headers = [
    { text: '등급', value: 'rating', align: 'center', width: 100, isSlot: false },
    { text: '종목명', value: 'itmsNm', align: 'center', width: 200, isSlot: false },
    { text: '전일종가', value: 'clpr', align: 'center', width: 120, isSlot: true },
    { text: '등락률', value: 'fltRt', align: 'center', width: 120, isSlot: true },
    { text: '시가총액', value: 'mrktTotAmt', align: 'center', width: 150, isSlot: true },
    { text: '즐겨찾기', value: 'interest', align: 'center', width: 100, isSlot: true }
  ] as Array<IDataTableHeader>

  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  created(): void {
    this.initCommend()
  }

  /********************************************************************************
   * Method (Event, Business Logic)
   ********************************************************************************/
  private changeOrder(direction: number): void {
    if (direction === 0) {
      this.currentOrderIndex = 0
    } else if (direction === 1) {
      this.currentOrderIndex = 1
    }
  }

  private getShortInvestmentAll() {
    ShortInvestmentAll().then((response: Array<IShortInvestment>) => {
      this.shortStockData = response
    })
  }

  private getLongInvestmentAll() {
    LongInvestmentAll().then((response: Array<ILongInvestment>) => {
      this.longStockData = response
    })
  }

  private initCommend() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    Promise.all([this.getShortInvestmentAll(), this.getLongInvestmentAll()])
      .then(() => {
        this.changeOrder(Number(this.$route.query.currentOrderIndex))
      })
      .finally(() => {
        this.$nextTick(() => {
          this.$nuxt.$loading.finish()
        })
      })
  }

  private async favoritesList(stockInfoSequence: number) {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    const response = await UpdateInterestStock(stockInfoSequence)
    if (StringUtil.isNotEmpty(response)) {
      this.initCommend()
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  }
}

</script>
