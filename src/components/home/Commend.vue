<template>
  <div class="commendWrap">
    <div class="commend-wrap-tit">
      <div class="commend-title-wrap">
        <h3>추천 종목</h3>
        <s-tool-tip class="commend-wrap-tit-tool" detail="SPO에서 직접 기업을 평가하여 추천해주고 있어요." />
      </div>
      <div class="commend-btn-wrap">
        <s-button @click="changeOrder('shortBtn')">
          단기추천
        </s-button>
        <s-button @click="changeOrder('longBtn')">
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
      <tr>
        <td>1</td>
        <td>3S</td>
        <td>4,100</td>
        <td>+0.37</td>
        <td>58,962,730</td>
        <td>2조 6,482억</td>
        <td><img :src="currentImage" alt="favorites" @click="favoritesList()"></td>
      </tr>
      <tr>
        <td>2</td>
        <td>에이피알</td>
        <td>364,000</td>
        <td>+3.7%</td>
        <td>13,139</td>
        <td>2조 6,482억</td>
        <td><img :src="currentImage" alt="favorites" @click="favoritesList()"></td>
      </tr>
      <tr>
        <td>3</td>
        <td>두나무</td>
        <td>115,000</td>
        <td>-10.16%</td>
        <td>68,336</td>
        <td>4조 14억</td>
        <td><img :src="currentImage" alt="favorites" @click="favoritesList()"></td>
      </tr>
      <tr>
        <td>4</td>
        <td>야놀자</td>
        <td>45,600</td>
        <td>-0.44%</td>
        <td>20,910</td>
        <td>4조 6,064억</td>
        <td><img :src="currentImage" alt="favorites" @click="favoritesList()"></td>
      </tr>
      <tr>
        <td>5</td>
        <td>컬리</td>
        <td>13,200</td>
        <td>-2.22%</td>
        <td>9,890</td>
        <td>5,399억</td>
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
      <tr>
        <td>1</td>
        <td>3S</td>
        <td>4,100</td>
        <td>+0.37</td>
        <td>58,962,730</td>
        <td>2조 6,482억</td>
        <td><img :src="currentImage" alt="favorites" @click="favoritesList()"></td>
      </tr>
      <tr>
        <td>2</td>
        <td>에이피알</td>
        <td>364,000</td>
        <td>+3.7%</td>
        <td>13,139</td>
        <td>2조 6,482억</td>
        <td><img :src="currentImage" alt="favorites" @click="favoritesList()"></td>
      </tr>
      <tr>
        <td>3</td>
        <td>두나무</td>
        <td>115,000</td>
        <td>-10.16%</td>
        <td>68,336</td>
        <td>4조 14억</td>
        <td><img :src="currentImage" alt="favorites" @click="favoritesList()"></td>
      </tr>
      <tr>
        <td>4</td>
        <td>야놀자</td>
        <td>45,600</td>
        <td>-0.44%</td>
        <td>20,910</td>
        <td>4조 6,064억</td>
        <td><img :src="currentImage" alt="favorites" @click="favoritesList()"></td>
      </tr>
      <tr>
        <td>5</td>
        <td>컬리</td>
        <td>13,200</td>
        <td>-2.22%</td>
        <td>9,890</td>
        <td>5,399억</td>
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

import { Component, Vue } from 'nuxt-property-decorator'
import SToolTip from '~/components/common/SToolTip.vue'
import SButton from '~/components/common/SButton.vue'

@Component({
  layout: 'empty',
  components: { SToolTip, SButton }
})
export default class Commend extends Vue {
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
