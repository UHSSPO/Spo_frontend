<template>
  <div id="container" class="line">
    <div class="content dynamic-layout">
      <div class="sing-up">
        <div class="sing-up-header">
          <h1>카카오 계정으로 가입하기</h1>
        </div>
        <div class="sing-up-input">
          <s-text-field
            v-model="formData.email"
            label="이메일"
            :required="true"
            :disabled="true"
          />
          <s-text-field
            v-model="formData.nickName"
            label="닉네임"
            :required="true"
            :max-length="10"
          />
          <s-text-field
            v-model="formData.dateOfBirth"
            label="생년월일"
            :required="true"
            :rules="[checkDateFormat]"
          />
          <s-text-field
            v-model="formData.pwd"
            label="패스워드"
            :required="true"
            :rules="[checkPassword]"
            type="password"
          />
          <s-text-field
            v-model="checkPwd"
            label="패스워드 재입력"
            :required="true"
            :rules="[checkSecondPassword]"
            type="password"
          />
        </div>
        <div class="sing-up-button">
          <s-button class="w-100" :disabled="!isButtonDisabled" @click="onClickSingUp">
            가입
          </s-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { IKakaoCertified, ISignUp } from '../../types/auth/auth'
import { kakaoCertified, signUp } from '../../api/auth'
import STextField from '../../components/common/STextField.vue'
import SButton from '../../components/common/SButton.vue'
import StringUtil from '../../util/StringUtil'
import { commonStore } from '../../util/store-accessor'
@Component({
  components: { STextField, SButton },
  layout: 'empty',
  name: 'kakao-login'
})
export default class KakaoLogin extends Vue {
  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/
  private authData = {} as IKakaoCertified
  private code = (this.$route.query.code || '') as string
  private formData = {
    email: '',
    pwd: '',
    dateOfBirth: '',
    signUpChannel: '',
    nickName: ''
  } as ISignUp

  private checkPwd = ''

  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  async created() {
    this.authData = {
      apikey: '2e79fbfa9c3fe6aad98a3ca66e8e5f6f',
      redirectUri: `${window.location.origin}/auth/kakao-login`,
      code: this.code
    }

    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    const response = await kakaoCertified(this.authData)
    this.formData.email = response.email
    this.formData.nickName = response.nickName
    this.formData.signUpChannel = 'kakao'
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  }

  /********************************************************************************
   * Method (Event, Business Logic)
   ********************************************************************************/
  private async onClickSingUp() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    const response = await signUp(this.formData)
    if (StringUtil.isNotEmpty(response)) {
      commonStore.ADD_DIALOG({
        id: 'SUCCESS_SIGN_UP',
        text: '회원가입이 완료 됐습니다.',
        callback: () => {
          this.$router.push('/')
        }
      })
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  }

  private checkDateFormat(value: string): boolean | string {
    const regex = /^\d{6}$/
    return regex.test(value) || 'YYMMDD 형식으로 입력해주세요.'
  }

  private checkPassword(value: string): boolean | string {
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/
    return regex.test(value) || '패스워드는 8자리 이상 특수문자 포함(?제외) 영문자 포함하여 입력 해주세요.'
  }

  private checkSecondPassword(value: string): boolean | string {
    return this.formData.pwd === value || '패스워드와 패스워드 재입력이 불일치 합니다.'
  }

  private get isButtonDisabled(): boolean {
    if (this.checkDateFormat(this.formData.dateOfBirth) === true &&
      this.checkPassword(this.formData.pwd) === true &&
      StringUtil.isNotEmpty(this.formData.nickName) &&
      this.checkSecondPassword(this.checkPwd) === true) {
      return true
    } else {
      return false
    }
  }
}
</script>
