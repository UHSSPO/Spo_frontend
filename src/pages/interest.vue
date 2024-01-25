<template>
  <div id="container" class="line">
    <div class="content">
      <div class="rankWrap">
        <div class="interestWrap">
          <h3>나의 관심 종목</h3>
          <table class="interestList">
            <tr>
              <td>
                종목명
              </td>
              <td>전일종가</td>
              <td>등락률</td>
              <td>주문건</td>
              <td>추정 시가총액</td>
            </tr>
            <tr>
              <td>3S</td>
              <td>4,100</td>
              <td>+0.37</td>
              <td>58,962,730</td>
              <td>2조 6,482억</td>
            </tr>
            <tr>
              <td>에이피알</td>
              <td>364,000</td>
              <td>+3.7%</td>
              <td>13,139</td>
              <td>2조 6,482억</td>
            </tr>
            <tr>
              <td>두나무</td>
              <td>115,000</td>
              <td>-10.16%</td>
              <td>68,336</td>
              <td>4조 14억</td>
            </tr>
            <tr>
              <td>야놀자</td>
              <td>45,600</td>
              <td>-0.44%</td>
              <td>20,910</td>
              <td>4조 6,064억</td>
            </tr>
            <tr>
              <td>컬리</td>
              <td>13,200</td>
              <td>-2.22%</td>
              <td>9,890</td>
              <td>5,399억</td>
            </tr>
            <tr>
              <td colspan="6">
                <a href="#">더보기</a>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  layout: 'empty',
  components: {}
})
export default class interest extends Vue {
  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  created(): void {
    console.log('/commend')
  }
}

</script>
