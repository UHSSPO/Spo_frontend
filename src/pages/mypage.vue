<template>
  <div id="container" class="line">
    <div class="content dynamic-layout">
      <div class="rank-wrap">
        <div class="commend-wrap w-100">
          <div class="commend-main-title">
            <div class="commend-main-area">
              <div class="commend-main-txt">
                프로필을 수정하거나 관심종목을 볼수있는 마이페이지에요. 🙈🙉
              </div>
            </div>
          </div>
          <div class="mypage-main">
            <div class="profile-section">
              <h4>내 정보</h4>
              <div class="profile-info">
                <div class="profile-wrap">
                  <div class="profile-item">
                    <span class="item-label">닉네임:</span>
                    <span id="nickname" class="item-value">{{ userInfo.nickName }}</span>
                  </div>
                  <div class="profile-item">
                    <span class="item-label">투자성향:</span>
                    <span v-if="userInfo.investPropensity === '01'" class="textGreen ">
                      안정형
                    </span>
                    <span v-else-if="userInfo.investPropensity === '02'" class="textBlue ">
                      안전추구형
                    </span>
                    <span v-else-if="userInfo.investPropensity === '03'" class="textYellow ">
                      위험중립형
                    </span>
                    <span v-else-if="userInfo.investPropensity === '04'" class="textOrange ">
                      적극투자형
                    </span>
                    <span v-else-if="userInfo.investPropensity === '05'" class="textRed">
                      공격투자형
                    </span>
                    <a v-if="!userInfo.investPropensity" id="investment-preference" @click="onClickToSurvey">성향분석 바로가기</a>
                  </div>
                  <div class="profile-item">
                    <span class="item-label">가입일:</span>
                    <span id="join-date" class="item-value">{{ userInfo.createdAt | dateTimeString }}</span>
                  </div>
                  <div class="profile-item">
                    <span class="item-label">생년월일:</span>
                    <span id="birthdate" class="item-value">{{ userInfo.dateOfBirth }}</span>
                  </div>
                  <div class="profile-item">
                    <span class="item-label">이메일:</span>
                    <span id="email" class="item-value">{{ userInfo.email }}</span>
                  </div>
                </div>
                <s-popup
                  v-if="userDeletePopup"
                  persistent
                  :title="'회원탈퇴'"
                  close-btn
                  @close="userDeletePopup = false"
                >
                  <p class="red--text flex-center ma-2 font-weight-bold">
                    회원탈퇴를 하면 재가입 하셔야 서비스 이용이 가능합니다.
                  </p>
                  <s-text-field
                    v-model="userPassword.password"
                    label="비밀번호"
                    placeholder="비밀번호를 입력해주세요!"
                    :required="true"
                    type="password"
                    class="mrl-5"
                  />
                  <div class="mypage-btn-wrap flex-center">
                    <s-button class="submit-button s-button ma-1" @click="onClickDelete">
                      확인
                    </s-button>
                    <s-button class="submit-button c-button ma-1" @click="closePopup">
                      취소
                    </s-button>
                  </div>
                </s-popup>
                <div class="profile-wrap profile-grad-wrap">
                  <div class="profile-item profile-btn-wrap">
                    <button class="nickname-button" @click="onClickNickname">
                      닉네임 변경하기
                    </button>
                    <button class="password-button" @click="onClickPassword">
                      비밀번호 변경하기
                    </button>
                    <button class="withdraw-button" @click="onClickDeletePopup">
                      회원탈퇴
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="isNicknameCheck" class="profile-section change-wrap nickname-change-wrap">
              <div class="field-form">
                <div class="form-wrap">
                  <div class="nickname-wrap">
                    <h4>닉네임 변경</h4>
                    <s-text-field
                      v-model="nicknameData.changeNickName"
                      label="변경 할 닉네임"
                      :required="true"
                      type="text"
                      class="new-nickname"
                      @keypress.enter.prevent="onClickChangeNickname"
                    />
                    <div class="mypage-btn-wrap">
                      <s-button class="submit-button s-button" @click="onClickChangeNickname">
                        확인
                      </s-button>
                      <s-button class="submit-button c-button" @click="onClickNickname">
                        취소
                      </s-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="isPasswordCheck" class="profile-section change-wrap password-change-wrap">
              <div class="field-form">
                <div class="form-wrap">
                  <div class="password-wrap">
                    <h4>비밀번호 변경</h4>
                    <div class="password-field">
                      <s-text-field
                        v-model="formData.beforePassword"
                        label="현재 비밀번호"
                        :required="true"
                        type="password"
                        class="current-password"
                      />
                      <s-text-field
                        v-model="formData.afterPassword"
                        label="패스워드"
                        :required="true"
                        type="password"
                        :rules="[checkPassword]"
                        class="new-password"
                      />
                      <s-text-field
                        v-model="checkPwd"
                        label="패스워드 재입력"
                        :required="true"
                        :rules="[checkSecondPassword]"
                        type="password"
                        class="confirm-password"
                        @keypress.enter.prevent="onClickChangePassword"
                      />
                    </div>
                    <div class="mypage-btn-wrap">
                      <s-button class="submit-button s-button" @click="onClickChangePassword">
                        확인
                      </s-button>
                      <s-button class="submit-button c-button" @click="onClickPassword">
                        취소
                      </s-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="profile-section mypage-item">
              <h4>내 관심종목</h4>
              <s-data-table v-if="userInfo.interestStock" :headers="headers" :items="userInfo.interestStock" :is-search="false">
                <template #itmsNm="{item}">
                  <div class="itms-name" @click="onClickToDetails(item.stockInfoSequence)">
                    {{ item.itmsNm }}
                  </div>
                </template>
                <template #clpr="{item}">
                  {{ item.clpr | setNumberComma }}
                </template>
                <template #fltRt="{item}">
                  <div v-if="item.fltRt === 0">
                    {{ item.fltRt }}
                  </div>
                  <div v-else :class="{minus: item.fltRt < 0, plus: item.fltRt > 0}">
                    {{ item.fltRt }}
                  </div>
                </template>
                <template #trqu="{item}">
                  {{ item.trqu | setNumberComma }}
                </template>
                <template #mrktTotAmt="{item}">
                  {{ item.mrktTotAmt | setKoreanNumber }}
                </template>
              </s-data-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import {
  IChangeNickNameReqBody,
  IChangeNickNameRes,
  IChangePasswordReqBody, IChangePasswordRes, IDeleteUserReqBody, IDeleteUserRes,
  ISelectMyInfoRes
} from '~/types/user/user'
import { getMyInfo } from '~/api/user'
import STextField from '~/components/common/STextField.vue'
import SButton from '~/components/common/SButton.vue'
import { changeNickname, changePassword, userDelete } from '~/api/auth'
import StringUtil from '~/util/StringUtil'
import { commonStore } from '~/util/store-accessor'
import { Namespace } from '~/util/Namespace'
import SDataTable from '~/components/common/SDataTable.vue'
import { IDataTableHeader } from '~/types/common'
import SPopup from '~/components/common/SPopup.vue'

