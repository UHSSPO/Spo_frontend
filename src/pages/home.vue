<template>
  <div id="container" class="line">
    <div class="content  dynamic-layout">
      <div class="index-wrap">
        <index-info v-if="StringUtil.isNotEmpty(marketIndex)" :market-index="marketIndex" />
      </div>
      <div class="rank-wrap">
        <commend :short-investment="shortInvestment" :long-investment="longInvestment" @init="initCommend" />
        <popularity :popular-stock="popularStock" @init="initCommend" />
      </div>
      <div class="rank-wrap">
        <Interest :interest="interest" />
        <Explore v-if="StringUtil.isNotEmpty(theme)" :theme="theme" />
      </div>
      <div class="rank-wrap">
        <Rank :investment-rank="investmentRank" />
        <Board :spo-board="spoBoard" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'nuxt-property-decorator'
import IndexInfo from '~/components/home/IndexInfo.vue'
import Commend from '~/components/home/Commend.vue'
import Popularity from '~/components/home/Popularity.vue'
import Interest from '~/components/home/Interest.vue'

import { LongInvestment, MarketIndex, PopularStock, ShortInvestment, Theme, GetInterest } from '~/api/stock'
import { IInterest, ILongInvestment, IMarketIndex, IPopularStock, IShortInvestment, ITheme } from '~/types/home/home'

import Explore from '~/components/home/Explore.vue'
import Board from '~/components/home/Board.vue'
import { ISpoBoard } from '~/types/board/board'
import { SpoBoard } from '~/api/board'
import Rank from '~/components/home/Rank.vue'
import { InvestmentRank } from '~/api/virtual'
import { IStockRank } from '~/types/virtual/virtual'

@Component({
  layout: 'empty',
  components: { IndexInfo, Commend, Popularity, Interest, Explore, Board, Rank }
})
export default class home extends Vue {
  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/
  private marketIndex = [] as Array<IMarketIndex>

  private popularStock = [] as Array<IPopularStock>

  private theme = [] as Array<ITheme>

  private shortInvestment = [] as Array<IShortInvestment>

  private longInvestment = [] as Array<ILongInvestment>

  private interest = [] as Array<IInterest>

  private StockInfo: IInterest[] = []

  private spoBoard = [] as Array<ISpoBoard>

  private investmentRank = [] as Array<IStockRank>

  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  created(): void {
    this.initCommend()
  }

  /********************************************************************************
   * Method (Event, Business Logic)
   ********************************************************************************/
  private getMarketIndex() {
    MarketIndex().then((response: Array<IMarketIndex>) => {
      this.marketIndex = response
    })
  }

  private getPopularStock() {
    PopularStock().then((response: Array<IPopularStock>) => {
      this.popularStock = response
    })
  }

  private getTheme() {
    Theme().then((response: Array<ITheme>) => {
      this.theme = response
    })
  }

  private getShortInvestment() {
    ShortInvestment().then((response: Array<IShortInvestment>) => {
      this.shortInvestment = response
    })
  }

  private getLongInvestment() {
    LongInvestment().then((response: Array<ILongInvestment>) => {
      this.longInvestment = response
    })
  }

  private getInterest() {
    GetInterest().then((response:Array<IInterest>) => {
      this.interest = response
    })
  }

  private getSpoBoard() {
    SpoBoard().then((response:Array<ISpoBoard>) => {
      this.spoBoard = response
    })
  }

  private getInvestmentRank() {
    InvestmentRank().then((response:Array<IStockRank>) => {
      this.investmentRank = response
    })
  }

  private initCommend() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    Promise.all([this.getMarketIndex(), this.getPopularStock(), this.getTheme(), this.getShortInvestment(), this.getLongInvestment(), this.getInterest(), this.getSpoBoard(), this.getInvestmentRank()])
      .finally(() => {
        this.$nextTick(() => {
          this.$nuxt.$loading.finish()
        })
      })
  }
}

</script>
