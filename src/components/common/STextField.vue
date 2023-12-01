<template>
  <v-text-field
    :label="label"
    :type="type"
    :rules="rules"
    :required="required"
    :maxlength="maxLength"
    :disabled="disabled"
    :placeholder="placeholder"
    outlined
    @change="onChange"
    @input="onInput"
  />
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator'

@Component({
  name: 'STextField'
})
export default class STextField extends Vue {
  @Prop() label?: string
  @Prop({ type: String, default: 'text' }) type?: string
  @Prop({ type: Array, default: () => [] }) rules?: Array<Function>
  @Prop() value?: string
  @Prop({ default: false }) required?: string
  @Prop() maxLength?: number
  @Prop() disabled?: boolean
  @Prop() placeholder?: string

  @Emit('change')
  private onChange(eventValue: any) {
    return eventValue
  }

  @Emit('input')
  private onInput(eventValue: any) {
    return eventValue
  }
}
</script>
