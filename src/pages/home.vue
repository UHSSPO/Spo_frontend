<template>
  <div id="container" class="line">
    <div class="content  dynamic-layout">
      <div class="index-wrap">
        <index-info v-if="StringUtil.isNotEmpty(marketIndex)" :market-index="marketIndex" />
      </div>
      <div class="rankWrap">
        <commend />
        <popularity :popular-stock="popularStock" />
      </div>
      <div class="rankWrap">
        <Interest />
        <Explore v-if="StringUtil.isNotEmpty(theme)" :theme="theme" />
      </div>
      <div class="rankWrap">
        <div style="width: 28%; margin: 0 1%; " />
        <Board />
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

import { MarketIndex, PopularStock, Theme } from '~/api/stock'
import { IMarketIndex, IPopularStock, ITheme } from '~/types/home/home'

import Explore from '~/components/home/Explore.vue'
import Board from '~/components/home/Board.vue'

@Component({
  layout: 'empty',
  components: { IndexInfo, Commend, Popularity, Interest, Explore, Board }
})
export default class home extends Vue {
  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/
  private marketIndex = [] as Array<IMarketIndex>

  private popularStock = [] as Array<IPopularStock>

  private theme = [] as Array<ITheme>

  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  created(): void {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    Promise.all([this.getMarketIndex(), this.getPopularStock(), this.getTheme()])
      .finally(() => {
        this.$nextTick(() => {
          this.$nuxt.$loading.finish()
        })
      })
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
}

</script>
