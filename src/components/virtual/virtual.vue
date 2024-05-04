<template>
  <div class="popup-wrap">
    <div class="popup-title">
      <h1>{{ stockInfo.itmsNm }}</h1>
    </div>
    <ul v-if="tradeType === 'buy'" class="popup-list-wrap">
      <li class="popup-tab-list bgRed" @click="tradeType='buy'">
        매수
      </li>
      <li class="popup-tab-list" @click="tradeType='sell'">
        매도
      </li>
    </ul>
    <ul v-if="tradeType === 'sell'" class="popup-list-wrap">
      <li class="popup-tab-list" @click="tradeType='buy'">
        매수
      </li>
      <li class="popup-tab-list bgBlue" @click="tradeType='sell'">
        매도
      </li>
    </ul>
    <div class="popup-field-wrap">
      <s-text-field
        v-model.number="quantity"
        label="주문수량"
        placeholder="몇 주를 구매하실지 입력해주세요!"
        value="1"
        class="virtual-popup-count"
        type="number"
        :required="true"
        @input="updateQuantity"
      />
      <s-text-field
        label="금액"
        :disabled="true"
        :value="stockInfo.priceInfo?.clpr"
        class="virtual-popup-won"
        type="number"
        :required="true"
      />
      <s-text-field
        label="주문 총액"
        :disabled="true"
        :value="totalAmountValue"
        class="virtual-popup-won"
        type="number"
        :required="true"
      />
      <s-button v-if="tradeType === 'buy'" class="kbtn-line-solid v-btn--right w-100 bgRed">
        매수
      </s-button>
      <s-button v-if="tradeType === 'sell'" class="kbtn-line-solid v-btn--right w-100 bgBlue">
        매도
      </s-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, namespace, Prop, Vue } from 'nuxt-property-decorator'
import { commonStore } from '~/util/store-accessor'
import { Namespace } from '~/util/Namespace'
import { IUserDetail } from '~/types/auth/auth'
import { getDetail } from '~/api/stock'
import STextArea from '~/components/common/STextArea.vue'
import STextField from '~/components/common/STextField.vue'
import SButton from '~/components/common/SButton.vue'
import { ISpoBoard } from '~/types/board/board'
import { IStockInfo } from '~/types/details/details'

const common = namespace(Namespace.COMMON)
@Component({
  layout: 'empty',
  components: { SButton, STextField }
})
export default class Popup extends Vue {
  private stockInfo = {} as IStockInfo
  @Prop() private readonly stockInfoSequence!: number
  private quantity = 1
  private totalAmountValue = 0

  created() {
    this.getDetail()
  }

  private tradeType = 'buy'
  private async getDetail() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    this.stockInfo = await getDetail(this.stockInfoSequence)
    this.totalAmountValue = this.stockInfo.priceInfo?.clpr
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  }

  private totalAmount() {
    const amount = this.quantity * (this.stockInfo.priceInfo?.clpr || 0)
    return amount
  }

  private updateQuantity() {
    this.totalAmountValue = this.totalAmount()
  }
}
</script>
