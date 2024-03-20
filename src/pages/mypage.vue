<template>
  <div id="container" class="line">
    <div class="content dynamic-layout">
      <div class="rankWrap">
        <div class="commendWrap w-100">
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
                    <span id="investment-preference" class="item-value">{{ userInfo.investPropensity }}</span>
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
                <div class="profile-wrap profile-grad-wrap">
                  <div class="profile-item profile-btn-wrap">
                    <button class="nickname-button" @click="onClickNickname">
                      닉네임 변경하기
                    </button>
                    <button class="password-button" @click="onClickPassword">
                      비밀번호 변경하기
                    </button>
                    <button class="withdraw-button">
                      회원탈퇴
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="onClickNicknameChk === 'true'" class="profile-section change-wrap nickname-change-wrap">
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
                    <s-button class="submit-button s-button" @click="onClickChangeNickname">
                      확인
                    </s-button>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="onClickPasswordChk === 'true'" class="profile-section change-wrap password-change-wrap">
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
                    <s-button class="submit-button s-button" @click="onClickChangePassword">
                      확인
                    </s-button>
                  </div>
                </div>
              </div>
            </div>

            <div class="profile-section mypage-item">
              <h4>내 관심종목</h4>
              <s-data-table v-if="userInfo.interestStock" :headers="headers" :items="userInfo.interestStock" :is-search="false">
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
  IChangePasswordReqBody, IChangePasswordRes,
  ISelectMyInfoRes
} from '~/types/user/user'
import { getMyInfo } from '~/api/user'
import STextField from '~/components/common/STextField.vue'
import SButton from '~/components/common/SButton.vue'
import { changeNickname, changePassword } from '~/api/auth'
import StringUtil from '~/util/StringUtil'
import { commonStore } from '~/util/store-accessor'
import { Namespace } from '~/util/Namespace'
import SDataTable from '~/components/common/SDataTable.vue'
import { IDataTableHeader } from '~/types/common'

const common = namespace(Namespace.COMMON)
@Component({
  layout: 'empty',
  components: { SDataTable, SButton, STextField },
})
export default class myPage extends Vue {
  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/
  private userInfo = {} as ISelectMyInfoRes
  private userInfoSequence = 0

  private formData = {
    beforePassword: '',
    afterPassword: ''
  } as IChangePasswordReqBody

  private nicknameData = {
    changeNickName: ''
  } as IChangeNickNameReqBody

  private checkPwd = ''

  private onClickPasswordChk = 'false'
  private onClickNicknameChk = 'false'

  private headers = [
    { text: '종목명', value: 'itmsNm', align: 'center', width: 200, isSlot: false },
    { text: '전일종가', value: 'clpr', align: 'center', width: 120, isSlot: true },
    { text: '등락률', value: 'fltRt', align: 'center', width: 120, isSlot: true },
    { text: '거래량', value: 'trqu', align: 'center', width: 120, isSlot: true },
    { text: '시가총액', value: 'mrktTotAmt', align: 'center', width: 150, isSlot: true },
  ] as Array<IDataTableHeader>

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
    this.onClickPasswordChk = 'true'
  }

  private onClickNickname() {
    this.onClickNicknameChk = 'true'
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
}

</script>
