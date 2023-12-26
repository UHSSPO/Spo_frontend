<template>
  <v-app>
    <div class="back_all_wrap" />
    <div class="header_menu_wrap">
      <v-app-bar-nav-icon class="nav_btn" @click="onClickMenu" />
      <a href="#" class="header_menu_logo">
        <img src="../assets/image/SPO_LOGO.png" alt="logo">
      </a>
      <!--      onclick 이벤트 적용 내용    -->
      <!--      1. .back_all_wrap { display:none; }-->
      <!--      2. #header {  margin-left: -80%; }-->
      <!--      3. .header_menu_wrap {width:100%;}-->
      <!--      두번째 눌렀을때 스크립트 -->
      <!--      1. .back_all_wrap {  display: block; }-->
      <!--      2. #header {  margin-left: 0%; }-->
      <!--      3. .header_menu_wrap {width:80%;}-->
    </div>
    <div id="header">
      <div class="UserManager">
        <div class="content">
          <ul>
            <li @click="onclickToLogin">
              로그인
            </li>
            <li @click="goToPage">
              회원가입
            </li>
          </ul>
        </div>
      </div>
      <div class="content">
        <a href="/"><img src="../assets/image/SPO_LOGO.png" alt="logo"></a>
        <ul>
          <li>
            <a href="#">홈</a>
          </li>
          <li>
            <a href="#">추천</a>
          </li>
          <li>
            <a href="#">성향분석</a>
          </li>
          <li>
            <a href="#">개인추천</a>
          </li>
          <li>
            <a href="#">개인추천</a>
          </li>
          <li class="menu_search_list">
            <form action="#">
              <s-text-field placeholder="종목명 검색" />
            </form>
          </li>
        </ul>
      </div>
    </div>
    <!-- src/page -->
    <Nuxt />
    <div id="footer">
      <div class="content">
        <a href="/" class="footer_logo">SPO</a>
        <div class="footer_info_wrap">
          <ul>
            <li><a href="#">이용약관</a></li>
            <li><a href="#">서비스 운영정책</a></li>
            <li><a href="#">개인정보처리방침</a></li>
            <li><a href="#">투자 유의 안내</a></li>
          </ul>
          <ul>
            <li>SPO 주식회사</li>
            <li>대표 NULL</li>
            <li>사업자 등록번호 NULL</li>
            <li>고객센터 NULL</li>
          </ul>
          <ul>
            <li>경기도 화성시 봉담읍 최루백로 72 이공관 802호</li>
          </ul>
        </div>
        <span>제작 : 졸작 4조</span>
      </div>
    </div>
    <s-dialog
      v-for="(dialog, index) in dialogs"
      :key="index"
      :dialog="dialog"
      @close="onCloseDialog"
    />
  </v-app>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import _ from 'lodash'
import { DIALOG_RESULT, DIALOG_TYPE, IDialog, IDialogResult } from '~/types/common'
import { commonStore } from '~/util/store-accessor'
import { Namespace } from '~/util/Namespace'
import SDialog from '~/components/common/SDialog.vue'
import STextField from '~/components/common/STextField.vue'
import { geTestApi } from '~/api/test-api'
declare let Kakao: any

const common = namespace(Namespace.COMMON)

@Component({
  scrollToTop: true,
  components: {
    STextField,
    SDialog,
  },
})
export default class extends Vue {
  @common.State private dialogs!: Array<any>
  async created() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    const res = await geTestApi()
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  }

  kakaoInit() {
    Kakao.init('2e79fbfa9c3fe6aad98a3ca66e8e5f6f')// KaKao client key
    Kakao.isInitialized()
  }

  mounted() {
    this.kakaoInit()
  }

  private goToPage() {
    commonStore.ADD_DIALOG({
      id: 'test',
      type: DIALOG_TYPE.CONFIRM_CANCEL,
      text: '이동한다잉',
      callback: async (response: DIALOG_RESULT) => {
        if (response === DIALOG_RESULT.CONFIRM) {
          await Kakao.Auth.authorize({
            redirectUri: `${window.location.origin}/auth/kakao-login`
          })
        } else {
          console.log('취소요')
          console.log(this.value)
        }
      }
    })
  }

  private onCloseDialog(value: IDialogResult) {
    const index = _.findIndex(this.dialogs, (dialog: IDialog) => {
      return dialog.id === value.id
    })
    commonStore.REMOVE_DIALOG(index)
  }

  private onClickMenu() {

  }

  private onclickToLogin() {
    this.$router.push('/auth/login')
  }
}

</script>
