<template>
  <div class="text-center d-flex align-center justify-space-around">
    <v-tooltip bottom>
      <template #activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Button
        </v-btn>
      </template>
      <span>Tooltip</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template #activator="{ on, attrs }">
        <v-icon
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          mdi-home
        </v-icon>
      </template>
      <span>Tooltip</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template #activator="{ on, attrs }">
        <span
          v-bind="attrs"
          v-on="on"
        >This text has a tooltip</span>
      </template>
      <span>Tooltip</span>
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
