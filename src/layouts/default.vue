<template>
  <v-app>
    <div class="header_menu_wrap">
      <v-app-bar-nav-icon class="nav_btn" @click="appBarStatus" />
      <a class="header_menu_logo" @click="onClickHome"><img src="../assets/image/SPO_LOGO.png" alt="logo"></a>
      <v-navigation-drawer v-model="appBarOpener" absolute temporary>
        <v-list nav dense>
          <v-list-item>
            <v-list-item-title @click="movePage('home')">
              홈
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title @click="movePage('commend')">
              추천
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title @click="movePage('survey')">
              성향분석
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title @click="movePage('')">
              개인추천
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title @click="movePage('')">
              모의투자
            </v-list-item-title>
          </v-list-item>

          <div v-if="StringUtil.isEmpty(token)" class="header_mobile_form">
            <v-list-item>
              <v-list-item-title @click="onclickToLogin">
                로그인
              </v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title @click="goToSignUp">
                회원가입
              </v-list-item-title>
            </v-list-item>
          </div>
          <div v-else class="header_mobile_form">
            <v-list-item>
              <v-list-item-title @click="onClickLogout">
                로그아웃
              </v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title @click="onClickMypage(userInfo.userSequence)">
                마이페이지
              </v-list-item-title>
            </v-list-item>

            <v-list-item v-if="userInfo.userRole === 'ADM'">
              <v-list-item-title @click="goToSignUp">
                관리자페이지
              </v-list-item-title>
            </v-list-item>
          </div>
        </v-list>
      </v-navigation-drawer>
    </div>
    <div id="header">
      <div class="user-manager">
        <div class="content dynamic-layout">
          <ul v-if="StringUtil.isEmpty(token)">
            <li @click="onclickToLogin">
              <a class="header_user_color">
                로그인
              </a>
            </li>
            <li @click="goToSignUp">
              <a class="header_user_color">
                회원가입
              </a>
            </li>
          </ul>
          <ul v-else>
            <li class="header_user_color">
              {{ userInfo.nickName }} 님 환영합니다!
            </li>
            <li @click="onClickLogout()">
              <a class="header_user_color">
                로그아웃
              </a>
            </li>
            <li @click="onClickMypage(userInfo.userSequence)">
              <a class="header_user_color">
                마이페이지
              </a>
            </li>
            <li v-if="userInfo.userRole === 'ADM'">
              <a class="header_user_color">
                관리자페이지
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="content dynamic-layout">
        <a class="font0" @click="onClickHome">
          <img src="../assets/image/SPO_LOGO.png" alt="logo">
        </a>
        <ul>
          <li>
            <a @click="movePage('home')">홈</a>
          </li>
          <li>
            <a @click="movePage('commend')">추천</a>
          </li>
          <li>
            <a @click="movePage('survey')">성향분석</a>
          </li>
          <li>
            <a @click="onClickPicklist(userInfo.userSequence)">개인추천</a>
          </li>
          <li>
            <a @click="movePage('')">모의투자</a>
          </li>
          <li class="menu_search_list">
            <div>
              <s-text-field
                v-model="search"
                placeholder="종목명 검색"
                @input="searchStock"
              />
              <v-list v-if="searchStockValue && StringUtil.isNotEmpty(search)" class="search-list">
                <v-list-item
                  v-for="(item, index) in searchStockValue"
                  :key="index"
                  class="search-list-item"
                  @click="stockDetail(item.stockInfoSequence)"
                >
                  <v-list-item-title>
                    {{ item.itmsNm }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </div>
            <div />
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
import axios from 'axios'
import { IDialog, IDialogResult } from '~/types/common'
import { commonStore } from '~/util/store-accessor'
import { Namespace } from '~/util/Namespace'
import SDialog from '~/components/common/SDialog.vue'
import STextField from '~/components/common/STextField.vue'
import { IUserDetail } from '~/types/auth/auth'
import { ISearchStockInfo } from '~/types/home/home'
import { Stock } from '~/api/stock'
import StringUtil from '~/util/StringUtil'
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
  kakaoInit() {
    Kakao.init('2e79fbfa9c3fe6aad98a3ca66e8e5f6f')// KaKao client key
    Kakao.isInitialized()
  }

  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/

  @common.State private dialogs!: Array<any>
  @common.State private token!: string
  @common.State private userInfo!: IUserDetail
  @common.State private stockList!: Array<ISearchStockInfo>

  private appBarOpener = false
  private search = ''
  private stock = [] as Array<ISearchStockInfo>
  private searchStockValue = [] as Array<ISearchStockInfo>
  private currentOrderIndex = 0

  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  created(): void {
    this.initCommend()
  }

  mounted() {
    this.kakaoInit()
  }

  /********************************************************************************
   * Method (Event, Business Logic)
   ********************************************************************************/

  private async goToPage() {
    await Kakao.Auth.authorize({
      redirectUri: `${window.location.origin}/auth/kakao-login`
    })
  }

  private getStock() {
    Stock().then((response: Array<ISearchStockInfo>) => {
      commonStore.ADD_STOCK_LIST(response)
      this.stock = this.stockList
    })
  }

  private goToSignUp() {
    this.$router.push('/auth/sign-up')
  }

  private appBarStatus() {
    this.appBarOpener = true
  }

  private movePage(page: string) {
    commonStore.CHECK_LOGIN()
    if (this.token) {
      this.$router.push(`/${page}`)
    }
  }

  private onCloseDialog(value: IDialogResult) {
    const index = _.findIndex(this.dialogs, (dialog: IDialog) => {
      return dialog.id === value.id
    })
    commonStore.REMOVE_DIALOG(index)
  }

  private appBarLink(href: string) {
    // console.log(href)
  }

  private onclickToLogin() {
    this.$router.push('/auth/login')
  }

  private onClickLogout() {
    commonStore.ADD_DIALOG({
      id: 'LOGOUT',
      text: '로그아웃되었습니다!',
      callback: () => {
        commonStore.LOGOUT()
        this.$router.push('/')
      }
    })
  }

  private onClickHome() {
    this.$router.push('/home')
  }

  private searchStock() {
    const lowerCaseSearch = this.search.toLowerCase()
    this.searchStockValue = _.filter(this.stock, (item: ISearchStockInfo) => {
      return item.itmsNm.toLowerCase().includes(lowerCaseSearch)
    })
  }

  private onClickMypage(userInfo: number) {
    this.$router.push({
      name: 'mypage',
    })
  }

  private initCommend() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    Promise.all([this.getStock()])
      .finally(() => {
        this.$nextTick(() => {
          this.$nuxt.$loading.finish()
        })
      })
  }

  private stockDetail(stockInfoSequence: number) {
    commonStore.CHECK_LOGIN()
    if (this.token) {
      this.search = ''
      this.$router.push({
        name: 'detail',
        query: {
          stockInfoSequence: stockInfoSequence.toString()
        }
      })
    }
  }

  private onClickPicklist(userSequence: number) {
    commonStore.CHECK_LOGIN()
    if (this.token) {
      this.$router.push(`/picklist?userSequence=${userSequence}`)
    }
  }
}
</script>
