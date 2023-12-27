<template>
  <div id="container" class="line">
    <div class="content">
      <div class="login">
        <div class="login-header">
          <h1>로그인하기</h1>
        </div>
        <div class="login-input">
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
          />
          <div class="login-button">
            <s-button class="w-100" @click="onClickLogin">
              로그인하기
            </s-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import STextField from '~/components/common/STextField.vue'
import SButton from '~/components/common/SButton.vue'
import { IKakaoCertified, ILogin, ISignUp } from '~/types/auth/auth'
import { login, signUp } from '~/api/auth'
import StringUtil from '~/util/StringUtil'
import { commonStore } from '~/util/store-accessor'

@Component({
  components: { STextField, SButton },
  layout: 'empty',
  name: 'login'
})
export default class Login extends Vue {
  private formData = {
    email: '',
    pwd: ''

  } as ILogin

  private async onClickLogin() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    const response = await login(this.formData)
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  }
}

</script>
