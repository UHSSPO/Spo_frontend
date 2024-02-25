<template>
  <div class="commendWrap">
    <div class="commend-wrap-tit">
      <div class="commend-title-wrap">
        <h3>추천 종목</h3>
        <s-tool-tip class="commend-wrap-tit-tool" detail="SPO에서 직접 기업을 평가하여 추천해주고 있어요." />
      </div>
      <div class="commend-btn-wrap">
        <s-button :class="{click : currentOrderIndex === 0 }" @click="changeOrder('short')">
          단기추천
        </s-button>
        <s-button :class="{click : currentOrderIndex === 1 }" @click="changeOrder('long')">
          장기추천
        </s-button>
      </div>
    </div>

    <table v-if="currentOrder === 'short'" class="commendRank">
      <tr>
        <td />
        <td>종목명</td>
        <td>전일종가</td>
        <td>등락률</td>
        <td>시가총액</td>
        <td>즐겨찾기</td>
      </tr>
      <tr v-for="(item, idx) in shortInvestment" :key="idx">
        <td>{{ idx+1 }}</td>
        <td>
          <a class="font-black" @click="onClickToDetails({num : item.stockInfoSequence})">{{ item.itmsNm }}</a>
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
      <tr>
        <td colspan="7" @click="onclickToCommend()">
          <span class="more">더보기</span>
        </td>
      </tr>
    </table>
    <table v-else-if="currentOrder === 'long'" class="commendRank">
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
        <td>
          <a class="font-black" @click="onClickToDetails({num : item.stockInfoSequence})">{{ item.itmsNm }}</a>
        </td>
        <td>{{ item.clpr | setNumberComma }}</td>
        <td v-if="item.fltRt === 0">
          {{ item.fltRt }}
        </td>
        <td v-else :class="{minus: item.fltRt < 0, plus: item.fltRt > 0}">
          {{ item.fltRt }}
        </td>
        <td>{{ item.trqu | setNumberComma }}</td>
        <td>{{ item.mrktTotAmt | setKoreanNumber }}</td>
        <td>
          <img v-if="item.interestStockYn === Globals.NO" src="~/assets/image/star.png" alt="favorites" @click="favoritesList(item.stockInfoSequence)">
          <img v-else src="~/assets/image/colorstar.png" alt="favorites" @click="favoritesList(item.stockInfoSequence)">
        </td>
      </tr>
      <tr>
        <td colspan="7" @click="onclickToCommend()">
          <span class="more">더보기</span>
        </td>
      </tr>
    </table>
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

const common = namespace(Namespace.COMMON)

@Component({
  layout: 'empty',
  components: { SToolTip, SButton }
})
export default class Commend extends Vue {
  /********************************************************************************
   * Properties
   ********************************************************************************/
  @Prop() private readonly shortInvestment!: Array<IShortInvestment>
  @Prop() private readonly longInvestment!: Array<ILongInvestment>
  @common.State private token!: string

  @Emit('init')
  private initCommend() {
    return false
  }

  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  private orders: string[] = ['short', 'long']
  private currentOrderIndex = 0

  get currentOrder(): string {
    return this.orders[this.currentOrderIndex]
  }

  private async favoritesList(stockInfoSequence: number) {
    if (StringUtil.isEmpty(this.token)) {
      commonStore.ADD_DIALOG({
        id: 'ERROR',
        text: '로그인이 필요한 서비스입니다!'
      })
      return false
    } else {
      this.$nuxt.$loading.start()
      const response = await UpdateInterestStock(stockInfoSequence)
      if (StringUtil.isNotEmpty(response)) {
        this.initCommend()
      }
      this.$nuxt.$loading.finish()
    }
  }

  changeOrder(direction: string): void {
    if (direction === 'short') {
      this.currentOrderIndex = 0
    } else if (direction === 'long') {
      this.currentOrderIndex = 1
    }
  }

  private onclickToCommend() {
    if (StringUtil.isEmpty(this.token)) {
      commonStore.ADD_DIALOG({
        id: 'ERROR',
        text: '로그인이 필요한 서비스입니다!'
      })
    } else {
      this.$router.push({
        name: 'commend',
        query: {
          currentOrderIndex: this.currentOrderIndex.toString()
        }
      })
    }
  }

  private onClickToDetails({ num }: { num: any }) {
    this.$router.push({
      name: 'details',
      query: {
        currentOrderIndex: num
      }
    })
  }
}

</script>
