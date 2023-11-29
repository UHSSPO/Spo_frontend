<template>
  <v-row>
    <v-col class="text-center">
      <img src="/v.png" alt="Vuetify.js" class="mb-5">
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small />
        </footer>
      </blockquote>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { IKakaoCertified } from '../../types/auth/auth'
import { kakaoCertified } from '../../api/auth'
@Component({ layout: 'empty', name: 'Kakao-callback' })
export default class extends Vue {
  private authData = {} as IKakaoCertified
  private code = (this.$route.query.code || '') as string

  async created() {
    this.authData = {
      apikey: '2e79fbfa9c3fe6aad98a3ca66e8e5f6f',
      redirectUri: `${window.location.origin}/auth/kakao-callback`,
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
