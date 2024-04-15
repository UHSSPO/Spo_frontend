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
import { IUpdateBoardReq } from '~/types/board/board'
import StringUtil from '~/util/StringUtil'
import { UpdateBoard } from '~/api/board'
import { commonStore } from '~/util/store-accessor'
import { ISelectMyInfoRes } from '~/types/user/user'

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
  @common.State private token!: string
  private userSequence = 0

  private formData = {
    title: '',
    detail: ''
  } as IUpdateBoardReq

  /********************************************************************************
   * Method (Event, Business Logic)
   ********************************************************************************/

  private async editPost(userSequence:number) {
    if (!this.userSequence) {
      console.error('userSequence가 없습니다.')
      return
    }
    if (StringUtil.isEmpty(this.formData.title) && StringUtil.isEmpty(this.formData.detail)) {
      return false
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    const response: IUpdateBoardReq = await UpdateBoard(this.formData, this.userSequence)
    if (StringUtil.isNotEmpty(response)) {
      await this.$router.push('/')
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
    commonStore.ADD_DIALOG({
      id: 'UPDATE',
      text: '게시글이 수정되었습니다!',
      callback: () => {
        this.$router.push('/')
      }
    })
  }
}

</script>
