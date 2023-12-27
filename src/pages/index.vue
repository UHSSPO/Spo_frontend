<template>
  <div id="container" class="line">
    <div class="content">
      <s-text-field v-model="value" placeholder="text" />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'nuxt-property-decorator'
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
