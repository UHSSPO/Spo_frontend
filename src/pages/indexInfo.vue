<template>
  <div id="container" class="line">
    <div class="content">
      <template>
        <v-carousel>
          <v-carousel-item
            v-for="(item,i) in items"
            :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
          />
        </v-carousel>
      </template>
      <div class="rollerContainer">
        <div class="rollingbanner">
          <div class="wrap">
            <div class="roller">
              <ul>
                <!-- 여기부터 for문 사용하여 정보 불러오기 -->
                <li class="kapi">
                  <a href="#">
                    <strong class="name">농수산물(KAPI)</strong>
                    <span class="status down">
                      <span class="num">172.33</span>
                      <span class="rate"><em>-1.41%</em></span>
                    </span>
                  </a>
                </li>
                <!--여기까지 -->

                <li class="kospi">
                  <a href="#">
                    <strong class="name">코스피</strong>
                    <span class="status down">
                      <span class="num">2,720.39</span>
                      <span class="rate"><em>-2.56%</em></span>
                    </span>
                  </a>
                </li>
                <li class="kosdaq">
                  <a href="#">
                    <strong class="name">코스닥</strong>
                    <span class="status down">
                      <span class="num">889.44</span>
                      <span class="rate"><em>-2.84%</em></span>
                    </span>
                  </a>
                </li>
                <li class="USDKRW">
                  <a href="#">
                    <strong class="name">미국(USD)</strong>
                    <span class="status up">
                      <span class="num">1,198.6</span>
                      <span class="rate"><em>+0.21%</em></span>
                    </span>
                  </a>
                </li>
                <li class="JPYKRW">
                  <a href="#">
                    <strong class="name">일본(JPY100)</strong>
                    <span class="status up">
                      <span class="num">1,052.95</span>
                      <span class="rate"><em>+0.35%</em></span>
                    </span>
                  </a>
                </li>
                <li class="kospi200">
                  <a href="#">
                    <strong class="name">코스피200</strong>
                    <span class="status down">
                      <span class="num">362.39</span>
                      <span class="rate"><em>-2.4%</em></span>
                    </span>
                  </a>
                </li>
                <li class="future">
                  <a href="#">
                    <strong class="name">선물</strong>
                    <span class="status down">
                      <span class="num">361</span>
                      <span class="rate"><em>-2.66%</em></span>
                    </span>
                  </a>
                </li>
                <li class="esg30">
                  <a href="#">
                    <strong class="name">KEDI 30</strong>
                    <span class="status down">
                      <span class="num">2,557.11</span>
                      <span class="rate"><em>-2.27%</em></span>
                    </span>
                  </a>
                </li>
                <li class="kovax15">
                  <a href="#">
                    <strong class="name">KEDI KOVAX15</strong>
                    <span class="status down">
                      <span class="num">610.56</span>
                      <span class="rate"><em>--0.24%</em></span>
                    </span>
                  </a>
                </li>
                <li class="EURKRW">
                  <a href="#">
                    <strong class="name">유로(EUR)</strong>
                    <span class="status up">
                      <span class="num">1,355.85</span>
                      <span class="rate"><em>+0.09%</em></span>
                    </span>
                  </a>
                </li>
                <!-- 임시 데이터 -->
              </ul>
            </div>
          </div>
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
export default class indexInfo extends Vue {
  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  created(): void {
    console.log('/indexInfo')
  }

  mounted() {
    this.privateRoller()
  }

  private privateRoller(): void {
    const roller: HTMLElement | null = document.querySelector('.roller')
    if (!roller) {
      console.error('Roller element not found.')
      return
    }

    roller.id = 'roller1'

    const clone: HTMLElement = roller.cloneNode(true) as HTMLElement
    clone.id = 'roller2'
    const wrap: HTMLElement | null = document.querySelector('.wrap')
    if (!wrap) {
      console.error('Wrap element not found.')
      return
    }
    wrap.appendChild(clone)

    const roller1: HTMLElement | null = document.querySelector('#roller1')
    const roller2: HTMLElement | null = document.querySelector('#roller2')
    const rollerUl: HTMLElement | null = document.querySelector('.roller ul')

    if (roller1 && roller2 && rollerUl) {
      roller1.style.left = '0px'
      roller2.style.left = rollerUl.offsetWidth + 'px'
    } else {
      console.error('One or more elements not found.')
    }

    roller.classList.add('original')
    clone.classList.add('clone')
  }

  data() {
    return {
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        },
      ],
    }
  }
}

</script>
