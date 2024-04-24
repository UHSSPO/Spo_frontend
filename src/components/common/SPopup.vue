<template>
  <v-dialog
    :close-btn="closeBtn"
    :fullscreen="fullscreen"
    :hide-overlay="hideOverlay"
    :max-width="localWidth"
    :width="width"
    :persistent="persistent"
    :transition="transition"
    :value="true"
    :retain-focus="localRetainFocus"
    no-click-animation
    @close="onClose"
    @keydown.esc="onKeydown"
    @click:outside="onClose"
  >
    <v-card flat :elevation="0" :class="[maxHeight ? 'max-height' : '']">
      <v-card-title class="headline">
        <div v-if="fullscreen" class="pop-full">
          <s-button icon="mdi-back" @click="onClose" />
          <div class="tit-con">
            {{ title }}
          </div>
        </div>
        <!-- x 버튼 노출시  -->
        <div v-else-if="closeBtn" class="pop-close">
          <button class="clse" @click="onClose" />
          <div class="tit-con">
            {{ title }}
          </div>
        </div>
        <div v-else class="pop-title">
          {{ title }}
        </div>
      </v-card-title>
      <v-card-text>
        <slot />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator'
import SButton from '~/components/common/SButton.vue'

import { Globals } from '~/util/Globals'

// <s-popup
// v-if="testPopup"
//   close-btn
// persistent
//   :title="'abc'"
// @close="testPopup = false"
//   >
@Component({
  name: 'KPopup',
  components: {
    SButton
  }
})
export default class KPopup extends Vue {
  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/
  private localWidth = Globals.DIALOG_WIDTH
  private localRetainFocus = true

  /********************************************************************************
   * Properties
   ********************************************************************************/
  @Prop(String) private readonly title!: string
  @Prop(String) private readonly text!: string
  @Prop(Boolean) private readonly fullscreen?: boolean
  @Prop(Boolean) private readonly closeBtn?: boolean
  @Prop(Boolean) private readonly persistent?: boolean
  @Prop(Boolean) private readonly hideOverlay?: boolean
  @Prop(Boolean) private readonly maxHeight?: boolean
  @Prop(Boolean) private readonly retainFocus?: boolean
  @Prop() private readonly width?: number
  @Prop({ default: '' }) private readonly transition?: string

  @Emit('close')
  private onClose(): any {
    return null
  }

  @Emit('click:outside')
  private onClickOutside(eventValue: boolean): any {
    return eventValue
  }

  @Emit('open')
  private onOpen(): any {
    return null
  }

  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  created(): void {
    if (this.width) { this.localWidth = this.width }
    this.onOpen()
    if (this.retainFocus) {
      this.localRetainFocus = false
    }
  }

  /********************************************************************************
   * Method (Event, Business Logic)
   ********************************************************************************/
  private onKeydown() {
    if (!this.persistent) {
      this.onClose()
    }
  }
}
</script>

<style lang="scss">
/*-----------------------------------------------------------------
Popup dialog
-----------------------------------------------------------------*/
.v-application .headline{
  .pop-title{
    font-weight:400 !important;
    font-size:20px !important;
    color:#121212 !important;
    line-height:1;
  }
  &.none{
    border:0 !important;
  }
}
.v-dialog > .v-card > .v-card__title{
  border-bottom:1px solid #EBEDED;
  padding:30px 40px 20px;
  &.headline{
    .pop-close{
      position:relative;
      width:100%;
      button{
        position:absolute;
        top:50%;
        right:-20px;
        transform:translateY(-50%);
        float: right;
        .mdi-clse{
          margin:0;
        }
      }
      .tit-con{
        width:90%;
        margin-left:-10px;
        font-weight:400;
        font-size:24px;
        color:$fc-gry1;
      }
    }
  }
}
.v-dialog > .v-card > .v-card__text{
  padding:0;
}
.v-dialog .pop-txt{
  font-size:14px;
  color:#343434;
}
.v-dialog .pop-con{
  padding:30px 40px;
  &.dialog{
    padding:20px 40px;
    font-size:16px;
  }
  &.scroll{
    overflow:hidden;
    overflow-x:hidden;
    overflow-y:auto;
    height:450px;
  }
}
.inquiry-box {
  padding-top: 10px !important;
}
.v-dialog .form-box{
  margin-top:20px;
  .inp-set{
    margin-top:10px;
    &:first-child{
      margin-top:0;
    }
    &__tit{
      display:inline-block;
      width:70px;
      font-size:15px;
      color:#343434;
      margin-top:7px;
      vertical-align:top;
    }
    &__form{
      display:inline-block;
      width:calc(100% - 75px);
      vertical-align:middle;
    }
  }
}
.v-card .btn-area{
  padding:20px 40px;
  border-top:1px solid #EBEDED;
  &.none{
    border-top:0;
  }
  &.rgt{
    text-align:right;
  }
  &.pdn{
    padding:20px 0;
  }
  &.none-line {
    border-top: none;
  }
}
.v-card__actions{
  display:block;
  padding:20px 40px !important;
  text-align:right;
  border-top:1px solid #EBEDED;
  &.none{
    border:0 !important;
  }
}
//.v-dialog--fullscreen{
//  top:60px !important;
//  box-shadow:none !important;
//  height:calc(100% - 60px) !important;
//  overflow:hidden;
//  .pop-content{
//    height:calc(100vh - 135px);
//    overflow-x:hidden;
//    overflow-y:auto;
//  }
//}
//.v-dialog--fullscreen .v-card__title{
//  position:relative;
//  padding:20px 40px !important;
//  background:#F2F3F5;
//  height:75px !important;
//}
//.v-dialog--fullscreen .pop-full{
//  position:relative;
//  width:1460px;
//  margin:0 auto;
//  button{
//    position:absolute;
//    top:50%;
//    left:0;
//    transform:translateY(-50%);
//  }
//  .tit-con{
//    width:calc(100% - 50px);
//    margin-left:50px;
//    font-weight:400;
//    font-size:24px;
//    color: #000;
//  }
//}
.v-dialog > .v-card.max-height{
  height:670px;
  .pop-con.scroll{
    height:835px;
  }
}
.v-dialog.max-height{
  height:1000px;
}

.clse {
  background:url("~assets/image/icon_popupclose.png") no-repeat 0 0;
  border: none;
  background-color: #FFFFFF !important;
  width: 30px;
  height: 30px;
}
</style>
