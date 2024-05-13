<template>
  <div class="roller-container">
    <div class="rolling-banner">
      <div class="wrap">
        <div class="roller">
          <ul>
            <li v-for="(item, index) in pickList" :key="index" class="kapi" style="width: calc(100%/6)">
              <a href="#">
                <strong class="name">{{ item.itmsNm }}</strong>
                <span class="status down">
                  <span class="num">{{ item.clpr | setDecimalNumberComma }}</span>
                  <span v-if="item.fltRt === 0" class="zero"><em>{{ item.fltRt }}</em></span>
                  <span v-else :class="{minus: item.fltRt < 0, plus: item.fltRt > 0}"><em>{{ item.fltRt }}</em></span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, namespace, Prop, Vue } from 'nuxt-property-decorator'
import { IMarketIndex } from '~/types/home/home'
import { MarketIndex } from '~/api/stock'
import { ICommendPersonalStock } from '~/types/user/user'
import { Namespace } from '~/util/Namespace'
const common = namespace(Namespace.COMMON)
@Component({
  layout: 'empty',
  components: {}
})
export default class UserPick extends Vue {
  /********************************************************************************
   * Properties
   ********************************************************************************/
  // @Prop() private readonly pickList!: Array<ICommendPersonalStock>
  @common.State private pickList!: Array<ICommendPersonalStock>
  /********************************************************************************
   * Life Cycle
   ********************************************************************************/

  mounted() {
    this.privateRoller()
  }

  private privateRoller(): void {
    const roller: HTMLElement | null = document.querySelector('.roller')
    if (!roller) {
      console.error('Roller element not found.')
      return
    }

    roller.id = 'roller1'

    const clone: HTMLElement = roller.cloneNode(true) as HTMLElement
    clone.id = 'roller2'
    const wrap: HTMLElement | null = document.querySelector('.wrap')
    if (!wrap) {
      console.error('Wrap element not found.')
      return
    }
    wrap.appendChild(clone)

    const roller1: HTMLElement | null = document.querySelector('#roller1')
    const roller2: HTMLElement | null = document.querySelector('#roller2')
    const rollerUl: HTMLElement | null = document.querySelector('.roller ul')

    roller.classList.add('original')
    clone.classList.add('clone')
  }
}

</script>
