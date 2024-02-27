<template>
  <div id="container" class="line">
    <div class="content  dynamic-layout">
      <div class="rankWrap">
        <div class="commendWrap w-100">
          <div class="commend-main-title">
            <div class="commend-main-area">
              <div class="flex-center">
                <v-icon>
                  mdi-finance
                </v-icon>
                <h3>SPO에서 직접 기업을 평가하여 추천해주고 있는 </h3><h2>추천종목</h2>
              </div>
              <div class="commend-main-txt">
                종목들을 상세히 나타낸 상세 페이지에요 🙈🙉
              </div>
            </div>
          </div>
          <!--          v-if="StockInfo.stockInfoSequence === $route.query.currentOrderIndex"-->
          <div class="detailsWarp">
            <div class="detailsWarpTitle">
              <div class="detailsItem">
                <span class="ItemCode">{{ stockInfo.srtnCd.slice(1, stockInfo.srtnCd.length) }} {{ stockInfo.mrktCtg }}</span>
                <h3 class="ItemName">
                  {{ stockInfo.itmsNm }}
                </h3>
                <h1 class="ItemValue">
                  {{ stockInfo.priceInfo.clpr | setNumberComma }} <span>원 <span class="plus">3.07%</span></span>
                </h1>
              </div>
              <div class="detailsItem chartWrap">
                <div class="chart" />
              </div>
            </div>
            <div class="detailsContent">
              <div class="detailsContentItem">
                <table>
                  <tr>
                    <td colspan="8">
                      상세 보기
                    </td>
                  </tr>
                  <tr>
                    <td>전일종가</td>
                    <td>
                      146,800
                    </td>

                    <td>시가</td>
                    <td>
                      146,200
                    </td>

                    <td>고가</td>
                    <td>
                      153,200
                    </td>

                    <td>저가</td>
                    <td>
                      146,000
                    </td>
                  </tr>

                  <tr>
                    <td>거래량</td>
                    <td>
                      146,800
                    </td>

                    <td>거래대금</td>
                    <td>
                      146,200
                    </td>

                    <td>시총</td>
                    <td>
                      153,200
                    </td>

                    <td>매출성장률</td>
                    <td>
                      146,000
                    </td>
                  </tr>

                  <tr>
                    <td>per</td>
                    <td>
                      146,800
                    </td>

                    <td>pbr</td>
                    <td>
                      146,200
                    </td>

                    <td>순이익</td>
                    <td>
                      153,200
                    </td>

                    <td>부채비율</td>
                    <td>
                      146,000
                    </td>
                  </tr>

                  <tr>
                    <td>ROE</td>
                    <td>
                      146,800
                    </td>

                    <td>ROA</td>
                    <td>
                      146,200
                    </td>

                    <td>시가총액 기준 </td>
                    <td>
                      153,200
                    </td>

                    <td>거래대금 비율</td>
                    <td>
                      146,000
                    </td>
                  </tr>
                </table>
              </div>
              <div class="detailsContentItem">
                <h3>손익</h3>
                <div class="stickchart" />
              </div>
              <div class="detailsContentItem">
                <h3>재무상태</h3>
                <div class="stickchart" />
              </div>
              <div class="detailsContentItem">
                <h3>기업 정보</h3>
                <div class="detailsInfoWrap">
                  <ul>
                    <li>
                      <p class="detailsInfoTitle">
                        설립일
                      </p>
                      <p>2014.10.10</p>
                    </li>
                    <li>
                      <p class="detailsInfoTitle">
                        대표자
                      </p>
                      <p>김병훈</p>
                    </li>
                    <li>
                      <p class="detailsInfoTitle">
                        주요산업
                      </p>
                      <p>화장품 제조업</p>
                    </li>
                    <li>
                      <p class="detailsInfoTitle">
                        기업형태
                      </p>
                      <p>중견기업</p>
                    </li>
                    <li>
                      <p class="detailsInfoTitle">
                        종업원 수
                      </p>
                      <p>407명</p>
                    </li>
                    <li>
                      <p class="detailsInfoTitle">
                        홈페이지
                      </p>
                      <a>http://www.apr-in.com</a>
                    </li>
                    <li>
                      <p class="detailsInfoTitle">
                        본사주소
                      </p>
                      <p>
                        서울 송파구 신천동 29번지 36층
                      </p>
                    </li>
                  </ul>
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
import { Component, Vue } from 'nuxt-property-decorator'
import { IStockInfo } from '~/types/details/details'
import { getDetail } from '~/api/stock'

@Component({
  layout: 'empty',
})
export default class extends Vue {
  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/
  private stockInfo = {} as IStockInfo
  private stockInfoSequence = 0

  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  async created() {
    this.stockInfoSequence = Number(this.$route.query.stockInfoSequence)
    await this.getDetail()
  }

  private async getDetail() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    this.stockInfo = await getDetail(this.stockInfoSequence)
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  }
}

</script>
