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
                    <span class="item-label" :class="{minus: virtualInfo.userFltRt < 0, plus: virtualInfo.userFltRt > 0}"><em>{{ virtualInfo.userFltRt }}</em></span>
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
                      {{ virtualInfo.profitLossSales | setNumberComma }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <h1 v-for="(stock, index) in userInvestmentStock" :key="index">
              {{ stock.userInvestmentStockSequence }}
            </h1>
            <div class="virtual-wrap-tit">
              <div class="virtual-title-wrap">
                <h3>매수 종목</h3>
                <s-tool-tip class="virtual-wrap-tit-tool" detail="고객님께서 매수하신 종목이에요." />
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
                  @click="stockDetail(item.stockInfoSequence)"
                >
                  <v-list-item-title>
                    {{ item.itmsNm }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </div>
            <s-data-table v-if="userInvestmentStock" :headers="headers" :items="userInvestmentStock" :is-search="false" :search="search">
              <template #quantity="{item}">
                {{ item.quantity }}
              </template>
              <template #itemValueAmount="{item}">
                {{ item.itemValueAmount }}
              </template>
              <template #itemProfit="{item}">
                {{ item.itemProfit }}
              </template>
            </s-data-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import _ from 'lodash'
import { Namespace } from '~/util/Namespace'
import SDataTable from '~/components/common/SDataTable.vue'
import { ISelectUserInvestmentStart, ISpoUserInvestment, ISpoUserInvestmentStock } from '~/types/virtual/virtual'
import StringUtil from '~/util/StringUtil'
import { commonStore } from '~/util/store-accessor'
import { getVirtualUser, startInvestmentYn, startVirtual } from '~/api/virtual'
import { IDataTableHeader } from '~/types/common'
import { ISelectMyInfoRes } from '~/types/user/user'
import STextField from '~/components/common/STextField.vue'
import { ISearchStockInfo } from '~/types/home/home'
import { Stock } from '~/api/stock'
import SToolTip from '~/components/common/SToolTip.vue'

const common = namespace(Namespace.COMMON)
@Component({
  layout: 'empty',
  components: { SToolTip, STextField, SDataTable },
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
  private search = ''
  @common.State private stockList!: Array<ISearchStockInfo>

  @common.State private token!: string

  private headers = [
    { text: '보유수량', value: 'quantity', align: 'center', width: 100, isSlot: false },
    { text: '평가금액', value: 'itemValueAmount', align: 'center', width: 200, isSlot: false },
    { text: '매수금액', value: 'itemBuyAmount', align: 'center', width: 120, isSlot: true },
    { text: '손익', value: 'itemProfit', align: 'center', width: 120, isSlot: true },
    { text: '수익률', value: 'itemFltRt', align: 'center', width: 150, isSlot: true },
    { text: '평균단가', value: 'averageAmount', align: 'center', width: 100, isSlot: true },
    { text: '매수 / 매도', value: '<h1>ddd</h1>', align: 'center', width: 100, isSlot: true }
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
    await this.getVirtual()
  }

  private async getVirtual() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    this.virtualInfo = await getVirtualUser(this.userInfoSequence)
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
}

</script>
