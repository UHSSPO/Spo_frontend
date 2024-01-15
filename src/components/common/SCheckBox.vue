<template>
  <v-checkbox
    v-model="selected"
    :disabled="disabled"
    :label="label"
    :readonly="readonly"
    :rules="rules"
    class="chk"
    false-value="N"
    true-value="Y"
    @change="onChange"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'

@Component({
  name: 'SCheckbox'
})
export default class SCheckbox extends Vue {
  @Prop() disabled!: boolean
  @Prop() required!: boolean
  @Prop() label!: string
  @Prop() readonly!: boolean
  @Prop(Number) minLength!: number
  @Prop(Number) maxLength!: number
  @Prop(Array) rules?: Array<Function>

  private selected = false
  private localRules: Array<Function> = []
  private onChange(newValue: boolean) {
    console.log('Checkbox value changed:', newValue)
  }

  @Watch('rules')
  private onWatchRules(newRules: Array<Function>) {
    this.setRules(newRules)
  }

  created(): void {
    this.setRules(this.rules)
  }

  private setRules(customRules?: Array<Function>) {
    this.localRules = []

    if (!this.disabled) {
      if (this.required) {
        this.localRules.push((value: boolean) => value || 'The checkbox is required.')
      }

      if (this.minLength !== undefined) {
        this.localRules.push((value: boolean) => value || 'Please check the checkbox.')
      }

      if (customRules) {
        this.localRules = [...this.localRules, ...customRules]
      }
    }
  }
}
</script>