const common = namespace(Namespace.COMMON)
@Component({
  layout: 'empty',
  components: { SPopup, SDataTable, SButton, STextField },
})
export default class myPage extends Vue {
  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/
  private userInfo = {} as ISelectMyInfoRes
  private userInfoSequence = 0
  @common.State private token!: string

  private formData = {
    beforePassword: '',
    afterPassword: ''
  } as IChangePasswordReqBody

  private nicknameData = {
    changeNickName: ''
  } as IChangeNickNameReqBody

  private userPassword = {
    password: ''
  } as IDeleteUserReqBody

  private checkPwd = ''

  private isPasswordCheck = false
  private isNicknameCheck = false

  private headers = [
    { text: '종목명', value: 'itmsNm', align: 'center', width: 200, isSlot: true },
    { text: '전일종가', value: 'clpr', align: 'center', width: 120, isSlot: true },
    { text: '등락률', value: 'fltRt', align: 'center', width: 120, isSlot: true },
    { text: '거래량', value: 'trqu', align: 'center', width: 120, isSlot: true },
    { text: '시가총액', value: 'mrktTotAmt', align: 'center', width: 150, isSlot: true },
  ] as Array<IDataTableHeader>

  private userInvestType = this.userInfo.investPropensity
  private userDeletePopup = false

  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  async created() {
    await this.initGetMyInfo()
  }

