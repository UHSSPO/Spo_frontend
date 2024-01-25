<template>
  <!--      <template>-->
  <!--        <v-carousel>-->
  <!--          <v-carousel-item-->
  <!--            v-for="(item,i) in items"-->
  <!--            :key="i"-->
  <!--            :src="item.src"-->
  <!--            reverse-transition="fade-transition"-->
  <!--            transition="fade-transition"-->
  <!--          />-->
  <!--        </v-carousel>-->
  <!--      </template>-->
  <div class="roller-container">
    <div class="rolling-banner">
      <div class="wrap">
        <div class="roller">
          <ul>
            <li v-for="(item, index) in marketIndex" :key="index" class="kapi">
              <a href="#">
                <strong class="name">{{ item.idxNm }}</strong>
                <span class="status down">
                  <span class="num">{{ item.clpr | setDecimalNumberComma }}</span>
                  <span v-if="item.fltRt === 0" class="zero"><em>{{ item.fltRt }}</em></span>
                  <span v-else class="rate" :class="{minus: item.fltRt < 0}"><em>{{ item.fltRt }}</em></span>
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

import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { IMarketIndex } from '~/types/home/home'
import { MarketIndex } from '~/api/home'

@Component({
  layout: 'empty',
  components: {}
})
export default class IndexInfo extends Vue {
  /********************************************************************************
   * Properties
   ********************************************************************************/
  @Prop() private readonly marketIndex!: Array<IMarketIndex>

  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  mounted() {
    this.privateRoller()
  }

  private intervalId: number | null = null
  private currentSlide = 0
  private items = [
    {
      src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
    },
    {
      src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
    },
    {
      src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
    },
    {
      src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
    },
  ]

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

    if (roller1 && roller2 && rollerUl) {
      roller1.style.left = '0px'
      roller2.style.left = rollerUl.offsetWidth + 'px'
    } else {
      console.error('One or more elements not found.')
    }

    roller.classList.add('original')
    clone.classList.add('clone')
  }
}

</script>
