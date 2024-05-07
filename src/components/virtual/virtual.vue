<template>
  <div class="popup-wrap">
    <div class="popup-title">
      <h1>{{ virtualStockInfo.itmsNm }}</h1>
    </div>
    <div v-if="tradeType === 'buy'" class="popup-content">
      <ul class="popup-list-wrap">
        <li class="popup-tab-list bgRed" @click="tradeType='buy'">
          매수
        </li>
        <li class="popup-tab-list" @click="tradeType='sell'">
          매도
        </li>
      </ul>
      <div class="popup-field-wrap">
        <s-text-field
          v-model="quantity"
          label="주문수량"
          placeholder="몇 주를 구매하실지 입력해주세요!"
          class="virtual-popup-count"
          type="number"
          :required="true"
          @input="updateQuantity"
        />
        <s-text-field
          v-model="priceInfoClpr"
          label="금액"
          :disabled="true"
          class="virtual-popup-won"
          type="number"
          :required="true"
        />
        <s-text-field
          v-model="totalAmountValue"
          label="매수 총액"
          :disabled="true"
          class="virtual-popup-won"
          type="number"
          :required="true"
        />
        <s-button class="kbtn-line-solid v-btn--right w-100 bgRed" @click="buyStock(userSequence)">
          매수
        </s-button>
      </div>
    </div>
    <div v-if="tradeType === 'sell'" class="popup-content">
      <ul class="popup-list-wrap">
        <li class="popup-tab-list" @click="tradeType='buy'">
          매수
        </li>
        <li class="popup-tab-list bgBlue" @click="tradeType='sell'">
          매도
        </li>
      </ul>

      <div class="popup-field-wrap">
        <s-text-field
          v-model="quantity"
          label="주문수량"
          placeholder="몇 주를 판매하실지 입력해주세요!"
          class="virtual-popup-count"
          type="number"
          :required="true"
          @input="updateQuantity"
        />
        <s-text-field
          v-model="priceInfoClpr"
          label="금액"
          :disabled="true"
          class="virtual-popup-won"
          type="number"
          :required="true"
        />
        <s-text-field
          v-model="totalAmountValue"
          label="매도 총액"
          :disabled="true"
          class="virtual-popup-won"
          type="number"
          :required="true"
        />
        <s-button class="kbtn-line-solid v-btn--right w-100 bgBlue" @click="sellStock(userSequence)">
          매도
        </s-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, namespace, Prop, Vue } from 'nuxt-property-decorator'
import { Namespace } from '~/util/Namespace'
import STextField from '~/components/common/STextField.vue'
import SButton from '~/components/common/SButton.vue'
import StringUtil from '~/util/StringUtil'
import { buyVirtual, getVirtualDetail, getVirtualUser, sellVirtual } from '~/api/virtual'
import {
  IBuyStockInvestmentReq,
  ISellStockInvestmentReq,
  ISpoUserInvestmentStock,
  IVirtualStockDetail
} from '~/types/virtual/virtual'
import { commonStore } from '~/util/store-accessor'

const common = namespace(Namespace.COMMON)
@Component({
  layout: 'empty',
  components: { SButton, STextField }
})
export default class Popup extends Vue {
  private virtualStockInfo = {} as IVirtualStockDetail
  private userInvestmentStock = [] as Array<ISpoUserInvestmentStock>
  @Prop() private readonly stockInfoSequence!: number
  @Emit('close')
  private onClose() {
    return this.getDetail()
  }

  private priceInfoClpr = 0
  private totalAmountValue = 0
  private quantity = '1'
  private userSequence = 0

  private formData = {
    stockInfoSequence: this.stockInfoSequence,
    quantity: 0
  } as IBuyStockInvestmentReq

  created() {
    this.getDetail()
    this.userSequence = Number(this.$route.query.userSequence)
  }

  private tradeType = 'buy'

  private async getDetail() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    this.virtualStockInfo = await getVirtualDetail(this.stockInfoSequence)
    this.totalAmountValue = this.virtualStockInfo.clpr
    this.priceInfoClpr = this.virtualStockInfo.clpr
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  }

  private totalAmount() {
    return parseInt(this.quantity) * (this.virtualStockInfo.clpr || 0)
  }

  private updateQuantity() {
    this.totalAmountValue = this.totalAmount()
  }

  private async buyStock(userSequence:number) {
    if (StringUtil.isEmpty(this.formData.quantity)) {
      return false
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    this.formData.quantity = parseInt(this.quantity)
    const response: IBuyStockInvestmentReq = await buyVirtual(this.formData)

    if (StringUtil.isNotEmpty(response)) {
      commonStore.ADD_DIALOG({
        id: 'BUY',
        text: '매수되었습니다!',
        callback: async () => {
          await this.onClose()
        }
      })
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  }

  private async sellStock(userSequence:number) {
    if (StringUtil.isEmpty(this.formData.quantity)) {
      return false
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    this.formData.quantity = parseInt(this.quantity)
    const response: ISellStockInvestmentReq = await sellVirtual(this.formData)
    if (StringUtil.isNotEmpty(response)) {
      commonStore.ADD_DIALOG({
        id: 'SELL',
        text: '매도되었습니다!',
        callback: async () => {
          await this.$router.push(`/virtual/virtual?userSequence=${userSequence}`)
        }
      })
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  }
}
</script>
