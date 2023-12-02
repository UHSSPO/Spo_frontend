<template>
  <div id="container" class="line">
    <div class="content">
    <!--시작-->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { IKakaoCertified } from '../../types/auth/auth'
import { kakaoCertified } from '../../api/auth'
@Component({ layout: 'empty', name: 'callback' })
export default class extends Vue {
  private authData = {} as IKakaoCertified
  private code = (this.$route.query.code || '') as string

  async created() {
    this.authData = {
      apikey: '2e79fbfa9c3fe6aad98a3ca66e8e5f6f',
      redirectUri: `${window.location.origin}/auth/callback`,
      code: this.code
    }

    console.log('process.env.NODE_ENV', process.env.NODE_ENV)

    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    const response = await kakaoCertified(this.authData)
    console.log('response', response)
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  }
}
</script>
