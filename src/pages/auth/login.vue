<template>
  <div id="container" class="line">
    <div class="content dynamic-layout">
      <div class="sing-up">
        <div class="sing-up-header">
          <h1>로그인하기</h1>
        </div>
        <div class="sing-up-input">
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
  private formData = {
    email: '',
    pwd: ''

  } as ILogin

  private async onClickLogin() {
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
