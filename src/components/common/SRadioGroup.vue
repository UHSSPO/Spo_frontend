<template>
  <v-container class="px-0" fluid>
    <v-radio-group
      v-model="localValue"
      :row="row"
      :disabled="disabled"
      @change="onChange"
    >
      <v-radio
        v-for="item in localItems"
        :key="item[itemCd]"
        :label="item.label"
        :value="item.value"
      />
    </v-radio-group>
  </v-container>
</template>

<script lang="ts">
/*
  items 값 Ex)
   private displayYN = [
    {cd: 'N', cdVal: '미공개'},
    {cd: 'Y', cdVal: '공개'}
  ]
  v-model 값 Y or N
  <s-radio-group v-model="value" :items="items" row />
   */
import { Component, Emit, Prop, Vue, Watch } from 'nuxt-property-decorator'
import _ from 'lodash'
import { ICodeInfo } from '~/types/common'

@Component({
  name: 'SRadioGroup'
})
export default class SRadioGroup extends Vue {
  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/
  private localItems: ICodeInfo[] = []
  private localValue = ''

  /********************************************************************************
   * Properties
   ********************************************************************************/
  @Prop(String) private readonly codeId!: string
  @Prop(Boolean) private readonly row?: boolean
  @Prop(Boolean) private readonly disabled!: boolean
  @Prop({ type: String, default: 'cd' }) private readonly itemCd!: string
  @Prop({ type: String, default: 'cdVal' }) private readonly itemCdVal!: string
  @Prop() private readonly items?: any
  @Prop() private readonly value?: any
  @Prop(String) private readonly label!: string

  @Emit('change')
  private onChange(eventValue: any) {
    this.onInput(eventValue)
    return eventValue
  }

  @Emit('input')
  private onInput(eventValue: any) {
    return eventValue
  }

  @Watch('items')
  private onWatchItems() {
    this.setLocalItems()
  }

  @Watch('value')
  private onWatchValue() {
    this.setValue()
  }

  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  created(): void {
    this.setLocalItems()
  }

  /********************************************************************************
   * Method (Event, Business Logic)
   ********************************************************************************/
  private setLocalItems() {
    if (this.items) {
      this.localItems = _.clone(this.items) as ICodeInfo[]
      this.setValue()
    }
  }

  private setValue() {
    this.localValue = this.value
  }
}
</script>
