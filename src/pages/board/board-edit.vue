<template>
  <div id="container" class="line">
    <div class="content dynamic-layout">
      <div class="board-write-wrap">
        <div class="board-write-title">
          <h1>게시글 수정하기</h1>
        </div>
        <div class="board-write-content">
          <div class="board-write-group">
            <s-text-field
              v-model="formData.title"
              label="제목"
              max-length="20"
              placeholder="제목을 입력해주세요!"
              :required="true"
              type="text"
            />
          </div>
          <div class="board-write-group">
            <s-text-area
              v-model="formData.detail"
              label="내용"
              max-length="20"
              placeholder="게시글 내용을 입력하세요!"
              :required="true"
              type="text"
            />
          </div>
          <div class="board-write-group board-button-wrap">
            <button class="board-write-button" @click="editPost()">
              게시글 수정하기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import STextField from '~/components/common/STextField.vue'
import SButton from '~/components/common/SButton.vue'
import { Namespace } from '~/util/Namespace'
import STextArea from '~/components/common/STextArea.vue'
import { IBoardDetail, IUpdateBoardReq } from '~/types/board/board'
import StringUtil from '~/util/StringUtil'
import { boardDetail, UpdateBoard } from '~/api/board'
import { commonStore } from '~/util/store-accessor'
import { IUserDetail } from '~/types/auth/auth'

const common = namespace(Namespace.COMMON)
@Component({
  components: { STextArea, STextField, SButton },
  layout: 'empty',
  name: 'boardEdit'
})
export default class boardWrite extends Vue {
  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/
  @common.State private userInfo!: IUserDetail
  @common.State private token!: string
  private boardInfo = {} as IBoardDetail
  private formData = {
    title: '',
    detail: '',
    userSequence: 0
  } as IUpdateBoardReq

  private boardSequence = 0
  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  async created() {
    this.boardSequence = Number(this.$route.query.boardSequence)
    await this.boardDetail()
    this.formData.title = this.boardInfo.title
    this.formData.detail = this.boardInfo.detail
  }

  private async boardDetail() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    this.boardInfo = await boardDetail(this.boardSequence)
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  }

  /********************************************************************************
   * Method (Event, Business Logic)
   ********************************************************************************/

  private async editPost(boardSequence:number) {
    if (StringUtil.isEmpty(this.formData.title) || StringUtil.isEmpty(this.formData.detail)) {
      commonStore.ADD_DIALOG({
        id: 'ERROR_EDIT',
        text: '수정 할 제목과 내용을 입력 해 주세요',
      })
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    const response: IUpdateBoardReq = await UpdateBoard(this.formData, this.boardSequence)
    if (StringUtil.isNotEmpty(response.updateYn === 'Y')) {
      commonStore.ADD_DIALOG({
        id: 'UPDATE',
        text: '게시글이 수정되었습니다!',
        callback: async () => {
          if (this.token) {
            await this.$router.push({
              path: '/board/board-detail',
              query: {
                boardSequence: this.boardSequence.toString()
              }
            })
          }
        }
      })
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  }
}

</script>
