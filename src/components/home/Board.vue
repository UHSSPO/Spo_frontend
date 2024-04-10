<template>
  <div class="board-wrap">
    <div class="board-title-wrap">
      <h3>게시판</h3>
      <a @click="onClickToBoardWrite(userInfo.userSequence)">게시물 작성하기</a>
    </div>
    <ul class="board-list-wrap">
      <li class="board-list">
        <div class="board-list-wrap">
          <div>해우소</div>
          <div class="board-listThird">
            <p>준비는끝났다는얘기</p>
            <span>서서히 시작되리라 조심스레 예측합니다...</span>
          </div>
          <div>
            <a @click="onClickToBoard">더보기</a>
          </div>
          <div>4시간 전</div>
        </div>
        <div class="board-list-wrap">
          <div>해우소</div>
          <div class="board-listThird">
            <p>준비는끝났다는얘기</p>
            <span>서서히 시작되리라 조심스레 예측합니다...</span>
          </div>
          <div>
            <a @click="onClickToBoard">더보기</a>
          </div>
          <div>4시간 전</div>
        </div>
        <div class="board-list-wrap">
          <div>해우소</div>
          <div class="board-listThird">
            <p>준비는끝났다는얘기</p>
            <span>서서히 시작되리라 조심스레 예측합니다...</span>
          </div>
          <div>
            <a @click="onClickToBoard">더보기</a>
          </div>
          <div>4시간 전</div>
        </div>
        <div class="board-list-wrap">
          <div>해우소</div>
          <div class="board-listThird">
            <p>준비는끝났다는얘기</p>
            <span>서서히 시작되리라 조심스레 예측합니다...</span>
          </div>
          <div>
            <a @click="onClickToBoard">더보기</a>
          </div>
          <div>4시간 전</div>
        </div>
        <div class="board-list-wrap">
          <div>해우소</div>
          <div class="board-listThird">
            <p>준비는끝났다는얘기</p>
            <span>서서히 시작되리라 조심스레 예측합니다...</span>
          </div>
          <div>
            <a @click="onClickToBoard">더보기</a>
          </div>
          <div>4시간 전</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">

import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { commonStore } from '~/util/store-accessor'
import { Namespace } from '~/util/Namespace'
import { IUserDetail } from '~/types/auth/auth'

const common = namespace(Namespace.COMMON)
@Component({
  layout: 'empty',
  components: {}
})
export default class Board extends Vue {
  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/

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

  private onClickToBoard() {
    commonStore.CHECK_LOGIN()
    if (this.token) {
      this.$router.push('/board/board-detail')
    }
  }
}

</script>
