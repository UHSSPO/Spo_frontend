<template>
  <v-text-field
    v-model="localValue"
    :label="label"
    :type="type"
    :rules="localRules"
    :required="required"
    :maxlength="maxLength"
    :disabled="disabled"
    :placeholder="placeholder"
    outlined
    @change="onChange"
    @input="onInput"
    @keypress="onkeypress"
  />
</template>

<script lang="ts">
import { Component, Emit, Prop, Ref, Vue, Watch } from 'nuxt-property-decorator'
import StringUtil from '../../util/StringUtil'

@Component({
  name: 'STextField'
})
export default class STextField extends Vue {
  @Prop() label?: string
  @Prop({ type: String, default: 'text' }) type?: string
  @Prop({ type: Array, default: () => [] }) rules?: Array<Function>
  @Prop() value!: string
  @Prop({ default: false }) required?: boolean
  @Prop() maxLength?: number
  @Prop() disabled?: boolean
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
      // 최대 길이 체크
      if (this.counter || this.maxLength) {
        const maxLength = this.counter ? this.counter : (this.maxLength as number)
        this.localRules.push((value: string) => (value || '').length <= maxLength || maxLength + '자로 입력해 주세요.')
      }
      // 최소 길이 체크
      if (StringUtil.isNotEmpty(this.minLength)) {
        this.localRules.push((value: string) => (value || '').length >= (this.minLength as number) || this.minLength + '자 이상 입력해 주세요')
      }

      if (this.rules) {
        this.localRules = [...this.localRules, ...this.rules]
      }
    }
  }
}
</script>
