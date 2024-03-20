<template>
  <div class="exploreWrap">
    <div class="exploreItem">
      <h3>테마별 탐색</h3>
      <div class="exploreBtn">
        <s-button @click="changeOrder('prev')">
          <v-icon>
            mdi-chevron-left
          </v-icon>
        </s-button>
        <s-button @click="changeOrder('next')">
          <v-icon>
            mdi-chevron-right
          </v-icon>
        </s-button>
      </div>
    </div>
    <ul v-show="currentOrder === 'views'">
      <li>
        <p class="exploreListTile">
          조회수 높은순
        </p>
      </li>
      <li v-for="(item, index) in theme.highViews" :key="index">
        <a class="font-black" @click="onClickToDetails(item.stockInfoSequence)">
          <p>
            {{ item.itmsNm }}
          </p>
        </a>
        <span>{{ item.clpr | setNumberComma }}</span>
        <span v-if="item.fltRt === 0">
          {{ item.fltRt }}
        </span>
        <span v-else :class="{minus: item.fltRt < 0, plus: item.fltRt > 0}">
          {{ item.fltRt }}
        </span>
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
        <span>{{ item.clpr | setNumberComma }}</span>
        <span v-if="item.fltRt === 0">
          {{ item.fltRt }}
        </span>
        <span v-else :class="{minus: item.fltRt < 0, plus: item.fltRt > 0}">
          {{ item.fltRt }}
        </span>
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
        <span>{{ item.clpr | setNumberComma }}</span>
        <span v-if="item.fltRt === 0">
          {{ item.fltRt }}
        </span>
        <span v-else :class="{minus: item.fltRt < 0, plus: item.fltRt > 0}">
          {{ item.fltRt }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">

import { Component, namespace, Prop, Vue } from 'nuxt-property-decorator'
import { IMarketIndex, ITheme, IThemeStockInfo } from '~/types/home/home'
import SButton from '~/components/common/SButton.vue'
import StringUtil from '~/util/StringUtil'
import { commonStore } from '~/util/store-accessor'
import { Namespace } from '~/util/Namespace'
const common = namespace(Namespace.COMMON)

@Component({
  layout: 'empty',
  components: { SButton }
})
export default class Explore extends Vue {
  /********************************************************************************
   * Properties
   ********************************************************************************/
  @Prop() private readonly theme!: ITheme
  @common.State private token!: string
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

  private onClickToDetails(stockInfoSequence: number) {
    if (StringUtil.isEmpty(this.token)) {
      commonStore.ADD_DIALOG({
        id: 'ERROR',
        text: '로그인이 필요한 서비스입니다!'
      })
    } else {
      this.$router.push({
        name: 'detail',
        query: {
          stockInfoSequence: stockInfoSequence.toString()
        }
      })
    }
  }
}

</script>
