<template>
  <div id="container" class="line">
    <div class="content">
      <div class="sing-up join-box">
        <div class="sing-up-header">
          <h1>회원가입</h1>
        </div>
        <div class="sing-up-input">
          <div class="sing-up-button">
            <s-button class="btn-img" @click="goToPage" />
          </div>
        </div>
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
export default class depts extends Vue {
  kakaoInit() {
    Kakao.init('2e79fbfa9c3fe6aad98a3ca66e8e5f6f')// KaKao client key
    Kakao.isInitialized()
  }

  mounted() {
    this.kakaoInit()
  }

  private async goToPage() {
    await Kakao.Auth.authorize({
      redirectUri: `${window.location.origin}/auth/kakao-login`
    })
  }
}
</script>
