<template>
  <v-btn
    :text="text"
    :tile="isTile"
    :disabled="disabled"
    :href="href"
    :target="target"
    @click="onClick"
  >
    <v-icon v-if="icon" left>
      {{ icon }}
    </v-icon>
    <slot />
  </v-btn>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator'
// import StringUtil from '~/util/StringUtil'

@Component({
  name: 'SButton'
})
export default class SButton extends Vue {
  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/
  private isTile = false

  /********************************************************************************
   * Properties
   ********************************************************************************/
  @Prop(Boolean) private readonly disabled!: boolean
  @Prop(String) private readonly href!: string
  @Prop(String) private readonly icon!: string
  @Prop(String) private readonly target!: string
  @Prop(Boolean) private readonly text!: boolean
  @Prop(String) private readonly value!: string

  @Emit('click')
  private onClick (eventValue: any): any {
    return eventValue
  }

  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  created (): void {
    // this.isTile = StringUtil.isNotEmpty(this.icon)
  }
}
</script>

<style lang="scss">

</style>
