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
                <div class="profile-wrap profile-grad-wrap">
                  <div class="profile-item profile-btn-wrap">
                    <button class="nickname-button">
                      닉네임 변경
                    </button>
                    <button class="password-button" @click="passwordShow">
                      비밀번호 변경
                    </button>
                    <button class="withdraw-button">
                      회원탈퇴
                    </button>
                  </div>
                  <div class="hide-form">
                    <div class="field-form">
                      <div class="password-wrap form-wrap">
                        <s-text-field
                          v-model="formData.beforePassword"
                          label="이전 비밀번호"
                          :required="true"
                          type="password"
                        />
                        <s-text-field
                          v-model="formData.afterPassword"
                          label="변경 할 비밀번호"
                          :required="true"
                          type="password"
                          :rules="[checkPassword]"
                          @keypress.enter.prevent="onClickChangePassword"
                        />
                        <s-text-field
                          v-model="checkPwd"
                          label="패스워드 재입력"
                          :required="true"
                          :rules="[checkSecondPassword]"
                          type="password"
                        />
                        <s-button class="s-button" @click="onClickChangePassword">
                          비밀번호 변경하기
                        </s-button>
                      </div>
                    </div>
                    <div class="password-form" />
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
import { IChangePasswordReqBody, InterestStockItem, ISelectMyInfoRes } from '~/types/user/user'
import { getInterestStockItem } from '~/api/stock'
import STextField from '~/components/common/STextField.vue'
import SButton from '~/components/common/SButton.vue'

// const common = namespace(Namespace.COMMON)
@Component({
  components: { SButton, STextField },
  layout: 'empty',
})
export default class extends Vue {
  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/
  private userinfo = {} as ISelectMyInfoRes
  private userinfoSequence = 0
  private formData = {
    beforePassword: '',
    afterPassword: ''
  } as IChangePasswordReqBody

  private checkPwd = ''

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

  private onClickChangePassword() {
    console.log('a')
  }

  private passwordShow() {
    console.log('a')
  }

  private checkPassword(value: string): boolean | string {
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/
    return regex.test(value) || '패스워드는 8자리 이상 특수문자 포함(?제외) 영문자 포함하여 입력 해주세요.'
  }

  private checkSecondPassword(value: string): boolean | string {
    return this.formData.afterPassword === value || '패스워드와 패스워드 재입력이 불일치 합니다.'
  }
}

</script>
