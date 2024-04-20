<template>
  <div class="ranking-wrap">
    <div class="ranking-title-wrap">
      <h3>가상투자 랭킹</h3>
    </div>
    <ul class="ranking-list-wrap">
      <li class="ranking-list">
        <div class="ranking-list-item">
          <h1 class="ranking-rank">
            1
          </h1>
          <div class="ranking-name">
            한세운
          </div>
          <div class="ranking-details">
            <p>손익: 20,000</p>
            <p>수익률: <span class="textRed">+1.2%</span></p>
          </div>
        </div>
      </li>
      <li class="ranking-list">
        <div class="ranking-list-item">
          <h1 class="ranking-rank">
            2
          </h1>
          <div class="ranking-name">
            정필선
          </div>
          <div class="ranking-details">
            <p>손익: 120,000</p>
            <p>수익률: <span class="textRed">+1.2%</span></p>
          </div>
        </div>
      </li>
      <li class="ranking-list">
        <div class="ranking-list-item">
          <h1 class="ranking-rank">
            3
          </h1>
          <div class="ranking-name">
            김성욱
          </div>
          <div class="ranking-details">
            <p>손익: 1,220,000</p>
            <p>수익률: <span class="textRed">+1.2%</span></p>
          </div>
        </div>
      </li>
      <li class="ranking-list">
        <div class="ranking-list-item">
          <h1 class="ranking-rank">
            4
          </h1>
          <div class="ranking-name">
            이선용
          </div>
          <div class="ranking-details">
            <p>손익: 2,220,000</p>
            <p>수익률: <span class="textRed">+1.2%</span></p>
          </div>
        </div>
      </li>
      <li class="ranking-list">
        <div class="ranking-list-item">
          <h1 class="ranking-rank">
            5
          </h1>
          <div class="ranking-name">
            송지호
          </div>
          <div class="ranking-details">
            <p>손익: 100,020,000</p>
            <p>수익률: <span class="textBlue">-2.3%</span></p>
          </div>
        </div>
      </li>
      <li class="ranking-list">
        <a @click="onClickToMockInvestment(userInfo.userSequence)">가상투자 바로가기</a>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">

import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { commonStore } from '~/util/store-accessor'
import { Namespace } from '~/util/Namespace'
import { IUserDetail } from '~/types/auth/auth'

const common = namespace(Namespace.COMMON)
@Component({
  layout: 'empty',
  components: {}
})
export default class ranking extends Vue {
  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/

  @common.State private token!: string
  @common.State private userInfo!: IUserDetail

  /********************************************************************************
   * Method (Event, Business Logic)
   ********************************************************************************/

  private onClickToMockInvestment(userSequence: number) {
    commonStore.CHECK_LOGIN()
    if (this.token) {
      this.$router.push(`/?userSequence=${userSequence}`)
    }
  }
}

</script>
