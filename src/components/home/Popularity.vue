<template>
  <div class="popularity-wrap">
    <h3>인기 종목</h3>
    <table class="popularityRank popularity">
      <tr>
        <td />
        <td>종목명</td>
        <td>전일종가</td>
        <td>등락률</td>
        <td>시가총액</td>
        <td>즐겨찾기</td>
      </tr>
      <tr v-for="(item, idx) in popularStock" :key="idx">
        <td>{{ idx+1 }}</td>
        <td>
          <a class="font-black" @click="onClickToDetails(item.stockInfoSequence)">{{ item.itmsNm }}</a>
        </td>
        <td>{{ item.clpr | setNumberComma }}</td>
        <td v-if="item.fltRt === 0">
          {{ item.fltRt }}
        </td>
        <td v-else :class="{minus: item.fltRt < 0, plus: item.fltRt > 0}">
          {{ item.fltRt }}
        </td>
        <td>{{ item.mrktTotAmt | setKoreanNumber }}</td>
        <td>
          <img v-if="item.interestStockYn === Globals.NO" src="~/assets/image/star.png" alt="favorites" @click="favoritesList(item.stockInfoSequence)">
          <img v-else src="~/assets/image/colorstar.png" alt="favorites" @click="favoritesList(item.stockInfoSequence)">
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">

import { Component, Emit, namespace, Prop, Vue } from 'nuxt-property-decorator'
import { IMarketIndex, IPopularStock } from '~/types/home/home'
import { UpdateInterestStock } from '~/api/stock'
import StringUtil from '~/util/StringUtil'
import { commonStore } from '~/util/store-accessor'
import { Namespace } from '~/util/Namespace'
const common = namespace(Namespace.COMMON)

@Component({
  layout: 'empty',
  components: {}
})
export default class Popularity extends Vue {
  /********************************************************************************
   * Properties
   ********************************************************************************/
  @Prop() private readonly popularStock!: Array<IPopularStock>
  @common.State private token!: string
  @Emit('init')
  private initCommend() {
    return false
  }

  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  private async favoritesList(stockInfoSequence: number) {
    this.$nuxt.$loading.start()
    const response = await UpdateInterestStock(stockInfoSequence)
    if (StringUtil.isNotEmpty(response)) {
      this.initCommend()
    }
    this.$nuxt.$loading.finish()
  }

  private onClickToDetails(stockInfoSequence: number) {
    commonStore.CHECK_LOGIN()
    if (this.token) {
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

<style lang="scss">
.popularity {
  margin-top: 1px !important;
}
</style>
