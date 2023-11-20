<template>
  <v-dialog :max-width="localWidth" :transition="transition" :value="true" persistent>
    <v-card>
      <v-card-title class="headline none">
        <div class="pop-title">
          {{ dialog.title ? dialog.title : '확인' }}
        </div>
      </v-card-title>
      <v-card-text>
        <div class="pop-con dialog">
          <div v-for="(text, index) in dialog.text.split('\n')" :key="index">
            {{ text }}
          </div>
        </div>
      </v-card-text>

      <v-card-actions v-if="!dialog.type" class="none">
        <s-button class="kbtn-line-solid round sm" @click="onClose(dialog.id, localResultType.CONFIRM)">
          확인
        </s-button>
      </v-card-actions>

      <v-card-actions v-if="dialog.type === localDialogType.CONFIRM_CANCEL" class="none">
        <s-button class="kbtn-line round sm" @click="onClose(dialog.id, localResultType.CANCEL)">
          취소
        </s-button>
        <s-button class="kbtn-line-solid round sm" @click="onClose(dialog.id, localResultType.CONFIRM)">
          확인
        </s-button>
      </v-card-actions>

      <v-card-actions v-if="dialog.type === localDialogType.YES_NO" class="none">
        <s-button class="kbtn-line-solid round sm" @click="onClose(dialog.id, localResultType.YES)">
          예
        </s-button>
        <s-button class="kbtn-line round sm" @click="onClose(dialog.id, localResultType.NO)">
          아니요
        </s-button>
      </v-card-actions>

      <v-card-actions v-if="dialog.type === localDialogType.TRANSFER_CANCEL" class="none">
        <s-button class="kbtn-line round sm" @click="onClose(dialog.id, localResultType.CANCEL)">
          취소
        </s-button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator'

import { Globals } from '../../util/Globals'
import { DIALOG_RESULT, DIALOG_TYPE, IDialog, IDialogResult } from '../../types/common'
import SButton from './SButton.vue'

@Component({
  name: 'SDialog',
  components: { SButton }
})
export default class SDialog extends Vue {
  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/
  private localDialogType = DIALOG_TYPE
  private localResultType = DIALOG_RESULT
  private localWidth = Globals.DIALOG_WIDTH

  /********************************************************************************
   * Properties
   ********************************************************************************/
  @Prop({ default: '' }) private readonly transition!: string
  @Prop() private readonly dialog!: IDialog
  @Prop() private readonly width?: number

  @Emit('close')
  private onClose (id: string, result: DIALOG_RESULT): IDialogResult {
    if (this.dialog.callback) {
      this.dialog.callback(result)
    }
    return {
      id,
      result
    }
  }

  /********************************************************************************
   * Method (Event, Business Logic)
   ********************************************************************************/
  created (): void {
    if (this.width) {
      this.localWidth = this.width
    }
  }
}
</script>
