<template>
  <div class="popup-wrap">
    <div class="popup-title">
      <h1>삼성전자</h1>
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
        label="주문수량"
        placeholder="몇 주를 구매하실지 입력해주세요!"
        value="1"
        class="virtual-popup-count"
        type="number"
        :required="true"
      />
      <s-text-field
        label="금액"
        :disabled="true"
        value="0"
        class="virtual-popup-won"
        type="number"
        :required="true"
      />
      <s-text-field
        label="주문 총액"
        :disabled="true"
        value="0"
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

import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { commonStore } from '~/util/store-accessor'
import { Namespace } from '~/util/Namespace'
import { IUserDetail } from '~/types/auth/auth'
import STextArea from '~/components/common/STextArea.vue'
import STextField from '~/components/common/STextField.vue'
import SButton from '~/components/common/SButton.vue'

const common = namespace(Namespace.COMMON)
@Component({
  layout: 'empty',
  components: { SButton, STextField }
})
export default class Popup extends Vue {
  /********************************************************************************
   * Method (Event, Business Logic)
   ********************************************************************************/
  private tradeType = 'buy'
}

</script>
