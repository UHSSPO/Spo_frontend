<template>
  <div id="container" class="line">
    <div class="content">
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'nuxt-property-decorator'
declare let Kakao: any

@Component({
  layout: 'empty',
  components: {}
})
export default class extends Vue {
  kakaoInit() {
    Kakao.init('2e79fbfa9c3fe6aad98a3ca66e8e5f6f')// KaKao client key
    Kakao.isInitialized()
  }

  mounted() {
    this.kakaoInit()
  }
}
</script>
