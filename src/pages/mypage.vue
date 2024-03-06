<template>
  <div id="container" class="line">
    <div class="content dynamic-layout">
      <div class="rankWrap">
        <div class="commendWrap w-100">
          <div class="mypage-main">
            <div class="profile-section ">
              <h4>내 정보</h4>
              <div class="profile-info">
                <div class="profile-wrap">
                  <div class="profile-item">
                    <span class="item-label">닉네임:</span>
                    <span id="nickname" class="item-value">{{ userinfo.nickName }}</span>
                  </div>
                  <div class="profile-item">
                    <span class="item-label">투자성향:</span>
                    <span id="investment-preference" class="item-value">{{ userinfo.investPropensity }}</span>
                  </div>
                  <div class="profile-item">
                    <span class="item-label">가입일:</span>
                    <span id="join-date" class="item-value">{{ userinfo.createdAt | dateTimeString }}</span>
                  </div>
                  <div class="profile-item">
                    <span class="item-label">생년월일:</span>
                    <span id="birthdate" class="item-value">{{ userinfo.dateOfBirth }}</span>
                  </div>
                  <div class="profile-item">
                    <span class="item-label">이메일:</span>
                    <span id="email" class="item-value">{{ userinfo.email }}</span>
                  </div>
                </div>
                <div class="profile-wrap">
                  <div class="profile-item profile-btn-wrap">
                    <button class="nickname-button">
                      닉네임 변경
                    </button>
                    <button class="password-button">
                      비밀번호 변경
                    </button>
                    <button class="withdraw-button">
                      회원탈퇴
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="profile-section">
              <h4>내 관심종목</h4>
              <table>
                <tr>
                  <th>종목명</th>
                  <th>전일종가</th>
                  <th>등락률</th>
                  <th>시가총액</th>
                </tr>
                <!--                <tr v-for="(item, idx) in userinfo.interest" :key="idx">-->
                <!--                  <td>{{ item.itmsNm }}</td>-->
                <!--                  <td>{{ item.clpr | setNumberComma }}</td>-->
                <!--                  <td v-if="item.fltRt === 0">-->
                <!--                    {{ item.fltRt }}-->
                <!--                  </td>-->
                <!--                  <td v-else :class="{minus: item.fltRt < 0, plus: item.fltRt > 0}">-->
                <!--                    {{ item.fltRt }}-->
                <!--                  </td>-->
                <!--                  <td>{{ item.mrktTotAmt | setKoreanNumber }}</td>-->
                <!--                </tr>-->
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { InterestStockItem, ISelectMyInfoRes } from '~/types/user/user'
import { getInterestStockItem } from '~/api/stock'
import StringUtil from '~/util/StringUtil'
import { IInterest } from '~/types/home/home'

// const common = namespace(Namespace.COMMON)
@Component({
  computed: {
    StringUtil() {
      return StringUtil
    }
  },
  layout: 'empty',
})
export default class extends Vue {
  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/
  private userinfo = {} as ISelectMyInfoRes
  private userinfoSequence = 0
  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  async created() {
    this.userinfoSequence = Number(this.$route.query.userSequence)
    await this.getInterestStockItem()
  }

  //
  private async getInterestStockItem() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    this.userinfo = await getInterestStockItem(this.userinfoSequence)
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  }
}

</script>
