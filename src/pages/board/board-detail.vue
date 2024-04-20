<template>
  <div id="container" class="line">
    <div class="content dynamic-layout">
      <div class="rank-wrap">
        <div class="commend-wrap w-100">
          <div v-if="boardInfo" class="board-detail-wrap">
            <div class="board-detail-wrap-title">
              <div class="board-detail-item">
                <h1 class="board-item-title">
                  {{ boardInfo.title }}
                </h1>
                <div v-if="boardAuth" class="board-detail-button-wrap">
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
              <div v-for="(item, index) in boardInfo.boardComment" :key="index" class="board-detail-comment">
                <div v-if="isCommentCheck && boardCommentSequence === item.boardCommentSequence" class="dis-flex-space">
                  <s-text-field
                    v-model="updateCommentData.comment"
                    max-length="20"
                    placeholder="수정할 댓글을 입력해주세요!"
                    :required="true"
                    :single-line="true"
                    type="text"
                    class="mr-3"
                  />
                  <button class="board-detail-edit-button mr-3" @click="editComment()">
                    댓글 수정하기
                  </button>
                  <button class="board-detail-edit-button" @click="isCommentCheck = !isCommentCheck">
                    취소
                  </button>
                </div>
                <div v-else class="board-detail-comment-content">
                  <ul class="dis-flex">
                    <li>
                      {{ item.comment }}
                    </li>
                    <li>
                      {{ item.nickName }}
                    </li>
                    <li>
                      {{ StringUtil.dateTimeString(item.createAt) }}
                    </li>
                  </ul>
                  <div v-if="item.userSequence === userInfo.userSequence" class="board-detail-comment-board">
                    <a @click="onClickUpdateComment(item)">수정</a>
                    <a @click="deleteComment(item.boardCommentSequence)">삭제</a>
                  </div>
                </div>
              </div>
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
              <button class="board-write-button" @click="submitComment(boardInfo.boardSequence)">
                댓글 작성하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">

import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { commonStore } from '~/util/store-accessor'
import { Namespace } from '~/util/Namespace'
import { IUserDetail } from '~/types/auth/auth'
import STextField from '~/components/common/STextField.vue'
import StringUtil from '~/util/StringUtil'
import {
  ICreateComment,
  IBoardDetail,
  IUpdateBoardCommentReq,
  ISpoBoardComment,
} from '~/types/board/board'
import { boardDetail, CreateComment, DeleteBoard, DeleteBoardComment, UpdateComment } from '~/api/board'
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
  private boardCommentSequence = 0
  @common.State private token!: string
  @common.State private userInfo!: IUserDetail
  private isCommentCheck = false
  private boardAuth = false

  private formData = {
    comment: ''
  } as ICreateComment

  private updateCommentData = {
    comment: '',
    userSequence: 0
  } as IUpdateBoardCommentReq

  async created() {
    this.boardSequence = Number(this.$route.query.boardSequence)
    await this.boardDetail()
  }

  private async boardDetail() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    this.boardInfo = await boardDetail(this.boardSequence)
    console.log(this.boardInfo)
    this.boardAuth = this.userInfo?.userSequence === this.boardInfo?.userSequence
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  }

  /********************************************************************************
   * Method (Event, Business Logic)
   ********************************************************************************/

  private onClickToBoardWrite(boardSequence: number) {
    commonStore.CHECK_LOGIN()
    if (this.token) {
      this.$router.push(`/board/board-edit?boardSequence=${boardSequence}`)
    }
  }

  private async editComment() {
    if (StringUtil.isEmpty(this.updateCommentData.comment)) {
      commonStore.ADD_DIALOG({
        id: 'ERROR_UPDATE',
        text: '수정 할 댓글을 입력 해 주세요',
      })
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    const response: IUpdateBoardCommentReq = await UpdateComment(this.updateCommentData, this.boardCommentSequence)
    if (StringUtil.isNotEmpty(response.updateYn === 'Y')) {
      commonStore.ADD_DIALOG({
        id: 'SUCCESS_UPDATE',
        text: '수정이 완료 됐어요',
        callback: async () => {
          await this.boardDetail()
          this.isCommentCheck = !this.isCommentCheck
        }
      })
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  }

  private async deleteComment(boardCommentSequence:number) {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    const response = await DeleteBoardComment(boardCommentSequence)
    console.log(response)
    if (StringUtil.isNotEmpty(response.deleteYn === 'Y')) {
      commonStore.ADD_DIALOG({
        id: 'DELETE_COMMENT',
        text: '댓글이 삭제되었습니다!',
        callback: async () => {
          await this.boardDetail()
        }
      })
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  }

  private async deleteBoard(boardSequence: number) {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    const response = await DeleteBoard(boardSequence)
    if (StringUtil.isNotEmpty(response.deleteYn === 'Y')) {
      await this.$router.push('/')
      commonStore.ADD_DIALOG({
        id: 'DELETE',
        text: '게시글이 삭제되었습니다!',
        callback: async () => {
          await this.boardDetail()
        }
      })
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  }

  private async submitComment(boardSequence:number) {
    if (StringUtil.isEmpty(this.formData.comment)) {
      return false
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    const response: ICreateComment = await CreateComment(this.formData, this.boardSequence)
    if (StringUtil.isNotEmpty(response.createYn === 'Y')) {
      this.formData.comment = ''
      commonStore.ADD_DIALOG({
        id: 'CREATE',
        text: '댓글이 생성되었습니다!',
        callback: async () => {
          await this.boardDetail()
        },
      })
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  }

  private onClickUpdateComment(boardCommentInfo: ISpoBoardComment) {
    this.isCommentCheck = !this.isCommentCheck
    this.boardCommentSequence = boardCommentInfo.boardCommentSequence
    this.updateCommentData.comment = boardCommentInfo.comment
    this.updateCommentData.userSequence = boardCommentInfo.userSequence
  }
}
</script>
