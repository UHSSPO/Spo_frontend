<template>
  <div id="container" class="line">
    <div class="content">
      <div class="rankWrap">
        <div class="boardWrap">
          <h3>게시판</h3>
          <ul class="boardListWrap">
            <li class="boardList">
              <ul>
                <li>해우소</li>
                <li>
                  <p>준비는끝났다는얘기</p>
                  <span>서서히 시작되리라 조심스레 예측합니다...</span>
                </li>
                <li>
                  <a href="#">더보기</a>
                </li>
                <li>4시간 전</li>
              </ul>
              <ul>
                <li>해우소</li>
                <li>
                  <p>준비는끝났다는얘기</p>
                  <span>서서히 시작되리라 조심스레 예측합니다...</span>
                </li>
                <li>
                  <a href="#">더보기</a>
                </li>
                <li>4시간 전</li>
              </ul>
              <ul>
                <li>해우소</li>
                <li>
                  <p>준비는끝났다는얘기</p>
                  <span>서서히 시작되리라 조심스레 예측합니다...</span>
                </li>
                <li>
                  <a href="#">더보기</a>
                </li>
                <li>4시간 전</li>
              </ul>
              <ul>
                <li>해우소</li>
                <li>
                  <p>준비는끝났다는얘기</p>
                  <span>서서히 시작되리라 조심스레 예측합니다...</span>
                </li>
                <li>
                  <a href="#">더보기</a>
                </li>
                <li>4시간 전</li>
              </ul>
              <ul>
                <li>해우소</li>
                <li>
                  <p>준비는끝났다는얘기</p>
                  <span>서서히 시작되리라 조심스레 예측합니다...</span>
                </li>
                <li>
                  <a href="#">더보기</a>
                </li>
                <li>4시간 전</li>
              </ul>
            </li>
          </ul>
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
export default class board extends Vue {
  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  created(): void {
    console.log('/board')
  }
}

</script>
