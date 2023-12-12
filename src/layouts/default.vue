<template>
  <v-app>
    <div class="back_all_wrap"></div>
    <div class="header_menu_wrap">
      <v-app-bar-nav-icon class="nav_btn"></v-app-bar-nav-icon>
      <a href="#" class="header_menu_logo"><img src="../assets/image/SPO_LOGO.png" alt="logo"></a>
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
              <li><a href="#">로그인</a></li>
              <li><a href="#">회원가입</a></li>
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
              <form action="#" >
                <s-text-field placeholder="종목명 검색"/>
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
            <li><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="#28292C" viewBox="0 0 10 11"><path d="M4.986 10.501c2.84 0 5.014-2.244 5.014-5.014C10 2.73 7.827.5 4.986.5 2.13.501 0 2.731 0 5.487 0 8.257 2.13 10.5 4.986 10.5Zm0-.724c-2.43 0-4.12-1.79-4.12-4.29 0-2.514 1.69-4.262 4.12-4.262 2.415 0 4.148 1.748 4.148 4.262 0 2.5-1.733 4.29-4.148 4.29Zm.156-1.492c.682 0 1.165-.185 1.506-.355V6.893c-.299.142-.654.298-1.236.298-.994 0-1.392-.54-1.392-1.633v-.27c0-1.065.511-1.506 1.307-1.506.525 0 .895.1 1.278.256V2.973c-.284-.142-.739-.27-1.406-.27-1.435 0-2.642.738-2.642 2.713v.156c0 1.832 1.037 2.713 2.585 2.713Z"></path></svg> SPO</li>
          </ul>
        </div>
        <span>제작 : 졸작 4조</span>
      </div>
    </div>
    <s-dialog v-for="(dialog, index) in dialogs" :key="index" :dialog="dialog" @close="onCloseDialog" />
  </v-app>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import _ from 'lodash'
import { DIALOG_TYPE, IDialog, IDialogResult } from '../types/common'
import { commonStore } from '../util/store-accessor'
import { Namespace } from '../util/Namespace'
import SDialog from '~/components/common/SDialog.vue'
import STextField from '~/components/common/STextField.vue'

const common = namespace(Namespace.COMMON)

@Component({
  scrollToTop: true,
  components: {
    STextField,
    SDialog
  }
})
export default class extends Vue {
  @common.State private dialogs!: Array<any>

  private onCloseDialog (value: IDialogResult) {
    const index = _.findIndex(this.dialogs, (dialog: IDialog) => {
      return dialog.id === value.id
    })
    commonStore.REMOVE_DIALOG(index)
  }

  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
