<template>
  <div id="container" class="line">
    <div class="content dynamic-layout">
      <div class="sign-up">
        <div class="sign-up-header">
          <h1>로그인하기</h1>
        </div>
        <div class="sign-up-input">
          <s-text-field
            v-model="formData.email"
            label="이메일"
            :required="true"
            type="email"
          />
          <s-text-field
            v-model="formData.pwd"
            label="패스워드"
            :required="true"
            type="password"
            @keypress.enter.prevent="onClickLogin"
          />
          <div class="login-button">
            <s-button class="w-100 s-button" @click="onClickLogin">
              로그인하기
            </s-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import STextField from '~/components/common/STextField.vue'
import SButton from '~/components/common/SButton.vue'
import { IKakaoCertified, ILogin, ISignUp, IUserInfo } from '~/types/auth/auth'
import { login, signUp } from '~/api/auth'
import StringUtil from '~/util/StringUtil'
import { commonStore } from '~/util/store-accessor'
import { Namespace } from '~/util/Namespace'

const common = namespace(Namespace.COMMON)
@Component({
  components: { STextField, SButton },
  layout: 'empty',
  name: 'login'
})
export default class Login extends Vue {
  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/
  private formData = {
    email: '',
    pwd: ''
  } as ILogin

  /********************************************************************************
   * Method (Event, Business Logic)
   ********************************************************************************/
  private async onClickLogin() {
    if (StringUtil.isEmpty(this.formData.email) && StringUtil.isEmpty(this.formData.pwd)) {
      return false
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    const response: IUserInfo = await login(this.formData)
    if (StringUtil.isNotEmpty(response)) {
      commonStore.ADD_USER_INFO(response)
      await this.$router.push('/')
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  }
}

</script>
