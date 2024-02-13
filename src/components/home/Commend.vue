<template>
  <div class="commendWrap">
    <div class="commend-wrap-tit">
      <div class="commend-title-wrap">
        <h3>추천 종목</h3>
        <s-tool-tip class="commend-wrap-tit-tool" detail="SPO에서 직접 기업을 평가하여 추천해주고 있어요." />
      </div>
      <div class="commend-btn-wrap">
        <s-button :class="{click : currentOrderIndex === 0 }" @click="changeOrder('shortBtn')">
          단기추천
        </s-button>
        <s-button :class="{click : currentOrderIndex === 1 }" @click="changeOrder('longBtn')">
          장기추천
        </s-button>
      </div>
    </div>

    <table v-show="currentOrder === 'short'" class="commendRank">
      <tr>
        <td />
        <td>
          종목명
        </td>
        <td>전일종가</td>
        <td>등락률</td>
        <td>주문건</td>
        <td>시가총액</td>
        <td>즐겨찾기</td>
      </tr>
      <tr v-for="(item, idx) in shortInvestment" :key="idx">
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
      <tr>
        <td colspan="7">
          <a href="#">더보기</a>
        </td>
      </tr>
    </table>
    <table v-show="currentOrder === 'long'" class="commendRank">
      <tr>
        <td />
        <td>
          종목명
        </td>
        <td>전일종가</td>
        <td>등락률</td>
        <td>주문건</td>
        <td>시가총액</td>
        <td>즐겨찾기</td>
      </tr>
      <tr v-for="(item, idx) in longInvestment" :key="idx">
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
      <tr>
        <td colspan="7">
          <a href="#">더보기</a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'nuxt-property-decorator'
import SToolTip from '~/components/common/SToolTip.vue'
import SButton from '~/components/common/SButton.vue'
import { ILongInvestment, IPopularStock, IShortInvestment } from '~/types/home/home'

@Component({
  layout: 'empty',
  components: { SToolTip, SButton }
})
export default class Commend extends Vue {
  @Prop() private readonly shortInvestment!: Array<IShortInvestment>
  @Prop() private readonly longInvestment!: Array<ILongInvestment>

  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  private orders: string[] = ['short', 'long']
  private currentOrderIndex = 0

  private isColorStar = true

  private get currentImage(): string {
    return this.isColorStar ? require('~/assets/image/star.png') : require('~/assets/image/colorstar.png')
  }

  private favoritesList(): void {
    this.isColorStar = !this.isColorStar
  }

  get currentOrder(): string {
    return this.orders[this.currentOrderIndex]
  }

  changeOrder(direction: string): void {
    if (direction === 'shortBtn') {
      this.currentOrderIndex = 0
    } else if (direction === 'longBtn') {
      this.currentOrderIndex = 1
    }
  }
}

</script>
