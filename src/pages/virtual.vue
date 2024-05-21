<template>
  <div id="container" class="line">
    <div class="content dynamic-layout">
      <div class="rank-wrap">
        <div class="commend-wrap w-100">
          <div class="virtual-main">
            <div class="virtual-info">
              <div class="virtual-wrap">
                <div class="virtual-item-wrap">
                  <div class="virtual-item">
                    <span class="item-label">평가 금액</span>
                    <h1 class="item-label">
                      {{ virtualInfo.valueAmount | setNumberComma }}
                    </h1>
                  </div>
                  <div class="virtual-item">
                    <span class="item-label">수익률</span>
                    <span class="item-rate" :class="{minus: virtualInfo.userFltRt < 0, plus: virtualInfo.userFltRt > 0}"><em>{{ virtualInfo.userFltRt }}</em></span>
                  </div>
                </div>
                <div class="virtual-item-wrap">
                  <div class="virtual-item">
                    <span class="item-label">보유 금액</span>
                    <span class="item-label">
                      {{ virtualInfo.amount | setNumberComma }}
                    </span>
                  </div>
                  <div class="virtual-item">
                    <span class="item-label">매수 금액</span>
                    <span class="item-label">
                      {{ virtualInfo.buyAmount | setNumberComma }}
                    </span>
                  </div>
                  <div class="virtual-item">
                    <span class="item-label">매매 손익:</span>
                    <span class="item-label">
                      <span class="item-rate" :class="{minus: virtualInfo.userFltRt < 0, plus: virtualInfo.userFltRt > 0}">{{ virtualInfo.profitLossSales | setNumberComma }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="virtual-wrap-tit">
              <div class="virtual-title-wrap">
                <h3>개인추천 종목</h3>
              </div>
            </div>
            <userpick v-if="StringUtil.isNotEmpty(pickList)" :user-pick="pickList" />
            <s-popup
              v-if="virtualPopup"
              close-btn
              persistent
              :title="'매수 / 매도'"
              @close="virtualPopup = false"
            >
              <Popup
                :stock-info-sequence="stockInfoSequence"
                @close="initVirtual()"
              />
            </s-popup>
            <div class="virtual-wrap-tit">
              <div class="virtual-title-wrap">
                <h3>매수 종목</h3>
                <s-tool-tip class="virtual-wrap-tit-tool" detail="데이터 갱신은 매수/매도 후 익일 15시30분 이후 5분마다 갱신돼요." />
              </div>
              <div class="virtual-search-wrap">
                <div class="mr-2 table-field">
                  <s-text-field
                    v-model="search"
                    placeholder="종목명 검색"
                    class="virtual-search"
                    :single-line="true"
                    :hide-details="true"
                    :append-icon="true"
                    @input="searchStock"
                  />
                </div>
              </div>
            </div>
            <div class="search-list-wrap">
              <v-list v-if="searchStockValue && StringUtil.isNotEmpty(search)" class="search-list">
                <v-list-item
                  v-for="(item, index) in searchStockValue"
                  :key="index"
                  class="search-list-item"
                  :virtual-popup="virtualPopup"
                  @click="virtualOnclick(item.stockInfoSequence)"
                >
                  <v-list-item-title>
                    {{ item.itmsNm }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </div>
            <s-data-table v-if="userInvestmentStock" :headers="headers" :items="userInvestmentStock" :is-search="false">
              <template #itmsNm="{item}">
                <div class="itms-name" @click="onClickToDetails(item.stockInfoSequence)">
                  {{ item.itmsNm }}
                </div>
              </template>
              <template #quantity="{item}">
                {{ item.quantity }}
              </template>
              <template #itemValueAmount="{item}">
                {{ item.itemValueAmount | setNumberComma }}
              </template>
              <template #itemBuyAmount="{item}">
                {{ item.itemBuyAmount | setNumberComma }}
              </template>
              <template #itemProfit="{item}">
                <span class="item-rate" :class="{minus: virtualInfo.userFltRt < 0, plus: virtualInfo.userFltRt > 0}">{{ item.itemProfit | setNumberComma }}</span>
              </template>
              <template #itemFltRt="{item}">
                <span class="item-rate" :class="{minus: virtualInfo.userFltRt < 0, plus: virtualInfo.userFltRt > 0}">{{ item.itemFltRt }}</span>
              </template>
              <template #averageAmount="{item}">
                {{ item.averageAmount | setNumberComma }}
              </template>
              <template #매수매도="{ item }">
                <s-button @click="virtualOnclick(item.stockInfoSequence)">
                  매수/매도
                </s-button>
              </template>
            </s-data-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, namespace, Prop, Vue } from 'nuxt-property-decorator'
import _ from 'lodash'
import { Namespace } from '~/util/Namespace'
import SDataTable from '~/components/common/SDataTable.vue'
import { ISelectUserInvestmentStart, ISpoUserInvestment, ISpoUserInvestmentStock } from '~/types/virtual/virtual'
import StringUtil from '~/util/StringUtil'
import { commonStore } from '~/util/store-accessor'
import { getVirtualUser, startInvestmentYn, startVirtual, UserInvestmentInfo } from '~/api/virtual'
import { IDataTableHeader } from '~/types/common'
import STextField from '~/components/common/STextField.vue'
import { IInterest, ISearchStockInfo } from '~/types/home/home'
import { Stock } from '~/api/stock'
import SToolTip from '~/components/common/SToolTip.vue'
import SPopup from '~/components/common/SPopup.vue'
import Rank from '~/components/home/Rank.vue'
import Popup from '~/components/virtual/virtual.vue'
import Interest from '~/components/home/Interest.vue'
import UserPick from '~/components/userpick/Userpick.vue'
import { ICommendPersonalStock } from '~/types/user/user'
import SButton from '~/components/common/SButton.vue'

const common = namespace(Namespace.COMMON)
@Component({
  layout: 'empty',
  components: { SButton, Rank, SToolTip, STextField, SDataTable, SPopup, Popup, UserPick },
})
export default class Virtual extends Vue {
  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/
  private virtualInfo = {} as ISpoUserInvestment
  private userInvestmentStock = [] as Array<ISpoUserInvestmentStock>
  private startInvestmentYn = {} as ISelectUserInvestmentStart
  private searchStockValue = [] as Array<ISearchStockInfo>
  private userInfoSequence = 0
  private isInitialized = false
  private virtualPopup = false
  private search = ''
  private stockInfoSequence = 0
  private userSequence = 0
  @common.State private stockList!: Array<ISearchStockInfo>
  @common.State private token!: string
  @common.State private pickList!: Array<ICommendPersonalStock>

  private headers = [
    { text: '종목명', value: 'itmsNm', align: 'center', width: 100, isSlot: true },
    { text: '보유수량', value: 'quantity', align: 'center', width: 110, isSlot: false },
    { text: '평가금액', value: 'itemValueAmount', align: 'center', width: 200, isSlot: true },
    { text: '매수금액', value: 'itemBuyAmount', align: 'center', width: 120, isSlot: true },
    { text: '손익', value: 'itemProfit', align: 'center', width: 120, isSlot: true },
    { text: '수익률', value: 'itemFltRt', align: 'center', width: 150, isSlot: true },
    { text: '평균단가', value: 'averageAmount', align: 'center', width: 110, isSlot: true },
    { text: '매수 / 매도', value: '매수매도', align: 'center', width: 130, isSlot: true }
  ] as Array<IDataTableHeader>

  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  async created() {
    const response: ISelectUserInvestmentStart = await startInvestmentYn()
    if (StringUtil.isNotEmpty(response)) {
      if (response.startInvestmentYn === 'Y') {
        commonStore.ADD_DIALOG({
          id: 'START VIRTUAL',
          text: '가상 투자금액 1,000,000원이 입금됐어요.'
        })
        if (!this.isInitialized) {
          await startVirtual({ startInvestmentYn: 'N' })
          this.isInitialized = true
        }
      }
      await this.initVirtual()
    }

    // this.initCommend()
  }

  /********************************************************************************
   * Method (Event, Business Logic)
   ********************************************************************************/

  private async initVirtual() {
    this.userInfoSequence = Number(this.$route.query.userSequence)
    this.userSequence = Number(this.$route.query.userSequence)
    await this.getVirtual()
    this.virtualPopup = false
  }

  private async getVirtual() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    this.virtualInfo = await UserInvestmentInfo(this.userInfoSequence)
    this.userInvestmentStock = await getVirtualUser(this.userSequence)

    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  }

  private initCommend() {}

  private getStock() {
    Stock().then((response: Array<ISearchStockInfo>) => {
      commonStore.ADD_STOCK_LIST(response)
    })
  }

  private searchStock() {
    const lowerCaseSearch = this.search.toLowerCase()
    this.searchStockValue = _.filter(this.stockList, (item: ISearchStockInfo) => {
      return item.itmsNm.toLowerCase().includes(lowerCaseSearch)
    })
  }

  private stockDetail(stockInfoSequence: number) {
    commonStore.CHECK_LOGIN()
    if (this.token) {
      this.search = ''
      this.$router.push({
        name: 'detail',
        query: {
          stockInfoSequence: stockInfoSequence.toString()
        }
      })
    }
  }

  private virtualOnclick(stockInfoSequence:number) {
    this.stockInfoSequence = stockInfoSequence
    this.virtualPopup = true
  }

  private onClickToDetails(stockInfoSequence: number) {
    this.$router.push({
      name: 'detail',
      query: {
        stockInfoSequence: stockInfoSequence.toString()
      }
    })
  }
}

</script>
