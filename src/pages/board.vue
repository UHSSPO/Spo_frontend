<template>
  <div id="container" class="line">
    <div class="content dynamic-layout">
      <div class="rank-wrap">
        <div class="commend-wrap w-100">
          <div class="board-detail-wrap">
            <div class="board-detail-wrap-title">
              <div class="board-detail-item">
                <h1 class="board-item-title">
                  준비는끝났다는얘기
                </h1>
                <div class="board-detail-button-wrap">
                  <button class="board-detail-edit-button" @click="onClickToBoardWrite(userInfo.userSequence)">
                    수정
                  </button>
                  <button class="board-detail-delete-button">
                    삭제
                  </button>
                </div>
              </div>
            </div>
            <div class="board-detail-wrap-content">
              <div class="board-detail-item">
                <p class="board-item-content">
                  서서히 시작되리라 조심스레 예측합니다. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate eos eveniet harum impedit quibusdam quo recusandae sint sit vitae. Alias beatae dicta enim est expedita. Adipisci aut consequuntur delectus error eveniet in ipsum laboriosam magni molestias nisi nobis non nulla obcaecati, pariatur, possimus provident quis soluta totam vel voluptatibus. Beatae consequuntur ducimus error expedita laudantium modi molestias nobis, quae sed totam! Accusamus, alias aspernatur, atque dicta distinctio explicabo illo ipsam iste laboriosam magni maiores modi neque nihil nulla perferendis perspiciatis provident quibusdam quis quos, ratione rem repellat voluptatem voluptates. Corporis distinctio enim eveniet quisquam suscipit, vel voluptas! Accusantium, aliquam distinctio eligendi error ex fugiat id in incidunt ipsum, modi nihil non obcaecati odio officia repudiandae tempore ullam voluptatum. Accusantium alias distinctio, ea error, exercitationem expedita impedit ipsam ipsum minima modi quas quibusdam sit voluptatem! Alias amet deleniti in minima modi nam nemo neque nulla quo? Accusamus ad assumenda beatae consectetur culpa, ducimus enim esse ex, expedita id illo illum incidunt itaque minima modi nam, obcaecati quaerat quibusdam ratione suscipit temporibus totam vel velit. Architecto at facere, impedit magni nobis velit! Accusantium, animi assumenda consequuntur deleniti ducimus facilis laboriosam laborum minus nam nemo nobis numquam ratione recusandae, sapiente tempora veniam veritatis voluptatum. Alias facilis sed soluta. Architecto assumenda blanditiis ducimus laboriosam modi necessitatibus nemo, officia placeat quas quis repellendus tempora vel, veniam. Accusamus architecto assumenda autem cum delectus dicta, dolorem et excepturi hic itaque minima molestiae natus nostrum perspiciatis placeat provident qui sed similique sunt vero? Aperiam deserunt doloremque facilis illum ipsum maxime minima odit, sed sit temporibus! Animi atque consequatur, consequuntur debitis dignissimos distinctio eos et, excepturi facilis illum ipsum labore magnam minus molestiae nemo officiis perspiciatis porro quae quas quidem repellendus repudiandae soluta tenetur vel vero voluptatibus voluptatum. Ab aliquam aliquid amet architecto at cum cupiditate dignissimos ea eos esse est exercitationem explicabo fugiat illo incidunt maxime molestiae mollitia necessitatibus nobis odit perferendis, praesentium quae quisquam recusandae, rem rerum veritatis voluptates. Adipisci aperiam asperiores assumenda atque, delectus dicta dignissimos error eveniet exercitationem illo illum impedit inventore labore laborum laudantium maiores minima modi officia placeat porro praesentium quam quo recusandae sit temporibus veritatis voluptas voluptatibus. Aliquam consectetur consequuntur dolor hic incidunt ipsam iure iusto obcaecati quam quibusdam, sapiente veritatis? Eos nobis qui quod saepe, sint totam veritatis? Accusamus ad aperiam aspernatur commodi illum, impedit ipsum maxime minima nemo non odit officiis optio quisquam quo recusandae repellendus, sunt temporibus ullam.
                </p>
              </div>
            </div>
            <div class="board-detail-comments-section">
              <div class="board-detail-comments-write-wrap">
                <h2 class="board-detail-comments-write-title">
                  댓글 작성
                </h2>
                <s-text-field
                  max-length="20"
                  placeholder="댓글을 입력해주세요!"
                  :required="true"
                  :single-line="true"
                  type="text"
                />
              </div>
              <h2 class="board-detail-comments-title">
                댓글
              </h2>
              <div class="board-detail-comment">
                <ul class="board-detail-comment-content">
                  <li>서서히 시작되리라 조심스레 예측합니다.</li>
                  <li>해우소</li>
                  <li>2024년 3월 23일</li>
                </ul>
                <div class="board-detail-comment-board">
                  <a>수정</a>
                  <a>삭제</a>
                </div>
              </div>
              <div class="board-detail-comment">
                <div class="board-detail-comment-content">
                  <span>서서히 시작되리라 조심스레 예측합니다.</span>
                  <span>해우소</span>
                  <span>2024년 3월 23일</span>
                </div>
              </div>
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

const common = namespace(Namespace.COMMON)
@Component({
  layout: 'empty',
  components: { STextField }
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
      this.$router.push(`/board/boardedit?userSequence=${userSequence}`)
    }
  }
}
</script>
