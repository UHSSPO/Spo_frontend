<template>
  <div id="container" class="line">
    <div class="content dynamic-layout">
      <div class="rank-wrap">
        <div class="commend-wrap w-100">
          <div class="board-detail-wrap">
            <div class="board-detail-wrap-title">
              <div class="board-detail-item">
                <h1 class="board-item-title">
                  {{ boardInfo.title }}
                </h1>
                <div class="board-detail-button-wrap">
                  <button class="board-detail-edit-button" @click="onClickToBoardWrite(boardInfo.boardSequence)">
                    수정
                  </button>
                  <button class="board-detail-delete-button" @click="deleteBoard(boardInfo.boardSequence)">
                    삭제
                  </button>
                </div>
              </div>
            </div>
            <div class="board-detail-wrap-content">
              <div class="board-detail-item">
                <p class="board-item-content">
                  {{ boardInfo.detail }}
                </p>
              </div>
            </div>
            <div class="board-detail-comments-section">
              <h2 class="board-detail-comments-title">
                댓글
              </h2>
              <div class="board-detail-comment">
                <ul class="board-detail-comment-content">
                  <li>{{ boardInfo.boardComment }}</li>
                  <li>{{ boardInfo.nickName }}</li>
                  <li>{{ boardInfo.createAt }}</li>
                </ul>
                <div class="board-detail-comment-board">
                  <a @click="onClickCommentEdit">수정</a>
                  <a>삭제</a>
                </div>
              </div>
              <div class="board-detail-comment">
                <div class="board-detail-comment-content">
                  <ul class="board-detail-comment-content">
                    <li>{{ boardInfo.boardComment }}</li>
                    <li>{{ boardInfo.nickName }}</li>
                    <li>{{ boardInfo.createAt }}</li>
                  </ul>
                </div>
              </div>

              <div v-if="isCommentCheck" class="board-detail-comments-write-wrap">
                <h2 class="board-detail-comments-write-title">
                  댓글 수정
                </h2>
                <s-text-field
                  max-length="20"
                  placeholder="수정할 댓글을 입력해주세요!"
                  :required="true"
                  :single-line="true"
                  type="text"
                />
              </div>

              <div class="board-detail-comments-write-wrap">
                <h2 class="board-detail-comments-write-title">
                  댓글 작성
                </h2>
                <s-text-field
                  v-model="formData.comment"
                  max-length="20"
                  placeholder="댓글을 입력해주세요!"
                  :required="true"
                  :single-line="true"
                  type="text"
                />
                <button class="board-write-button" @click="submitComment(boardSequence)">
                  댓글 작성하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">

import { Component, namespace, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { commonStore } from '~/util/store-accessor'
import { Namespace } from '~/util/Namespace'
import { IUserDetail } from '~/types/auth/auth'
import STextField from '~/components/common/STextField.vue'
import StringUtil from '~/util/StringUtil'
import { ICreateComment, IBoardDetail } from '~/types/board/board'
import { boardDetail, CreateComment, DeleteBoard } from '~/api/board'
const common = namespace(Namespace.COMMON)
@Component({
  layout: 'empty',
  components: { STextField },
  name: 'createComment'
})
export default class Board extends Vue {
  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/
  private boardInfo = {} as IBoardDetail
  private boardSequence = 0
  @common.State private token!: string
  @common.State private userInfo!: IUserDetail
  private isCommentCheck = false
  private formData = {
    comment: ''
  } as ICreateComment

  /********************************************************************************
   * Method (Event, Business Logic)
   ********************************************************************************/

  private onClickToBoardWrite(boardSequence: number) {
    commonStore.CHECK_LOGIN()
    if (this.token) {
      this.$router.push(`/board/board-edit?boardSequence=${boardSequence}`)
    }
  }

  private onClickCommentEdit() {
    this.isCommentCheck = !this.isCommentCheck
  }

  private async deleteBoard(boardSequence: number) {
    // 게시글 삭제 요청
    const response = await DeleteBoard(boardSequence)
    if (StringUtil.isNotEmpty(response)) {
      // 성공적으로 삭제되면 홈페이지로 이동
      await this.$router.push('/')
      commonStore.ADD_DIALOG({
        id: 'DELETE',
        text: '게시글이 삭제되었습니다!',
        callback: () => {
          this.$router.push('/')
        },
      })
    } else {
      // 삭제 실패 시 처리
      console.error('게시글 삭제 실패')
      commonStore.ADD_DIALOG({
        id: 'DELETE',
        text: '게시글 삭제에 실패했습니다.',
        callback: () => {
          // 실패 시 보통 홈페이지로 이동하거나 다른 방식으로 처리
          this.$router.push('/')
        },
      })
    }
  }

  private async submitComment(boardSequence:number) {
    if (StringUtil.isEmpty(this.formData.comment)) {
      return false
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    const response: ICreateComment = await CreateComment(this.formData, this.boardSequence)
    if (StringUtil.isNotEmpty(response)) {
      await this.$router.push('/')
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
    commonStore.ADD_DIALOG({
      id: 'CREATE',
      text: '댓글이 생성되었습니다!',
      callback: () => {
        this.$router.push('/')
      }
    })
  }
}
</script>
