<template>
  <div class="chk-group">
    <div :class="['v-input theme--light v-input--selection-controls v-input--checkbox', !isValidation ? 'v-input--has-state error--text' : '']">
      <v-checkbox
        v-for="(item, index) in localItems"
        :key="index"
        v-model="localValues[index]"
        :disabled="disabledCode && disabledCode.includes(item[itemCd])"
        :label="item[itemCdVal]"
        :style="inlineStyle"
        class="chk inline"
        @change="onChange"
      />
    </div>
    <transition name="fade">
      <div v-if="!isValidation" class="v-messages error--text" role="alert">
        <div class="v-messages__wrapper">
          <div class="v-messages__message">
            {{ validationMessage }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'nuxt-property-decorator'
import _ from 'lodash'

import SCheckbox from '~/components/common/SCheckbox.vue'

import { commonStore } from '~/util/store-accessor'
import CodeUtil from '~/util/CodeUtil'
import StringUtil from '~/util/StringUtil'

@Component({
  name: 'SCheckboxes',
  components: { SCheckbox }
})
export default class SCheckboxes extends Vue {
  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/
  private localItems: any = []
  private localValues: any = []
  private isValidation = true
  private validationMessage = ''

  /********************************************************************************
   * Properties
   ********************************************************************************/
  @Prop(String) private readonly codeId!: string
  @Prop() private readonly codeAttr1!: string
  @Prop({ type: String, default: 'cd' }) private readonly itemCd!: string
  @Prop({ type: String, default: 'cdVal' }) private readonly itemCdVal!: string
  @Prop() private readonly maxSelect?: number
  @Prop(Boolean) private readonly required?: boolean
  @Prop(Boolean) private readonly returnObject?: boolean
  @Prop() private readonly items!: any
  @Prop() private readonly value?: any
  @Prop(Boolean) private readonly validate!: boolean
  @Prop() private readonly inlineStyle?: string
  @Prop() private readonly disabledCode!: Array<string>

  @Emit('change')
  private onChange() {
    const selected: any[] = []
    this.localItems.forEach((item: any, index: number) => {
      if (this.localValues[index] === 'Y') {
        if (this.returnObject) {
          selected.push({ [this.itemCd]: item[this.itemCd], [this.itemCdVal]: item[this.itemCdVal] })
        } else {
          selected.push(item[this.itemCd])
        }
      }
    })
    this.checkValidation()
    return selected
  }

  @Watch('items')
  private onWatchItems(eventValue: any) {
    this.setLocalItems()
  }

  @Watch('value', { deep: true })
  private onWatchValue(eventValue: any) {
    this.setValue(eventValue)
  }

  @Watch('required')
  private onWatchRequired() {
    this.checkValidation()
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
    this.localValues.length = this.localItems.length
    this.localValues.fill('N', 0, this.localItems.length)
    if (this.items) {
      this.localItems = _.clone(this.items)
      this.setValue(this.value)
    } else {
      commonStore.getCommonCode({ grpCd: this.codeId, attr1: this.codeAttr1 }).then((response) => {
        this.localItems = _.cloneDeep(response)
        if (this.itemCd !== 'cd') { this.localItems = CodeUtil.renameKeyOfItems(this.localItems, 'cd', this.itemCd) }
        if (this.itemCdVal !== 'cdVal') { this.localItems = CodeUtil.renameKeyOfItems(this.localItems, 'cdVal', this.itemCdVal) }
        this.setValue(this.value)
      })
    }
  }

  private setValue(value: any) {
    this.localItems.forEach((item: any, index: number) => {
      const targetItem = _.find(value, item2 => item[this.itemCd] === item2[this.itemCd])
      this.localValues[index] = targetItem ? 'Y' : 'N'
    })
    /**
     * 배열은 변이 메소드를 통해 수정되어야 렌더링함
     * 다시 렌더링 하기 위해 forceUpdate 추가
     * https://kr.vuejs.org/v2/guide/list.html#%EB%B3%80%EC%9D%B4-%EB%A9%94%EC%86%8C%EB%93%9C
     */
    this.$nextTick(() => {
      this.$forceUpdate()
    })
  }

  private get localValuesLength() {
    return _.countBy(this.localValues, item => item === 'Y').true || 0
  }

  /********************************************************************************
   * Validations
   ********************************************************************************/
  public checkValidation(): boolean {
    this.validationMessage = ''

    if (this.required && this.localValuesLength === 0) {
      this.validationMessage = this.$t('required') as string
    } else if ((this.maxSelect as number) < this.localValuesLength) {
      this.validationMessage = `${this.maxSelect} 개를 초과해서 선택할 수 없습니다`
    }

    this.isValidation = StringUtil.isEmpty(this.validationMessage)

    return this.isValidation
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
