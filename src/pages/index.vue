<template>
  <div id="container" class="line">
    <div class="content" />
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
}
</script>
