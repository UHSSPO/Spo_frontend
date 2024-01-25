<template>
  <div id="container" class="line">
    <div class="content">
      <div class="rankWrap">
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
                조회수가 높은 순
              </p>
            </li>
            <li>
              <p>두나무</p>
              <span>115,000원</span>
              <span class="textBlue">-10.16%</span>
            </li>
            <li>
              <p>에이피알</p>
              <span>364,000원</span>
              <span class="textRed">+3.7%</span>
            </li>
            <li>
              <p>지엔티파마</p>
              <span>20,100원</span>
              <span class="textBlue">-0.50%</span>
            </li>
            <li>
              <p>비바리퍼블리카</p>
              <span>49,900원</span>
              <span class="textBlue">-2.16%</span>
            </li>
            <li>
              <p>그래핀스퀘어</p>
              <span>172,000원</span>
              <span class="textBlue">-0.58%</span>
            </li>
          </ul>
          <ul v-show="currentOrder === 'asc'">
            <li>
              <p class="exploreListTile">
                상승률 높은 순
              </p>
            </li>
            <li>
              <p>두나무</p>
              <span>115,000원</span>
              <span class="textBlue">-10.16%</span>
            </li>
            <li>
              <p>에이피알</p>
              <span>364,000원</span>
              <span class="textRed">+3.7%</span>
            </li>
            <li>
              <p>지엔티파마</p>
              <span>20,100원</span>
              <span class="textBlue">-0.50%</span>
            </li>
            <li>
              <p>비바리퍼블리카</p>
              <span>49,900원</span>
              <span class="textBlue">-2.16%</span>
            </li>
            <li>
              <p>그래핀스퀘어</p>
              <span>172,000원</span>
              <span class="textBlue">-0.58%</span>
            </li>
          </ul>
          <ul v-show="currentOrder === 'desc'">
            <li>
              <p class="exploreListTile">
                하략률 높은 순
              </p>
            </li>
            <li>
              <p>두나무</p>
              <span>115,000원</span>
              <span class="textBlue">-10.16%</span>
            </li>
            <li>
              <p>에이피알</p>
              <span>364,000원</span>
              <span class="textRed">+3.7%</span>
            </li>
            <li>
              <p>지엔티파마</p>
              <span>20,100원</span>
              <span class="textBlue">-0.50%</span>
            </li>
            <li>
              <p>비바리퍼블리카</p>
              <span>49,900원</span>
              <span class="textBlue">-2.16%</span>
            </li>
            <li>
              <p>그래핀스퀘어</p>
              <span>172,000원</span>
              <span class="textBlue">-0.58%</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  layout: 'empty',
  components: {}
})
export default class explore extends Vue {
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
