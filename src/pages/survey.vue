<template>
  <div id="container" class="Line">
    <div class="container dynamic-layout" />
    <h1>투자 성향분석테스트</h1>
    <div id="surveyForm">
      <div>
        <h3>1: 당신의 연령대는 어떻게 됩니까?</h3>
      </div>
      <div>
        <input id="q1_option1" v-model="q1_value" type="radio" name="usage" value="q1_option1">
        <label for="q1_option1">19세 이하</label>
      </div>
      <div>
        <input id="q1_option2" v-model="q1_value" type="radio" name="usage" value="q1_option2">
        <label for="q1_option2">20세~40세</label>
      </div>
      <div>
        <input id="q1_option3" v-model="q1_value" type="radio" name="usage" value="q1_option3">
        <label for="q1_option3">41세~50세</label>
      </div>
      <div>
        <input id="q1_option4" v-model="q1_value" type="radio" name="usage" value="q1_option4">
        <label for="q1_option4">51세~60세</label>
      </div>
      <div>
        <input id="q1_option5" v-model="q1_value" type="radio" name="usage" value="q1_option5">
        <label for="q1_option5">61세 이상</label>
      </div>

      <div>
        <h3>2. 투자하고자 하는 자금의 투자 가능 기간은 얼마나 됩니까?</h3>
        <div>
          <input id="q2_option1" v-model="q2_value" type="radio" name="q2_investment_period" value="6개월 이내">
          <label for="q2_option1">6개월 이내</label>
        </div>
        <div>
          <input id="q2_option2" v-model="q2_value" type="radio" name="q2_investment_period" value="6개월 이상~1년 이내">
          <label for="q2_option2">6개월 이상~1년 이내</label>
        </div>
        <div>
          <input id="q2_option3" v-model="q2_value" type="radio" name="q2_investment_period" value="1년 이상~2년 이내">
          <label for="q2_option3">1년 이상~2년 이내</label>
        </div>
        <div>
          <input id="q2_option4" v-model="q2_value" type="radio" name="q2_investment_period" value="3년 이상">
          <label for="q2_option4">3년 이상</label>
        </div>
      </div>

      <div>
        <h3>3. 다음 중 투자경험과 가장 가까운 것은 어느 것입니까?(중복 가능)</h3>
        <div>
          <input id="q3_option1" v-model="q3_value" type="checkbox" name="q3_experience" value="은행의 예·적금">
          <label for="q3_option1">은행의 예·적금, 국채, 지방채, 보증채, MMF, CMA 등</label>
        </div>
        <div>
          <input id="q3_option2" v-model="q3_value" type="checkbox" name="q3_experience" value="금융채">
          <label for="q3_option2">금융채, 신용도가 높은 회사채, 채권형펀드, 원금보존추구형ELS 등</label>
        </div>
        <div>
          <input id="q3_option3" v-model="q3_value" type="checkbox" name="q3_experience" value="중간 등급의 회사채">
          <label for="q3_option3">신용도 중간 등급의 회사채, 원금의 일부만 보장되는 ELS, 혼합형펀드 등</label>
        </div>
        <div>
          <input id="q3_option4" v-model="q3_value" type="checkbox" name="q3_experience" value="주식">
          <label for="q3_option4">신용도가 낮은 회사채, 주식, 원금이 보장되지 않는 ELS, 시장수익률 수준의 수익을 추구하는 주식형펀드 등</label>
        </div>
        <div>
          <input id="q3_option5" v-model="q3_value" type="checkbox" name="q3_experience" value="주식형펀드">
          <label for="q3_option5">ELW, 선물옵션, 시장수익률 이상의 수익을 추구하는 주식형펀드, 파생상품에 투자하는 펀드, 주식 신용거래 등</label>
        </div>
      </div>

      <div>
        <h3>4. 금융상품 투자에 대한 본인의 지식수준은 어느 정도라고 생각하십니까?</h3>
        <div>
          <input id="q4_option1" v-model="q4_value" type="radio" name="q4_knowledge_level" value="매우 낮은 수준">
          <label for="q4_option1">［매우 낮은 수준］투자의사 결정을 스스로 내려본 경험이 없는 정도</label>
        </div>
        <div>
          <input id="q4_option2" v-model="q4_value" type="radio" name="q4_knowledge_level" value="낮은 수준">
          <label for="q4_option2">［낮은 수준］주식과 채권의 차이를 구별할 수 있는 정도</label>
        </div>
        <div>
          <input id="q4_option3" v-model="q4_value" type="radio" name="q4_knowledge_level" value="높은 수준">
          <label for="q4_option3">［높은 수준］투자할 수 있는 대부분의 금융상품의 차이를 구별할수 있는 정도</label>
        </div>
        <div>
          <input id="q4_option4" v-model="q4_value" type="radio" name="q4_knowledge_level" value="매우 높은 수준">
          <label for="q4_option4">［매우 높은 수준］금융상품을 비롯하여 모든 투자대상 상품의 차이를 이해할 수 있는 정도</label>
        </div>
      </div>
      <div>
        <h3>5. 현재 투자하고자 하는 자금은 전체 금융자산(부동산 등을 제외) 중 어느 정도의 비중을 차지합니까?</h3>
        <div>
          <input id="q5_option1" v-model="q5_value" type="radio" name="q5_investment_allocation" value="10% 이내">
          <label for="q5_option1">10% 이내</label>
        </div>
        <div>
          <input id="q5_option2" v-model="q5_value" type="radio" name="q5_investment_allocation" value="10% ~ 20% 이내">
          <label for="q5_option2">10% ~ 20% 이내</label>
        </div>
        <div>
          <input id="q5_option3" v-model="q5_value" type="radio" name="q5_investment_allocation" value="20% ~ 30% 이내">
          <label for="q5_option3">20% ~ 30% 이내</label>
        </div>
        <div>
          <input id="q5_option4" v-model="q5_value" type="radio" name="q5_investment_allocation" value="30% 이상 ~ 40% 이내">
          <label for="q5_option4">30% 이상 ~ 40% 이내</label>
        </div>
        <div>
          <input id="q5_option4" v-model="q5_value" type="radio" name="q5_investment_allocation" value="40%">
          <label for="q5_option4">40%</label>
        </div>
      </div>

      <div>
        <h3>6. 다음 중 당신의 수입원을 가장 잘 나타내고 있는 것은 어느 것입니까?</h3>
        <div>
          <input id="q6_option1" v-model="q6_value" type="radio" name="q6_income_source" value="안정">
          <label for="q6_option1">현재 일정한 수입이 발생하고 있으며, 향후 현재 수준을 유지하거나 증가할 것으로 예상된다.</label>
        </div>
        <div>
          <input id="q6_option2" v-model="q6_value" type="radio" name="q6_income_source" value="불안정">
          <label for="q6_option2">현재 일정한 수입이 발생하고 있으나, 향후 감소하거나 불안정할 것으로 예상된다.</label>
        </div>
        <div>
          <input id="q6_option3" v-model="q6_value" type="radio" name="q6_income_source" value="수익없음">
          <label for="q6_option3">현재 일정한 수입이 없으며, 연금이 주수입원이다.</label>
        </div>
      </div>

      <div>
        <h3>7. 만약 투자원금에 손실이 발생할 경우 다음 중 감수할 수 있는 손실 수준은 어느 것입니까?</h3>
        <div>
          <input id="q7_option1" v-model="q7_value" type="radio" name="q7_loss_tolerance" value="원금 보전">
          <label for="q7_option1">무슨 일이 있어도 투자원금은 보전되어야 한다.</label>
        </div>
        <div>
          <input id="q7_option2" v-model="q7_value" type="radio" name="q7_loss_tolerance" value="10% 미만 손실">
          <label for="q7_option2">10% 미만까지는 손실을 감수할 수 있을 것 같다.</label>
        </div>
        <div>
          <input id="q7_option3" v-model="q7_value" type="radio" name="q7_loss_tolerance" value="20% 미만 손실">
          <label for="q7_option3">20% 미만까지는 손실을 감수할 수 있을 것 같다.</label>
        </div>
        <div>
          <input id="q7_option4" v-model="q7_value" type="radio" name="q7_loss_tolerance" value="상관없음">
          <label for="q7_option4">기대수익이 높다면 위험이 높아도 상관하지 않겠다.</label>
        </div>
      </div>
      <input type="submit" value="제출">
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
/* 여기에 CSS 스타일을 추가할 수 있습니다. */
</style>
