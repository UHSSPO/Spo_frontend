<template>
  <div class="interestWrap" :class="{empty : StringUtil.isEmpty(token)}">
    <h3>나의 관심 종목</h3>
    <table v-if="StringUtil.isEmpty(token)" class="interestList">
      <div class="empty-area">
        <v-icon size="70">
          mdi-alert-circle-outline
        </v-icon>
        <span class="empty-area-tit">
          로그인 후 이용가능해요.
        </span>
        <span class="empty-area-txt">
          지금 바로 무료로 <a @click="onClickSignUp"> 회원가입 </a>
        </span>
      </div>
    </table>
    <table v-else>
      <tr>
        <td>종목명</td>
        <td>전일종가</td>
        <td>등락률</td>
        <td>주문건</td>
        <td>시가총액</td>
      </tr>
      <tr v-for="(item, idx) in interest" :key="idx">
        <td>{{ item.itmsNm }}</td>
        <td>{{ item.clpr | setNumberComma }}</td>
        <td v-if="item.fltRt === 0">
          {{ item.fltRt }}
        </td>
        <td v-else :class="{minus: item.fltRt < 0, plus: item.fltRt > 0}">
          {{ item.fltRt }}
        </td>
        <td>{{ item.trqu | setNumberComma }}</td>
        <td>{{ item.mrktTotAmt | setKoreanNumber }}</td>
      </tr>
      <tr>
        <td colspan="6">
          <span href="#">더보기</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">

import { Component, namespace, Prop, Vue } from 'nuxt-property-decorator'
import { IInterest } from '~/types/home/home'
import { Namespace } from '~/util/Namespace'
import SToolTip from '~/components/common/SToolTip.vue'
const common = namespace(Namespace.COMMON)
@Component({
  layout: 'empty',
  components: { SToolTip }
})

export default class Interest extends Vue {
  /********************************************************************************
   * Properties
   ********************************************************************************/
  @Prop() private readonly interest!: Array<IInterest>
  @common.State private token!: string
  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  created(): void {
    console.log('/commend')
  }

  private onClickSignUp() {
    this.$router.push('/auth/sign-up')
  }
}

</script>
