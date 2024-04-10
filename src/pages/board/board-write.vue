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
              label="제목"
              max-length="20"
              placeholder="제목을 입력해주세요!"
              :required="true"
              type="text"
            />
          </div>
          <div class="board-write-group">
            <s-text-area
              label="내용"
              max-length="20"
              placeholder="게시글 내용을 입력하세요!"
              :required="true"
              type="text"
            />
          </div>
          <div class="board-write-group board-button-wrap">
            <button class="board-write-button">
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

const common = namespace(Namespace.COMMON)
@Component({
  components: { STextArea, STextField, SButton },
  layout: 'empty',
  name: 'login'
})
export default class boardWrite extends Vue {
  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/

  // private formData = {
  //   title: ''
  // } as ILogin

  /********************************************************************************
   * Method (Event, Business Logic)
   ********************************************************************************/
}

</script>
