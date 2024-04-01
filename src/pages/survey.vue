<template>
  <div>
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

    <button @click="submitSurvey">
      제출
    </button>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'nuxt-property-decorator'
import SRadioGroup from '~/components/common/SRadioGroup.vue'

@Component({
  components: {
    SRadioGroup,
  },
})
export default class Survey extends Vue {
  selectedKnowledge = ''
  selectedIncomeSource = ''
  selectedAnnualIncome = ''
  selectedInvestmentExperience = ''
  selectedInvestmentAllocation = ''
  selectedDerivativesExperience = ''
  selectedRiskTolerance = ''
  selectedInvestmentPurpose = ''
  selectedInvestmentPeriod = ''

  knowledge = [
    { cd: 0, cdVal: '매우 낮은 수준 (0점)' },
    { cd: 3, cdVal: '낮은 수준 (3점)' },
    { cd: 7, cdVal: '높은 수준 (7점)' },
    { cd: 10, cdVal: '매우 높은 수준 (10점)' }
  ]

  incomeSource = [
    { cd: 10, cdVal: '현재 수입 유지 또는 증가 예상 (10점)' },
    { cd: 7, cdVal: '현재 수입 감소 또는 불안정 예상 (7점)' },
    { cd: 3, cdVal: '현재 수입 없음, 연금 주 수입 (3점)' }
  ]

  annualIncome = [
    { cd: 0, cdVal: '2천만원 이하 (0점)' },
    { cd: 3, cdVal: '5천만원 이하 (3점)' },
    { cd: 7, cdVal: '1억원 이하 (7점)' },
    { cd: 10, cdVal: '1억원 초과 (10점)' }
  ]

  investmentExperience = [
    { cd: 0, cdVal: '안정형 상품에 투자 경험 (0점)' },
    { cd: 3, cdVal: '위험 중립형 상품에 투자 경험 (3점)' },
    { cd: 7, cdVal: '적극투자형 상품에 투자 경험 (7점)' },
    { cd: 10, cdVal: '공격투자형 상품에 투자 경험 (10점)' }
  ]

  investmentAllocation = [
    { cd: 0, cdVal: '10% 이하 (0점)' },
    { cd: 3, cdVal: '15% 이하 (3점)' },
    { cd: 7, cdVal: '20% 이하 (7점)' },
    { cd: 10, cdVal: '25% 초과 (10점)' }
  ]

  derivativesExperience = [
    { cd: 0, cdVal: '투자 경험 없음 (0점)' },
    { cd: 3, cdVal: '1년 이하 (3점)' },
    { cd: 7, cdVal: '3년 이하 (7점)' },
    { cd: 10, cdVal: '3년 초과 (10점)' }
  ]

  riskTolerance = [
    { cd: 0, cdVal: '투자원금 보존 우선 (0점)' },
    { cd: 3, cdVal: '10% 미만 손실 감내 (3점)' },
    { cd: 7, cdVal: '20% 미만 손실 감내 (7점)' },
    { cd: 10, cdVal: '위험 감수 가능 (10점)' }
  ]

  investmentPurpose = [
    { cd: 0, cdVal: '사용 예정 자금 운용 (0점)' },
    { cd: 3, cdVal: '목적 자금 마련 (3점)' },
    { cd: 7, cdVal: '노후 자금 마련 (7점)' },
    { cd: 10, cdVal: '자산 증식 우선 (10점)' }
  ]

  investmentPeriod = [
    { cd: 0, cdVal: '1년 미만 (0점)' },
    { cd: 3, cdVal: '1년 이상 (3점)' },
    { cd: 7, cdVal: '2년 이상 (7점)' },
    { cd: 10, cdVal: '3년 이상 (10점)' }
  ]

  analyzeInvestmentType() {
    const totalScore = (
      this.selectedKnowledge +
        this.selectedIncomeSource +
        this.selectedAnnualIncome +
        this.selectedInvestmentExperience +
        this.selectedInvestmentAllocation +
        this.selectedDerivativesExperience +
        this.selectedRiskTolerance +
        this.selectedInvestmentPurpose +
        this.selectedInvestmentPeriod
    )

    if (totalScore >= 0 && totalScore <= 20) {
      return '안정형'
    } else if (totalScore >= 21 && totalScore <= 40) {
      return '안정추구형'
    } else if (totalScore >= 41 && totalScore <= 60) {
      return '위험중립형'
    } else if (totalScore >= 61 && totalScore <= 80) {
      return '적극투자형'
    } else if (totalScore >= 81 && totalScore <= 100) {
      return '공격투자형'
    } else {
      return '아직 모든 문항에 답을하지 않으셨습니다.'
    }
  }

  submitSurvey() {
    const investmentType = this.analyzeInvestmentType()
    alert(`사용자의 투자 유형: ${investmentType}`)
  }
}

</script>
