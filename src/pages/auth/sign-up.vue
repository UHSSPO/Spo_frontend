<template>
  <div id="container" class="line">
    <div class="content center">
      <div class="sign-up join-box">
        <div class="sign-up-header">
          <h1>회원가입</h1>
        </div>
        <div class="sign-up-input">
          <div class="sign-up-button">
            <a href="#" class="btn-img" @click="goToPage">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><g clip-path="url(#kakao_svg__a)"><path fill="#371D1E" d="M12.001 2C5.924 2 1 5.851 1 10.605c0 3.092 2.087 5.805 5.219 7.32-.23.85-.834 3.08-.955 3.557-.149.59.219.584.46.425.19-.125 3.014-2.027 4.233-2.845.662.097 1.344.148 2.042.148C18.073 19.21 23 15.358 23 10.605 23 5.85 18.076 2 12.001 2Z" /></g><defs><clipPath id="kakao_svg__a"><path fill="#fff" d="M1 2h22v20H1z" /></clipPath></defs></svg>
              <span>카카오 계정으로 계속하기</span>
            </a>
          </div>
        </div>
        <a href="#" class="btn-login" @click="onclickToLogin">로그인</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import SButton from '~/components/common/SButton.vue'
declare let Kakao: any
@Component({
  components: { SButton }
})
export default class SignUp extends Vue {
  private async goToPage() {
    await Kakao.Auth.authorize({
      redirectUri: `${window.location.origin}/auth/kakao-login`
    })
  }

  private onclickToLogin() {
    this.$router.push('/auth/login')
  }
}
</script>
