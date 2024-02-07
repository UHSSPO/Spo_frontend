<template>
  <div class="exploreWrap">
    <div class="exploreItem">
      <h3>테마별 탐색</h3>
      <div class="exploreBtn">
        <button @click="changeOrder('prev')">
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z" /></svg>
        </button>
        <button @click="changeOrder('next')">
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z" /></svg>
        </button>
      </div>
    </div>
    <ul v-show="currentOrder === 'views'">
      <li v-for="(item, index) in theme" :key="index">
        <p class="exploreListTile">
          {{ item.highViews }}
        </p>
      </li>
      <li v-for="(item, index) in highViews" :key="index">
        <p>{{ item.itmsNm }}</p>
        <span>{{ item.clpr }}</span>
        <span class="textBlue">{{ item.fltRt }}</span>
      </li>
    </ul>
    <ul v-show="currentOrder === 'asc'">
      <li v-for="(item, index) in theme" :key="index">
        <p class="exploreListTile">
          {{ item.increaseStock }}
        </p>
      </li>
      <li v-for="(item, index) in increaseStock" :key="index">
        <p>{{ item.itmsNm }}</p>
        <span>{{ item.clpr }}</span>
        <span class="textBlue">{{ item.fltRt }}</span>
      </li>
    </ul>
    <ul v-show="currentOrder === 'desc'">
      <li v-for="(item, index) in theme" :key="index">
        <p class="exploreListTile">
          {{ item.declineStock }}
        </p>
      </li>
      <li v-for="(item, index) in declineStock" :key="index">
        <p>{{ item.itmsNm }}</p>
        <span>{{ item.clpr }}</span>
        <span class="textBlue">{{ item.fltRt }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { IDeclineStock, IHighViews, IIncreaseStock, IMarketIndex, ITheme } from '~/types/home/home'

@Component({
  layout: 'empty',
  components: {}
})
export default class Explore extends Vue {
  @Prop() private readonly theme!: Array<ITheme>

  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  created(): void {
    console.log('/explore')
  }

  private orders: string[] = ['views', 'asc', 'desc']
  private currentOrderIndex = 0

  get currentOrder(): string {
    return this.orders[this.currentOrderIndex]
  }

  changeOrder(direction: string): void {
    if (direction === 'next') {
      this.currentOrderIndex = (this.currentOrderIndex + 1) % this.orders.length
    } else if (direction === 'prev') {
      this.currentOrderIndex = (this.currentOrderIndex - 1 + this.orders.length) % this.orders.length
    }
  }
}

</script>
