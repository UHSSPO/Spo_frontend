<template>
  <div id="container" class="line">
    <div />
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
  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  created (): void {
    this.$router.push('/home')
  }
}
</script>