  /********************************************************************************
   * Method (Event, Business Logic)
   ********************************************************************************/
  private async initGetMyInfo() {
    this.userInfoSequence = commonStore.userInfo.userSequence
    await this.getMyInfo()
  }

  private async getMyInfo() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    this.userInfo = await getMyInfo()
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  }

  private onClickPassword() {
    this.isPasswordCheck = !this.isPasswordCheck
  }

  private onClickNickname() {
    this.isNicknameCheck = !this.isNicknameCheck
  }

  private async onClickChangePassword() {
    if (StringUtil.isEmpty(this.formData.beforePassword) && StringUtil.isEmpty(this.formData.afterPassword)) {
      return false
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    const response: IChangePasswordRes = await changePassword(this.formData, this.userInfoSequence)
    if (StringUtil.isNotEmpty(response)) {
      if (response.changePasswordYn === 'Y') {
        commonStore.ADD_DIALOG({
          id: 'CHANGE PASSWORD',
          text: '비밀번호가 변경됐습니다.',
          callback: () => {
            this.$router.push('/')
          }
        })
      }
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
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

  private async onClickChangeNickname() {
    if (StringUtil.isEmpty(this.nicknameData.changeNickName)) {
      return false
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    const response: IChangeNickNameRes = await changeNickname(this.nicknameData, this.userInfoSequence)
    if (StringUtil.isNotEmpty(response)) {
      if (response.changeNickNameYn === 'Y') {
        commonStore.ADD_DIALOG({
          id: 'CHANGE NICKNAME',
          text: '닉네임이 변경됐습니다.',
          callback: () => {
            this.$nextTick(() => {
              this.$nuxt.$loading.start()
            })
            commonStore.UPDATE_USER()
            this.$nextTick(() => {
              this.$nuxt.$loading.finish()
            })
            this.$router.push('/')
          }
        })
      }
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  }

  private checkPassword(value: string): boolean | string {
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/
    return regex.test(value) || '패스워드는 8자리 이상 특수문자 포함(?제외) 영문자 포함하여 입력 해주세요.'
  }

  private checkSecondPassword(value: string): boolean | string {
    return this.formData.afterPassword === value || '패스워드와 패스워드 재입력이 불일치 합니다.'
  }

  private onClickToSurvey() {
    commonStore.CHECK_LOGIN()
    if (this.token) {
      this.$router.push('/survey')
    }
  }

  private onClickDeletePopup() {
    this.userDeletePopup = true
  }

  private async onClickDelete() {
    if (StringUtil.isEmpty(this.userPassword.password)) {
      return false
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    const response: IDeleteUserRes = await userDelete(this.userPassword)
    console.log(this.userPassword)
    if (StringUtil.isNotEmpty(response)) {
      if (response.deleteYn === 'Y') {
        commonStore.ADD_DIALOG({
          id: 'DELETE USER',
          text: '회원 탈퇴가 완료됐습니다.',
          callback: () => {
            this.$nextTick(() => {
              this.$nuxt.$loading.start()
            })
            commonStore.LOGOUT()
            this.$nextTick(() => {
              this.$nuxt.$loading.finish()
            })
            this.$router.push('/')
          }
        })
      }
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  }

  private closePopup() {
    this.userDeletePopup = false
  }
}

</script>
