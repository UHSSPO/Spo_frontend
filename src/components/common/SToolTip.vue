<template>
  <div>
    <v-tooltip bottom>
      <template #activator="{ on, attrs }">
        <v-icon
          v-bind="attrs"
          v-on="on"
        >
          mdi-alert-circle-outline
        </v-icon>
      </template>
      <span class="tooltip-text">{{ detail }}</span>
    </v-tooltip>
  </div>
</template>

<script lang="ts">

import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator'

@Component({
  name: 'SToolTip',
})
export default class SToolTip extends Vue {
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
  @Prop() detail!: string

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
