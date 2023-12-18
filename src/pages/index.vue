<template>
  <div id="container" class="line">
    <div class="content">
      <v-btn color="primary" nuxt @click="goToPage">
        회원가입
      </v-btn>
      <s-text-field v-model="value" placeholder="text" />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'nuxt-property-decorator'
import { commonStore } from '../util/store-accessor'
import { DIALOG_RESULT, DIALOG_TYPE } from '../types/common'
import { geTestApi, geTestApiError400, geTestApiError500 } from '../api/test-api'
import STextField from '../components/common/STextField.vue'
declare let Kakao: any

@Component({
  layout: 'empty',
  components: {
    STextField
  }
})
export default class extends Vue {
  kakaoInit() {
    Kakao.init('2e79fbfa9c3fe6aad98a3ca66e8e5f6f')// KaKao client key
    Kakao.isInitialized()
  }

  private value = ''

  async created() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    const res = await geTestApi()
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  }

  mounted() {
    this.kakaoInit()
  }

  private goToPage() {
    commonStore.ADD_DIALOG({
      id: 'test',
      type: DIALOG_TYPE.CONFIRM_CANCEL,
      text: '이동한다잉',
      callback: async (response: DIALOG_RESULT) => {
        if (response === DIALOG_RESULT.CONFIRM) {
          await Kakao.Auth.authorize({
            redirectUri: `${window.location.origin}/auth/kakao-login`
          })
        } else {
          console.log('취소요')
          console.log(this.value)
        }
      }
    })
  }
}
</script>
