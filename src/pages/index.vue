<template>
  <div id="container" class="line">
    <div class="content">
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

@Component({
  layout: 'empty',
  components: {
    STextField
  }
})
export default class extends Vue {
  private value = ''
}
</script>
