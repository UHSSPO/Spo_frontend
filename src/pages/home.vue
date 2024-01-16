<template>
  <div id="container" class="line">
    <div class="content">
      test
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  layout: 'empty',
  components: {}
})
export default class home extends Vue {
  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  created(): void {
    console.log('/home')
  }
}

</script>
