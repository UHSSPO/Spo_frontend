<template>
  <div class="interest-wrap" :class="{empty : StringUtil.isEmpty(token)}">
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
    <table v-else-if="interest.length === 0" class="blank">
      <div class="blank-area">
        <v-icon size="70">
          mdi-alert-circle-outline
        </v-icon>
        <span>
          즐겨찾기 종목을 추가해주세요!!
        </span>
      </div>
    </table>
    <table v-else>
      <tr>
        <td>종목명</td>
        <td>전일종가</td>
        <td>등락률</td>
        <td>시가총액</td>
      </tr>
      <tr v-for="(item, idx) in interest" :key="idx">
        <td>
          <a class="font-black" @click="onClickToDetails(item.stockInfoSequence)">{{ item.itmsNm }}</a>
        </td>
        <td>{{ item.clpr | setNumberComma }}</td>
        <td v-if="item.fltRt === 0">
          {{ item.fltRt }}
        </td>
        <td v-else :class="{minus: item.fltRt < 0, plus: item.fltRt > 0}">
          {{ item.fltRt }}
        </td>
        <td>{{ item.mrktTotAmt | setKoreanNumber }}</td>
      </tr>
      <tr>
        <td colspan="6">
          <a class="black--text" @click="onClickMypage(userInfo.userSequence)">더보기</a>
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
import StringUtil from '~/util/StringUtil'
import { commonStore } from '~/util/store-accessor'
import { IUserDetail } from '~/types/auth/auth'
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
  @common.State private userInfo!: IUserDetail

  private onClickSignUp() {
    this.$router.push('/auth/sign-up')
  }

  private onClickToDetails(stockInfoSequence: number) {
    commonStore.CHECK_LOGIN()
    if (this.token) {
      this.$router.push({
        name: 'detail',
        query: {
          stockInfoSequence: stockInfoSequence.toString()
        }
      })
    }
  }

  private onClickMypage(userInfo: number) {
    commonStore.CHECK_LOGIN()
    if (this.token) {
      this.$router.push({
        name: 'mypage',
      })
    }
  }
}

</script>
