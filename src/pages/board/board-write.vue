<template>
  <div id="container" class="line">
    <div class="content dynamic-layout">
      <div class="board-write-wrap">
        <div class="board-write-title">
          <h1>게시글 작성하기</h1>
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
              max-length="100"
              placeholder="게시글 내용을 입력하세요!"
              :required="true"
              type="text"
            />
          </div>
          <div class="board-write-group board-button-wrap">
            <button class="board-write-button" @click="submitPost()">
              게시글 작성하기
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
import { ICreate } from '~/types/board/board'
import StringUtil from '~/util/StringUtil'
import { commonStore } from '~/util/store-accessor'
import { CreateBoard } from '~/api/board'

const common = namespace(Namespace.COMMON)
@Component({
  components: { STextArea, STextField, SButton },
  layout: 'empty',
  name: 'boardWrite'
})
export default class boardWrite extends Vue {
  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/

  private formData = {
    title: '',
    detail: ''
  } as ICreate

  /********************************************************************************
   * Method (Event, Business Logic)
   ********************************************************************************/
  private async submitPost() {
    if (StringUtil.isEmpty(this.formData.title) && StringUtil.isEmpty(this.formData.detail)) {
      return false
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    const response: ICreate = await CreateBoard(this.formData)
    if (StringUtil.isNotEmpty(response)) {
      await this.$router.push('/')
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
    commonStore.ADD_DIALOG({
      id: 'CREATE',
      text: '게시글이 생성되었습니다!',
      callback: () => {
        this.$router.push('/')
      }
    })
  }
}

</script>
