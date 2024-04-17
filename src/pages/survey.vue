<template>
  <div id="container" class="line">
    <div class="content  dynamic-layout">
      <div class="rank-wrap">
        <div class="invest-content">
          <!-- 1번 질문 -->
          <div>
            <p>1. 고객님의 금융상품 투자에 대한 지식수준:</p>
            <s-radio-group
              v-model="selectedKnowledge"
              :items="knowledge"
              label="지식 수준"
            />
          </div>

          <!-- 2번 질문 -->
          <div>
            <p>2. 고객님의 수입원:</p>
            <s-radio-group
              v-model="selectedIncomeSource"
              :items="incomeSource"
              label="수입원"
            />
          </div>

          <!-- 3번 질문 -->
          <div>
            <p>3. 연간 소득:</p>
            <s-radio-group
              v-model="selectedAnnualIncome"
              :items="annualIncome"
              label="연간 소득"
            />
          </div>

          <!-- 4번 질문 -->
          <div>
            <p>4. 투자경험:</p>
            <s-radio-group
              v-model="selectedInvestmentExperience"
              :items="investmentExperience"
              label="투자경험"
            />
          </div>

          <!-- 5번 질문 -->
          <div>
            <p>5. 투자상품 비중:</p>
            <s-radio-group
              v-model="selectedInvestmentAllocation"
              :items="investmentAllocation"
              label="투자상품 비중"
            />
          </div>

          <!-- 6번 질문 -->
          <div>
            <p>6. 파생상품 투자 경험:</p>
            <s-radio-group
              v-model="selectedDerivativesExperience"
              :items="derivativesExperience"
              label="파생상품 투자 경험"
            />
          </div>

          <!-- 7번 질문 -->
          <div>
            <p>7. 투자기대 수익과 손실 감내 수준:</p>
            <s-radio-group
              v-model="selectedRiskTolerance"
              :items="riskTolerance"
              label="손실 감내 수준"
            />
          </div>

          <!-- 8번 질문 -->
          <div>
            <p>8. 금융투자상품 가입 목적:</p>
            <s-radio-group
              v-model="selectedInvestmentPurpose"
              :items="investmentPurpose"
              label="가입 목적"
            />
          </div>

          <!-- 9번 질문 -->
          <div>
            <p>9. 투자기간:</p>
            <s-radio-group
              v-model="selectedInvestmentPeriod"
              :items="investmentPeriod"
              label="투자 기간"
            />
          </div>

          <div class="invest-text">
            고객님의 성실한 답변에 감사드리며, 답변해 주신 본 질문지에 기초해 고객님께 적합한 상품을 제공하도록 노력하겠습니다. 본 질문지에서 수집된 개인정보는 고객님께 적합한 상품을 제공하기 위한 기초자료만으로 활용할 예정이며 SPO에 의하여 기밀로 보호될 것을 약속드립니다. 다음 화면에서 제공되는 투자자성향 분석 결과는 고객님께서 제공하신 정보를 바탕으로 분석되었으며, 거래목적, 계약기간·기대이익·기대손실을 고려한 위험에 대한 태도, 금융상품에 대한 이해도, 재산상황, 투자성상품의 취득·처분 경험, 연령 등에 비추어 적합한 상품을 추천 드립니다.
            본인은 투자위험에 대한 본인의 성향이 올바르게 선택되어 있음을 확인합니다.
          </div>

          <button @click="onClickSubmitSurvey">
            제출
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'nuxt-property-decorator'
import SRadioGroup from '~/components/common/SRadioGroup.vue'
import StringUtil from '~/util/StringUtil'
import {
  IChangeNickNameReqBody,
  IChangePasswordRes,
  IinvestPropensityReqBody,
  IinvestPropensityRes
} from '~/types/user/user'
import { investPropensity } from '~/api/auth'
import { commonStore } from '~/util/store-accessor'
import { IKakaoCertified } from '~/types/auth/auth'

@Component({
  components: {
    SRadioGroup,
  },
})
export default class Survey extends Vue {
  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/
  selectedKnowledge = ''
  selectedIncomeSource = ''
  selectedAnnualIncome = ''
  selectedInvestmentExperience = ''
  selectedInvestmentAllocation = ''
  selectedDerivativesExperience = ''
  selectedRiskTolerance = ''
  selectedInvestmentPurpose = ''
  selectedInvestmentPeriod = ''

