<template xmlns="http://www.w3.org/1999/html">
  <div id="container" class="line">
    <div class="content  dynamic-layout result-position">
      <div class="rank-wrap">
        <div v-if="!userInfo.investPropensity" class="result-wrap">
          <div class="result-content">
            <h3>지금 바로 투자성향 완료하고 개인추천 받아보세요!</h3>
          </div>
          <div class="result-content result-button">
            <s-button @click="movePage('survey')">
              성향분석 바로가기
            </s-button>
          </div>
        </div>
        <div v-else class="result-wrap">
          <div class="result-content">
            <div>
              <h3 class="result-highlight">
                {{ userInfo.nickName }}
              </h3> 고객님의 투자성향은
              <h3 class="result-highlight">
                {{ investType }}
              </h3> 입니다
            </div>
          </div>
          <div class="result-content">
            <h2>개인 추천을 확인해보세요!</h2>
          </div>
          <div class="result-content result-button">
            <s-button @click="movePage('')">
              개인추천 바로가기
            </s-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import {
  ISelectMyInfoRes
} from '~/types/user/user'
import { getMyInfo } from '~/api/user'
import { Namespace } from '~/util/Namespace'
import SButton from '~/components/common/SButton.vue'
import { commonStore } from '~/util/store-accessor'

const common = namespace(Namespace.COMMON)
@Component({
  components: { SButton },
  layout: 'empty',
})
export default class result extends Vue {
  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/
  private userInfo = {} as ISelectMyInfoRes
  @common.State private token!: string
  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  async created() {
    await this.initGetMyInfo()
  }

  /********************************************************************************
   * Method (Event, Business Logic)
   ********************************************************************************/
  private async initGetMyInfo() {
    await this.getMyInfo()
  }

  private async getMyInfo() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    this.userInfo = await getMyInfo()
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  }

  private movePage(page: string) {
    commonStore.CHECK_LOGIN()
    if (this.token) {
      this.$router.push(`/${page}`)
    }
  }

  private get investType(): string {
    if (this.userInfo.investPropensity === '01') {
      return '안정형'
    } else if (this.userInfo.investPropensity === '02') {
      return '안전추구형'
    } else if (this.userInfo.investPropensity === '03') {
      return '위험중립형'
    } else if (this.userInfo.investPropensity === '04') {
      return '적극투자형'
    } else if (this.userInfo.investPropensity === '05') {
      return '공격투자형'
    } else {
      return '아직 투자성향을 진행하지 않으셨습니다.'
    }
  }
}
</script>
