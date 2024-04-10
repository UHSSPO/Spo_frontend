<template>
  <v-textarea
    v-model="localValue"
    :label="label"
    :rules="localRules"
    :required="required"
    :counter="counter"
    :maxlength="maxLength"
    :disabled="disabled"
    :placeholder="placeholder"
    :single-line="singleLine"
    :outlined="!singleLine"
    :hide-details="hideDetails"
    @change="onChange"
    @input="onInput"
    @keypress="onkeypress"
  />
</template>

<script lang="ts">
import { Component, Emit, Prop, Ref, Vue, Watch } from 'nuxt-property-decorator'
import StringUtil from '../../util/StringUtil'

@Component({
  name: 'STextArea'
})
export default class STextArea extends Vue {
  @Prop() label?: string
  @Prop({ type: String, default: 'text' }) type?: string
  @Prop() value!: string
  @Prop({ default: false }) required?: boolean
  @Prop() maxLength?: number
  @Prop() disabled?: boolean
  @Prop({ default: false }) singleLine?: boolean
  @Prop({ default: false }) hideDetails?: boolean
  @Prop() placeholder?: string
  @Prop() private readonly counter?: number
  @Prop(Number) private readonly minLength?: number
  @Prop() private readonly keyFilterRegex?: any

  private localValue = ''
  private localRules: Array<Function> = []

  @Watch('value', { immediate: true })
  onValueChange(newValue: string) {
    this.localValue = newValue
  }

  @Watch('value', { immediate: true })

  @Watch('rules')
  private onWatchRules(eventValue: Array<Function>) {
    this.setRules()
  }

  @Emit('change')
  private onChange(eventValue: any) {
    return eventValue
  }

  @Emit('input')
  private onInput(eventValue: any) {
    return eventValue
  }

  @Emit('keypress')
  private onkeypress(eventValue: any) {
    if (this.keyFilterRegex && !this.keyFilterRegex.test(eventValue.key)) {
      eventValue.preventDefault()
      return
    }
    return eventValue
  }

  created(): void {
    this.setRules()
  }

  private setRules() {
    this.localRules = []

    if (!this.disabled) {
      // 필수 체크
      if (this.required) {
        this.localRules = [
          (value: string) => {
            return StringUtil.isNotEmpty(value) || '필수입니다.'
          }
        ]
      }
      // // 최대 길이 체크
      // if ((this.maxLength as number) <= this.value.length) {
      //   this.localRules.push((value: string) => (value || '').length <= (this.minLength as number) || this.maxLength + '자 이하로 입력해 주세요')
      // }
      //
      // // 최소 길이 체크
      // if (StringUtil.isNotEmpty(this.minLength)) {
      //   this.localRules.push((value: string) => (value || '').length >= (this.minLength as number) || this.minLength + '자 이상 입력해 주세요')
      // }

      // if (this.rules) {
      //   this.localRules = [...this.localRules, ...this.rules]
      // }
    }
  }
}
</script>