  private userInfoSequence = 0
  private totalScore = {} as IinvestPropensityReqBody

  knowledge = [
    { cd: 0, cdVal: '매우 낮은 수준' },
    { cd: 3, cdVal: '낮은 수준' },
    { cd: 7, cdVal: '높은 수준' },
    { cd: 10, cdVal: '매우 높은 수준' }
  ]

  incomeSource = [
    { cd: 10, cdVal: '현재 수입 유지 또는 증가 예상' },
    { cd: 7, cdVal: '현재 수입 감소 또는 불안정 예상' },
    { cd: 3, cdVal: '현재 수입 없음, 연금 주 수입' }
  ]

  annualIncome = [
    { cd: 0, cdVal: '2천만원 이하' },
    { cd: 3, cdVal: '5천만원 이하' },
    { cd: 7, cdVal: '1억원 이하' },
    { cd: 10, cdVal: '1억원 초과' }
  ]

  investmentExperience = [
    { cd: 0, cdVal: '안정형 상품에 투자 경험' },
    { cd: 3, cdVal: '위험 중립형 상품에 투자 경험' },
    { cd: 7, cdVal: '적극투자형 상품에 투자 경험' },
    { cd: 10, cdVal: '공격투자형 상품에 투자 경험' }
  ]

  investmentAllocation = [
    { cd: 0, cdVal: '10% 이하' },
    { cd: 3, cdVal: '15% 이하' },
    { cd: 7, cdVal: '20% 이하' },
    { cd: 10, cdVal: '25% 초과' }
  ]

  derivativesExperience = [
    { cd: 0, cdVal: '투자 경험 없음' },
    { cd: 3, cdVal: '1년 이하' },
    { cd: 7, cdVal: '3년 이하' },
    { cd: 10, cdVal: '3년 초과' }
  ]

  riskTolerance = [
    { cd: 0, cdVal: '투자원금 보존 우선' },
    { cd: 3, cdVal: '10% 미만 손실 감내' },
    { cd: 7, cdVal: '20% 미만 손실 감내' },
    { cd: 10, cdVal: '위험 감수 가능' }
  ]

  investmentPurpose = [
    { cd: 0, cdVal: '사용 예정 자금 운용' },
    { cd: 3, cdVal: '목적 자금 마련' },
    { cd: 7, cdVal: '노후 자금 마련' },
    { cd: 10, cdVal: '자산 증식 우선' }
  ]

  investmentPeriod = [
    { cd: 0, cdVal: '1년 미만' },
    { cd: 3, cdVal: '1년 이상' },
    { cd: 7, cdVal: '2년 이상' },
    { cd: 10, cdVal: '3년 이상' }
  ]

  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  created() {
    this.initGetMyInfo()
  }

  /********************************************************************************
   * Method (Event, Business Logic)
   ********************************************************************************/
  private initGetMyInfo() {
    this.userInfoSequence = commonStore.userInfo.userSequence
  }

  private investTotalScore() {
    const totalScore =
      parseInt(this.selectedKnowledge) +
      parseInt(this.selectedIncomeSource) +
      parseInt(this.selectedAnnualIncome) +
      parseInt(this.selectedInvestmentExperience) +
      parseInt(this.selectedInvestmentAllocation) +
      parseInt(this.selectedDerivativesExperience) +
      parseInt(this.selectedRiskTolerance) +
      parseInt(this.selectedInvestmentPurpose) +
      parseInt(this.selectedInvestmentPeriod)

    return totalScore
  }

  private async onClickSubmitSurvey() {
    const totalScore = this.investTotalScore()

    this.totalScore = {
      totalScore
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    const response: IinvestPropensityRes = await investPropensity(this.totalScore, this.userInfoSequence)
    if (StringUtil.isNotEmpty(response.investPropensity)) {
      commonStore.ADD_DIALOG({
        id: 'INVEST PROPENSITY',
        text: '투자성향 검사가 완료 되었습니다.',
        callback: () => {
          this.$router.push('/result')
        }
      })
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  }
}

</script>
