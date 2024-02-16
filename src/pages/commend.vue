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
                전년도 재무제표와 손익계산서, 최근 주가현황 등 분석해서 높은 점수를 받은 종목들이에요 🙈🙉
              </div>
            </div>
          </div>
          <div class="commend-wrap-tit">
            <div class="commend-title-wrap">
              <h3>추천 종목</h3>
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
              <td>시가총액</td>
              <td>즐겨찾기</td>
            </tr>
            <tr>
              <td>a</td>
              <td>a</td>
              <td>a</td>
              <td>a</td>
              <td>a</td>
              <td>
                <img src="~/assets/image/colorstar.png">
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
              <td>시가총액</td>
              <td>즐겨찾기</td>
            </tr>
            <tr>
              <td>b</td>
              <td>b</td>
              <td>b</td>
              <td>b</td>
              <td>b</td>
              <td>
                <img src="~/assets/image/colorstar.png">
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Emit, namespace, Prop, Vue } from 'nuxt-property-decorator'
import SToolTip from '~/components/common/SToolTip.vue'
import SButton from '~/components/common/SButton.vue'
import { ILongInvestment, IPopularStock, IShortInvestment } from '~/types/home/home'
import { UpdateInterestStock } from '~/api/stock'
import StringUtil from '~/util/StringUtil'
import { commonStore } from '~/util/store-accessor'
import { Namespace } from '~/util/Namespace'

@Component({
  layout: 'empty',
  components: { SButton }
})
export default class Commend extends Vue {
  /********************************************************************************
   * Properties
   ********************************************************************************/
  @Prop() private readonly shortInvestment!: Array<IShortInvestment>
  @Prop() private readonly longInvestment!: Array<ILongInvestment>

  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  private orders: string[] = ['short', 'long']
  private currentOrderIndex = 0

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
