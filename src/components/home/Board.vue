<template>
  <div class="board-wrap">
    <div class="board-title-wrap">
      <h3>게시판</h3>
      <a @click="onClickToBoardWrite(userInfo.userSequence)">게시물 작성하기</a>
    </div>
    <ul class="board-list-wrap">
      <li class="board-list">
        <div v-for="(item, idx) in spoBoard.slice(0,5)" :key="idx" class="board-list-wrap">
          <div>{{ item.nickName }}</div>
          <div class="board-listThird">
            <p>
              {{ item.title }}
            </p>
            <span> {{ item.detail }}</span>
          </div>
          <div>
            <a @click="onClickToBoard(item.boardSequence)">더보기</a>
          </div>
          <div>{{ item.createAt }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">

import { Component, namespace, Prop, Vue } from 'nuxt-property-decorator'
import { commonStore } from '~/util/store-accessor'
import { Namespace } from '~/util/Namespace'
import { IUserDetail } from '~/types/auth/auth'
import { ISpoBoard } from '~/types/board/board'
import { boardDetail } from '~/api/board'

const common = namespace(Namespace.COMMON)
@Component({
  methods: { boardDetail },
  layout: 'empty',
  components: {}
})
export default class Board extends Vue {
  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/
  @Prop() private readonly spoBoard!: Array<ISpoBoard>
  @common.State private token!: string
  @common.State private userInfo!: IUserDetail

  /********************************************************************************
   * Method (Event, Business Logic)
   ********************************************************************************/

  private onClickToBoardWrite(userSequence: number) {
    commonStore.CHECK_LOGIN()
    if (this.token) {
      this.$router.push(`/board/board-write?userSequence=${userSequence}`)
    }
  }

  private onClickToBoard(boardSequence:number) {
    commonStore.CHECK_LOGIN()
    if (this.token) {
      // this.$router.push(`/board/board-detail/boardSequence=${boardSequence}`)
      this.$router.push({
        path: '/board/board-detail',
        query: {
          boardSequence: boardSequence.toString()
        }
      })
    }
  }
}

</script>
