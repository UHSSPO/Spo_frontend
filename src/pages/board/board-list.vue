<template>
  <div id="container" class="line">
    <div class="board-all">
      <div class="board-title-all">
        <h3>게시판</h3>
        <a @click="onClickToBoardWrite(userInfo.userSequence)">게시물 작성하기</a>
      </div>
      <ul class="board-list-all">
        <li class="board-array">
          <div v-for="(item, index) in board" :key="index" class="board-list-wrap">
            <div class="board-title-name">
              {{ item.nickName }}
            </div>
            <div class="board-list-detail">
              {{ item.title }}
            </div>
            <div>
              {{ item.detail }}
            </div>
            <div>
              <a @click="onClickToBoard(item.boardSequence)">더보기</a>
            </div>
            <div>
              <div>{{ StringUtil.dateTimeString(item.createAt) }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { commonStore } from '~/util/store-accessor'
import { Namespace } from '~/util/Namespace'
import { IUserDetail } from '~/types/auth/auth'
import { ISpoBoard } from '~/types/board/board'
import { SpoBoard } from '~/api/board'
import SDataTable from '~/components/common/SDataTable.vue'

const common = namespace(Namespace.COMMON)
@Component({
  methods: { SpoBoard },
  layout: 'empty',
  components: { SDataTable }
})
export default class Board extends Vue {
  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/
  @common.State private token!: string
  @common.State private userInfo!: IUserDetail
  private boardSequence = 0
  private board = {} as ISpoBoard

  async created() {
    this.boardSequence = Number(this.$route.query.boardSequence)
    await this.boardDetail()
  }

  private async boardDetail() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    this.board = await SpoBoard()
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  }

  /********************************************************************************
   * Method (Event, Business Logic)
   ********************************************************************************/

  private onClickToBoardWrite(userSequence: number) {
    commonStore.CHECK_LOGIN()
    if (this.token) {
      this.$router.push(`/board/board-write?userSequence=${userSequence}`)
    }
  }

  private onClickToBoard(boarSequence: number) {
    commonStore.CHECK_LOGIN()
    if (this.token) {
      this.$router.push({
        path: '/board/board-detail',
        query: {
          boardSequence: boarSequence.toString()
        }
      })
    }
  }
}

</script>
