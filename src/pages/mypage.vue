<template>
  <div id="container" class="line">
    <div class="content dynamic-layout">
      <div class="rank-wrap">
        <div class="commend-wrap w-100">
          <div class="commend-main-title">
            <div class="commend-main-area">
              <div class="commend-main-txt">
                프로필을 수정하거나 관심종목을 볼수있는 마이페이지에요. 🙈🙉
              </div>
            </div>
          </div>
          <div class="mypage-main">
            <!-- 내 정보 섹션 -->
            <div class="profile-section ">
              <h4>내 정보</h4>
              <div class="profile-info">
                <div class="profile-item">
                  <span class="item-label">닉네임:</span>
                  <span id="nickname" class="item-value">한세운</span>
                </div>
                <div class="profile-item">
                  <span class="item-label">투자성향:</span>
                  <span id="investment-preference" class="item-value">공격적 성향</span>
                </div>
                <div class="profile-item">
                  <span class="item-label">가입일:</span>
                  <span id="join-date" class="item-value">2024-03-05</span>
                </div>
                <div class="profile-item">
                  <span class="item-label">생년월일:</span>
                  <span id="birthdate" class="item-value">2000-09-14</span>
                </div>
                <div class="profile-item">
                  <span class="item-label">이메일:</span>
                  <span id="email" class="item-value">test@test.com</span>
                </div>
                <div class="profile-item">
                  <button class="nickname-button">
                    닉네임 변경
                  </button>
                  <button class="password-button">
                    비밀번호 변경
                  </button>
                  <button class="withdraw-button">
                    회원탈퇴
                  </button>
                </div>
              </div>
            </div>

            <!-- 내 관심종목 섹션 -->
            <div class="profile-section">
              <h4>내 관심종목</h4>
              <!-- 관심종목을 표시할 테이블 -->
              <table>
                <thead>
                  <tr>
                    <th>종목명</th>
                    <th>전일종가</th>
                    <th>등락률</th>
                    <th>시가총액</th>
                  </tr>
                </thead>
                <tbody>
                <!-- 동적으로 관심종목을 추가할 부분 -->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'

// const common = namespace(Namespace.COMMON)
@Component({
  layout: 'empty',
})
export default class extends Vue {
  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/
  // private userInfoSequence = 0
  // @common.State private userInfo!: IUserDetail
  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  // async created() {
  //   this.userInfoSequence = Number(this.$route.query.userSequence)
  //   await this.getDetail()
  // }
  //
  // private async getDetail() {
  //   this.$nextTick(() => {
  //     this.$nuxt.$loading.start()
  //   })
  //   this.userInfo = await getDetail(this.userSequence)
  //   this.$nextTick(() => {
  //     this.$nuxt.$loading.finish()
  //   })
  // }
}

</script>
