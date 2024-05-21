<template>
  <div class="ranking-wrap">
    <div class="ranking-title-wrap">
      <h3>가상투자 랭킹</h3>
    </div>
    <ul class="ranking-list-wrap">
      <li v-for="(item, idx) in investmentRank" :key="idx" class="ranking-list">
        <div class="ranking-list-item">
          <h1 class="ranking-rank">
            {{ idx + 1 }}
          </h1>
          <div class="ranking-name">
            {{ item.nickName }}
          </div>
          <div class="ranking-details">
            <p v-if="item.profitLossSales === 0">
              {{ item.profitLossSales | setNumberComma }}원
            </p>
            <p v-else :class="{minus: item.profitLossSales < 0, plus: item.profitLossSales > 0}">
              {{ item.profitLossSales | setNumberComma }}원
            </p>
            <p v-if="item.userFltRt === 0">
              {{ item.userFltRt }}%
            </p>
            <p v-else :class="{minus: item.userFltRt < 0, plus: item.userFltRt > 0}">
              {{ item.userFltRt }}%
            </p>
          </div>
        </div>
      </li>
      <li class="ranking-list">
        <a @click="onClickToVirtual(userInfo.userSequence)">가상투자 바로가기</a>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">

import { Component, namespace, Prop, Vue } from 'nuxt-property-decorator'
import { commonStore } from '~/util/store-accessor'
import { Namespace } from '~/util/Namespace'
import { IUserDetail } from '~/types/auth/auth'
import { InvestmentRank } from '~/api/virtual'
import { IStockRank } from '~/types/virtual/virtual'

const common = namespace(Namespace.COMMON)
@Component({
  methods: { InvestmentRank },
  layout: 'empty',
  components: {}
})
export default class ranking extends Vue {
  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/
  @Prop() private readonly investmentRank!: Array<IStockRank>
  @common.State private token!: string
  @common.State private userInfo!: IUserDetail

  /********************************************************************************
   * Method (Event, Business Logic)
   ********************************************************************************/

  private onClickToVirtual(userSequence: number) {
    commonStore.CHECK_LOGIN()
    if (this.token) {
      this.$router.push(`/virtual?userSequence=${userSequence}`)
    }
  }
}

</script>
