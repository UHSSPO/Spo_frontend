<template>
  <v-container fluid>
    <v-checkbox v-model="localValue" :rules="localRules" :disabled="disabled">
      <template #label>
        <div>
          I agree that
          <v-tooltip bottom>
            <template #activator="{ on }">
              <a
                target="_blank"
                href="https://vuetifyjs.com"
                @click.stop
                v-on="on"
              >
                Vuetify
              </a>
            </template>
            Opens in new window
          </v-tooltip>
          is awesome
        </div>
      </template>
    </v-checkbox>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import StringUtil from '../../util/StringUtil'

@Component({
  name: 'SCheckbox'
})
export default class SCheckbox extends Vue {
  @Prop() disabled!: boolean
  @Prop() required!: boolean
  @Prop(Number) minLength!: number
  @Prop(Number) maxLength!: number
  @Prop(Array) rules?: Array<Function>

  private localValue = false
  private localRules: Array<Function> = []

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
