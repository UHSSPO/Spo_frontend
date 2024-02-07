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
      <li>
        <p class="exploreListTile">
          조회수 높은순
        </p>
      </li>
      <li v-for="(item, index) in theme.highViews" :key="index">
        <p>{{ item.itmsNm }}</p>
        <span>{{ item.clpr }}</span>
        <span class="textBlue">{{ item.fltRt }}</span>
      </li>
    </ul>
    <ul v-show="currentOrder === 'asc'">
      <li>
        <p class="exploreListTile">
          등락률 높은순
        </p>
      </li>
      <li v-for="(item, index) in theme.increaseStock" :key="index">
        <p>{{ item.itmsNm }}</p>
        <span>{{ item.clpr }}</span>
        <span class="textBlue">{{ item.fltRt }}</span>
      </li>
    </ul>
    <ul v-show="currentOrder === 'desc'">
      <li>
        <p class="exploreListTile">
          하락률 높은순
        </p>
      </li>
      <li v-for="(item, index) in theme.declineStock" :key="index">
        <p>{{ item.itmsNm }}</p>
        <span>{{ item.clpr }}</span>
        <span class="textBlue">{{ item.fltRt }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { IMarketIndex, ITheme, IThemeStockInfo } from '~/types/home/home'

@Component({
  layout: 'empty',
  components: {}
})
export default class Explore extends Vue {
  /********************************************************************************
   * Properties
   ********************************************************************************/
  @Prop() private readonly theme!: ITheme

  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/
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
