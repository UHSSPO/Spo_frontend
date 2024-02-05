<template>
  <div class="popularityWrap">
    <h3>인기 종목</h3>
    <table class="popularityRank">
      <tr>
        <td />
        <td>종목명</td>
        <td>전일종가</td>
        <td>등락률</td>
        <td>주문건</td>
        <td>시가총액(억)</td>
        <td>즐겨찾기</td>
      </tr>
      <tr v-for="(item, idx) in popularStock" :key="idx">
        <td>{{ idx+1 }}</td>
        <td>{{ item.itmsNm }}</td>
        <td>{{ item.clpr | setNumberComma }}</td>
        <td v-if="item.fltRt === 0">
          {{ item.fltRt }}
        </td>
        <td v-else :class="{minus: item.fltRt < 0, plus: item.fltRt > 0}">
          {{ item.fltRt }}
        </td>
        <td>{{ item.trqu | setNumberComma }}</td>
        <td>{{ item.mrktTotAmt | setKoreanNumber }}</td>
        <td><img :src="currentImage" alt="favorites" @click="favoritesList()"></td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { IMarketIndex, IPopularStock } from '~/types/home/home'

@Component({
  layout: 'empty',
  components: {}
})
export default class Popularity extends Vue {
    @Prop() private readonly popularStock!: Array<IPopularStock>
    /********************************************************************************
   * Life Cycle
   ********************************************************************************/
    created(): void {
      console.log('/popularity')
    }

    private isColorStar = true

    private get currentImage(): string {
      return this.isColorStar ? require('~/assets/image/star.png') : require('~/assets/image/colorstar.png')
    }

    private favoritesList(): void {
      this.isColorStar = !this.isColorStar
    }
}

</script>
