<template>
  <v-checkbox
    v-model="selected"
    :disabled="disabled"
    :label="label"
    false-value="N"
    true-value="Y"
    @change="onChange"
  />
</template>
<script lang="ts">
/*
  label 제목
  v-model 값 Y or N
  <s-check-box v-model="value" label="테스트123" />
   */
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator'

@Component({
  name: 'SCheckbox',
})
export default class SCheckbox extends Vue {
  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/
  private selected = false
  private localRules: Array<Function> = []

  /********************************************************************************
   * Properties
   ********************************************************************************/
  @Prop() disabled!: boolean
  @Prop() label!: string

  @Emit('input')
  private onInput() {
    return this.selected
  }

  @Emit('change')
  private onChange() {
    this.onInput()
    return this.selected
  }
}
</script>
