<template>
  <div>
    <!-- 1번 질문 -->
    <div>
      <p>1. 당신의 연령대는 어떻게 됩니까?</p>
      <s-radio-group
        v-model="selectedOptions.age"
        :items="ageOptions"
        label="연령대 선택"
      />
    </div>

    <!-- 2번 질문 -->
    <div>
      <p>2. 투자하고자 하는 자금의 투자 가능 기간은 얼마나 됩니까?</p>
      <s-radio-group
        v-model="selectedOptions.investmentPeriod"
        :items="investmentPeriodOptions"
      />
    </div>

    <!-- 3번 질문 -->
    <div>
      <p>3. 다음 중 투자경험과 가장 가까운 것은 어느 것입니까?(중복 가능)</p>
      <s-check-box
        v-model="selectedOptions.investmentExperience"
        :items="investmentExperienceOptions"
      />
    </div>

    <!-- 4번 질문 -->
    <div>
      <p>4. 금융상품 투자에 대한 본인의 지식수준은 어느 정도라고 생각하십니까?</p>
      <s-radio-group
        v-model="selectedOptions.knowledgeLevel"
        :items="knowledgeLevelOptions"
      />
    </div>

    <!-- 5번 질문 -->
    <div>
      <p>5. 현재 투자하고자 하는 자금은 전체 금융자산(부동산 등을 제외) 중 어느 정도의 비중을 차지합니까?</p>
      <s-radio-group
        v-model="selectedOptions.investmentAllocation"
        :items="investmentAllocationOptions"
      />
    </div>

    <!-- 6번 질문 -->
    <div>
      <p>6. 다음 중 당신의 수입원을 가장 잘 나타내고 있는 것은 어느 것입니까?</p>
      <s-radio-group
        v-model="selectedOptions.incomeSource"
        :items="incomeSourceOptions"
      />
    </div>

    <!-- 7번 질문 -->
    <div>
      <p>7. 만약 투자원금에 손실이 발생할 경우 다음 중 감수할 수 있는 손실 수준은 어느 것입니까?</p>
      <s-radio-group
        v-model="selectedOptions.lossTolerance"
        :items="lossToleranceOptions"
      />
    </div>

    <button @click="submitSurvey">
      제출
    </button>
  </div>
</template>

<script>
import SRadioGroup from '@/components/common/SRadioGroup.vue'
import SCheckBox from '~/components/common/SCheckBox.vue'

export default {
  components: {
    SCheckBox,
    SRadioGroup
  },
  data() {
    return {
      selectedOptions: {
        age: '',
        investmentPeriod: '',
        investmentExperience: [],
        knowledgeLevel: '',
        investmentAllocation: '',
        incomeSource: '',
        lossTolerance: ''
      },
      ageOptions: [
        { value: '19세 이하', label: '19세 이하' },
        { value: '20세~40세', label: '20세~40세' },
        { value: '41세~50세', label: '41세~50세' },
        { value: '51세~60세', label: '51세~60세' },
        { value: '61세 이상', label: '61세 이상' }
      ],
      investmentPeriodOptions: [
        { value: '6개월 이내', label: '6개월 이내' },
        { value: '6개월 이상~1년 이내', label: '6개월 이상~1년 이내' },
        { value: '1년 이상~2년 이내', label: '1년 이상~2년 이내' },
        { value: '3년 이상', label: '3년 이상' }
      ],
      investmentExperienceOptions: [
        { value: '은행의 예·적금', label: '은행의 예·적금, 국채, 지방채, 보증채, MMF, CMA 등' },
        { value: '금융채', label: '금융채, 신용도가 높은 회사채, 채권형펀드, 원금보존추구형ELS 등' },
        { value: '중간 등급의 회사채', label: '신용도 중간 등급의 회사채, 원금의 일부만 보장되는 ELS, 혼합형펀드 등' },
        { value: '주식', label: '신용도가 낮은 회사채, 주식, 원금이 보장되지 않는 ELS, 시장수익률 수준의 수익을 추구하는 주식형펀드 등' },
        { value: '주식형펀드', label: 'ELW, 선물옵션, 시장수익률 이상의 수익을 추구하는 주식형펀드, 파생상품에 투자하는 펀드, 주식 신용거래 등' }
      ],
      knowledgeLevelOptions: [
        { value: '매우 낮은 수준', label: '［매우 낮은 수준］투자의사 결정을 스스로 내려본 경험이 없는 정도' },
        { value: '낮은 수준', label: '［낮은 수준］주식과 채권의 차이를 구별할 수 있는 정도' },
        { value: '높은 수준', label: '［높은 수준］투자할 수 있는 대부분의 금융상품의 차이를 구별할수 있는 정도' },
        { value: '매우 높은 수준', label: '［매우 높은 수준］금융상품을 비롯하여 모든 투자대상 상품의차이를 이해할 수 있는 정도' }
      ],
      investmentAllocationOptions: [
        { value: '10% 이내', label: '10% 이내' },
        { value: '10% ~ 20% 이내', label: '10% ~ 20% 이내' },
        { value: '20% ~ 30% 이내', label: '20% ~ 30% 이내' },
        { value: '30% 이상 ~ 40% 이내', label: '30% 이상 ~ 40% 이내' },
        { value: '40%', label: '40%' }
      ],
      incomeSourceOptions: [
        { value: '안정', label: '현재 일정한 수입이 발생하고 있으며, 향후 현재 수준을 유지하거나 증가할 것으로 예상된다.' },
        { value: '불안정', label: '현재 일정한 수입이 발생하고 있으나, 향후 감소하거나 불안정할 것으로 예상된다.' },
        { value: '수익없음', label: '현재 일정한 수입이 없으며, 연금이 주수입원이다.' }
      ],
      lossToleranceOptions: [
        { value: '원금 보전', label: '무슨 일이 있어도 투자원금은 보전되어야 한다.' },
        { value: '10% 미만 손실', label: '10% 미만까지는 손실을 감수할 수 있을 것 같다.' },
        { value: '20% 미만 손실', label: '20% 미만까지는 손실을 감수할 수 있을 것 같다.' },
        { value: '상관없음', label: '기대수익이 높다면 위험이 높아도 상관하지 않겠다.' }
      ]
    }
  },
  methods: {
    submitSurvey() {
      alert('투자성향분석테스트를 제출했습니다.')
    }
  }
}
</script>

<style scoped>
/* 추가적인 스타일링을 위한 CSS 코드 작성 */
</style>
