<template>
  <div id="container" class="line">
    <div class="content dynamic-layout consent">
      <s-popup
        v-if="consentPopup"
        persistent
        :title="'약관동의'"
        class="consent-popup"
        @close="consentPopup = false"
      >
        <div class="consent-con-wrap">
          <div class="terms-and-conditions">
            <p>■ 회 원 가 입 약 관 ■</p>
            <p>※ 제1장 총칙</p>

            <p>1조 목적</p>
            <p>이 약관은 에서 제공하는 온라인 웹서비스의 이용함에 있어 회원과 회사간의 권리와 의무,</p>
            <p>책임사항 및 서비스 이용절차에 관한사항을 규정함을 목적으로 한다.</p>

            <p>2조 용어의 정의</p>
            <p>1.이 약관에서 사용하는 용어의 정의는 다음과 같습니다</p>
            <p>가)회원: 이 약관내용을 승인하고 회원가입을하여 회사와 서비스 이용계약을 체결한자를 말한다</p>
            <p>나)아이디(ID): 회원의 식별과 서비스 이용을 위하여 회원이 설정하고 회사가 승인한 숫자와 문자의 조합을 말한다</p>
            <p>다)비밀번호(PW): 회원의 개인정보의 보호를 위하여 회원이 설정하고 회사가 승인한 숫자와 문자의 조합을 말한다</p>

            <p>3조 약관의 명시와 개정</p>
            <p>1.회사는 이 약관을 서비스를 이용하고자 하는 자와 회원이 알수 있도록 회사의 웹사이트 화면에 게시한다</p>
            <p>2.약관의 내용이 변경이 있을시 회사는 변경 7일전부터 변경 전날까지 회사 웹사이트의 공지사항을 통해 이 사실을 알려야한다</p>
            <p>3.이 약관의 회사와 회원간에 성립되는 서비스 이용계약의 기본약정입니다 회사는 약관의 내용의 보충 및 개정을 필요에의하여 개정할 수 있습니다</p>

            <p>4조 서비스의 종류</p>
            <p>1.회원이 회사의 제공되는 정보를 통해 투자의 도움을 받는다.</p>
            <p>2.회원이 주식 상세 정보를 열람한다.</p>
            <p>3게시판에 자유롭게 게시글 등록 및 투자에 대한 지식 정보를 공유한다.</p>

            <p>※ 제2장 서비스 이용계약</p>

            <p>5조 서비스 이용신청</p>
            <p>1.회원가입페이지 하단의 이용약관에 체크버튼이 선택된경우 회사가 정한 회원가입양식의 정보를 작성하고 신청한 자는 이용약관에 동의한것으로 간주한다</p>

            <p>6조 서비스 이용신청의 승낙</p>
            <p>1.다음 사항에 해당할때 회사는 회원의 서비스 이용계약의 신청을 승낙하지 않을수있다</p>
            <p>가)회사의 웹사이트를 운영함에 있어 필요한 장비나 서버의 자원또는 인력이 부족할때</p>
            <p>나)천재지변 또는 재해등의 피해를 입어 정상적인 웹사이트 운영에 지장이 있다고 판단될때</p>
            <p>다)회원이 되고자하는자가 입력한 개인정보가 이미 등록된 정보일때</p>
            <p>라)이용약관의 2장 7조 서비스 이용계약의 종료 조건에 해당하여 회사가 이용계약을 해지시킨 회원의 재가입 신청일때</p>
            <p>마)회사가 요구하는 필수정보를 허위로 기재한 사실이 밝혀질때</p>
            <p>바)기타 부당한 방법으로 서비스 이용계약을 신청할때</p>

            <p>7조 서비스 이용계약의 종료</p>
            <p>1.회원은 이 약관에 정한 절차에 따라서 서비스 이용계약을 해지할 수 있다</p>
            <p>2.회원의 서비스 이용계약의 해지</p>
            <p>가)회원의 정보수정의 회원탈퇴를 통하여 언제든지 서비스 이용계약을 해지신청할 수 있다</p>
            <p>나)회원의 신청에 의해 서비스 이용계약이 해지되면 가상 투자 정보, 관심종목 등 개인정보는 지체없이 파기된다.</p>
            <p>다)이용약관의 절차에 따라 서비스 이용계약의 해지를 신청한 회원은 이용약관의 절차에따라 언제든지 재가입할 수 있다</p>
            <p>3.회사의 서비스 이용계약의 해지</p>
            <p>가)회원에게 제2장 6조의 승낙거부 사항에 해당될때</p>
            <p>나)회원이 회사나 다른 회원, 기타 타인의 권리나 명예, 신용, 기타 정당한 이익을 침해하는 행위를 한 경우</p>
            <p>다)개인정보가 불일치하거나 불량한경우</p>
            <p>라)타인의 개인정보를 도용한경우</p>
            <p>마)본 약관의 내용을 위반하는 행위를 한경우</p>
            <p>바)운영자의 판단에 의해 회원자격이 없다고 판단되는경우</p>
            <p>사)비방이나 욕설, 광고관련 게시글을 작성하였거나 미풍양속을 침해하는 게시글을 작성하였을때</p>
            <p>아)정상적인 서비스 제공을 방해하거나 업무에 지장을 미치는 행위를한경우</p>

            <p>※ 제3장 회원정보의 수집과 보호</p>

            <p>8조 회원정보의 변경</p>
            <p>1.정보수정 페이지에서 회원정보를 언제든지 변경할수 있다</p>
            <p>2.잘못변경된 회원정보로 인한 손해 및 피해는 회사에서 책임을 지지않는다</p>

            <p>9조 아이디와 비밀번호의 관리</p>
            <p>1.회원은 자신의 아이디와 비밀번호를 관리할 의무와 책임이 있다</p>
            <p>2.자신의 관리소홀로 인한 아이디와 비밀번호 누출로 인한 사고는 모두 회원이 책임을 진다</p>
            <p>3.회사의 관리소홀로 인한 개인정보의 누출및 사고로 인한 책임은 모두 회사가 가지며 관계법령을 따른다</p>

            <p>※ 제4장 서비스 이용</p>

            <p>9조 게시판의 이용</p>
            <p>1.게시판 이용 원칙</p>
            <p>가)회원들은 본 이용약관에 대한 동의로써 게시판을 사용할 수 있다</p>
            <p>나)게시물(이미지 문구 및 첨부파일 등 포함)로 인해 발생하는 저작권 침해를 비롯한 민, 형사상의 모든 책임은 당해 게시물의 게시자에게 있으며, 회사는 이에 대해 책임지지 않습니다.</p>
            <p>2.게시물의 저작권</p>
            <p>가)회사의 게시판에 등록된 게시물의 저작권은 제3자의 권리를 침해하지 않는 한, 게시자에게 속합니다</p>
            <p>나)회사는 게시물 저작권자의 동의를 통해 이를 홍보 및 기타의 자료로 사용할 수 있습니다</p>
            <p>3.게시물의 관리</p>
            <p>가)회사는 다음과 같은 내용의 게시물의 등록을 금하며, 회원에 대한 사전통보 없이 게시물을 삭제하거나, 열람을 제한하거나, 쓰기를 금지하거나, 게시자의 회원자격을 박탈할 수 있습니다.</p>
            <p>①공공질서나 미풍양속에 위배되는 내용</p>
            <p>②불법물 또는 음란물의 게시, 등록 또는 이와 관련된 물품의 홍보, 사이트 링크 등의 행위</p>
            <p>③타인의 권리나 개인정보, 명예, 신용, 기타 정당한 이익을 침해하는 내용을 포함하는 경우</p>
            <p>④범죄행위와 관련된 내용을 포함하는 경우</p>
            <p>⑤허위 또는 과장 광고 내용을 포함하는 경우</p>
            <p>⑥정치, 경제적 분쟁을 야기하는 내용을 포함하는 경우</p>
            <p>⑦정보통신 설비의 오동작을 유발하거나, 혼란을 유발하는 컴퓨터 바이러스 또는 데이터를 포함하는 경우</p>
            <p>⑧기타 대한민국의 관련 법령에 위반되는 내용을 포함하는 경우</p>

            <p>10조 회원의 의무와 책임</p>
            <p>1.주민등록번호 생성 및 동일한 IP 주소에서 대량의 회원가입을 하는 경우 회원자격 박탈 및 법적인 책임까지 회원은 져야한다</p>
            <p>2.회원은 본 약관을 숙지하여야하며 본 약관에 위배된 행동을 한 경우에는 회원자격 박탈 및 관계법령에 따른 처벌을 받을수 있다</p>

            <p>11조 회사의 의무와 책임</p>
            <p>1.회사는 회원의 소중한 개인정보를 웹사이트의 관리 목적으로만 사용하여야하며, 타인 또는 업체에게 제공 및 누설을 하여서는 않된다</p>
            <p>2.회사는 원활한 웹사이트 운영과 회원의 원활한 이용을 위해 서비스의 발전과 개선에 노력을 기울이도록한다</p>
            <p>3.10조 1항의 사항을 어길시 회사는 법적인 책임을 질것이다</p>

            <p>※ 제5장 분쟁 해결</p>

            <p>1.회사는 회원이 제기하는 서비스에 대한 불만과 건의사항, 제안 등을 적극적으로 수렴하여 반영하여야 하며 서비스 개선에 노력을 기울여야한다</p>
            <p>2.회사와 회원간의 분쟁은 회사의 소재지를 관할법원으로 한다</p>
            <p>3.회사와 회원간의 분쟁의 해결을 위해 서로 절충과 타협을 거쳐 원만한 해결을 해야한다, 분쟁 해결이 되지 않을시 관계법령에 따른다</p>
            <p>4.회사와 회원간의 분쟁으로 인한 소송에는 한국법을 적용한다</p>
            <p>5.회사는 회원과 회원간의 분쟁에는 책임을 지지 아니하며 회원간에 서로 해결하는것을 원칙으로한다</p>

            <p>※ 제6장 기타</p>

            <p>1.제 3자의 부당한 행위나 회원에게 피해를 끼친 경우 이러한 문제에 대해 회사는 책임을 지지않는다</p>
            <p>2.회사는 직접 게시하지 않은 어떠한 정보에 대해서도 책임을 지지않는다</p>
            <p>3.회사는 광고진행에 있어 자유롭게 광고를 변경하며 진행할 수 있다</p>

            <p>본 약관은 2024년 04월 29일 최초 개정되었습니다.</p>
            <s-check-box
              v-model="consentTerms"
              :required="true"
              label="동의함"
            />
          </div>
          <div class="privacy-policy">
            <p> ■ 개 인 정 보 취 급 방 침 ■</p>

            <p>※ 수집하는 개인정보 항목</p>
            <p>회사는 회원가입, 상담, 서비스 신청 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.</p>
            <p>개인정보 수집방법 : 홈페이지(회원가입, 게시판, 투자성향분석, 가상투자)</p>
            <p>로그인ID</p>
            <p>패스워드</p>
            <p>이름</p>
            <p>이메일</p>
            <p>서비스 이용기록</p>
            <p>접속 로그</p>
            <p>쿠키</p>
            <p>접속 IP 정보</p>

            <p>※ 개인정보의 수집 및 이용목적</p>

            <p>회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>

            <p>서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산</p>
            <p>컨텐츠 제공, 물품배송 또는 청구서 등 발송, 본인인증, 구매 및 요금 결제, 요금추심</p>
            <p>회원 관리</p>
            <p>회원제 서비스 이용에 따른 본인확인 , 개인 식별 , 불량회원의 부정 이용 방지와 비인가 사용 방지 , 가입 의사 확인</p>
            <p>마케팅 및 광고에 활용</p>
            <p>접속 빈도 파악 또는 회원의 서비스 이용에 대한 통계</p>
            <p>※ 개인정보의 보유 및 이용기간</p>

            <p>원칙적으로, 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.</p>
            <p>단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.</p>
            <p>보존 항목 : 로그인ID , 결제기록</p>
            <p>보존 근거 : 신용정보의 이용 및 보호에 관한 법률</p>
            <p>보존 기간 : 1년</p>
            <p>표시/광고에 관한 기록 : 6개월 (전자상거래등에서의 소비자보호에 관한 법률)</p>
            <p>계약 또는 청약철회 등에 관한 기록 : 5년 (전자상거래등에서의 소비자보호에 관한 법률)</p>
            <p>대금결제 및 재화 등의 공급에 관한 기록 : 5년 (전자상거래등에서의 소비자보호에 관한 법률)</p>
            <p>소비자의 불만 또는 분쟁처리에 관한 기록 : 3년 (전자상거래등에서의 소비자보호에 관한 법률)</p>
            <p>신용정보의 수집/처리 및 이용 등에 관한 기록 : 3년 (신용정보의 이용 및 보호에 관한 법률)</p>
            <s-check-box
              v-model="consentPrivacy"
              :required="true"
              label="동의함"
            />
          </div>
          <div class="consent-footer-wrap">
            <div class="consent-check-wrap">
              <s-check-box
                v-model="allConsent"
                :required="true"
                label="전체동의"
                @click="onClickAllConsent"
              />
            </div>
            <div class="consent-btn-wrap">
              <s-button class="s-button" @click="onClickConsent()">
                확인
              </s-button>
              <s-button class="c-button" @click="closeConsent()">
                취소
              </s-button>
            </div>
          </div>
        </div>
      </s-popup>
      <div class="sign-up">
        <div class="sign-up-header">
          <h1>카카오 계정으로 가입하기</h1>
        </div>
        <div class="sign-up-input">
          <s-text-field
            v-model="formData.email"
            label="이메일"
            :required="true"
            :disabled="true"
          />
          <s-text-field
            v-model="formData.nickName"
            label="닉네임"
            :required="true"
            :max-length="10"
          />
          <s-text-field
            v-model="formData.dateOfBirth"
            label="생년월일"
            :required="true"
            :rules="[checkDateFormat]"
          />
          <s-text-field
            v-model="formData.pwd"
            label="패스워드"
            :required="true"
            :rules="[checkPassword]"
            type="password"
          />
          <s-text-field
            v-model="checkPwd"
            label="패스워드 재입력"
            :required="true"
            :rules="[checkSecondPassword]"
            type="password"
          />
        </div>
        <div class="sign-up-button">
          <s-button class="w-100 s-button" :disabled="!isButtonDisabled" @click="onClickSignUp">
            가입
          </s-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { IKakaoCertified, ISignUp } from '../../types/auth/auth'
import { kakaoCertified, signUp } from '../../api/auth'
import STextField from '../../components/common/STextField.vue'
import SButton from '../../components/common/SButton.vue'
import StringUtil from '../../util/StringUtil'
import { commonStore } from '../../util/store-accessor'
import Popup from '~/components/virtual/virtual.vue'
import SPopup from '~/components/common/SPopup.vue'
import SCheckBox from '~/components/common/SCheckBox.vue'
@Component({
  components: { SCheckBox, SPopup, Popup, STextField, SButton },
  layout: 'empty',
  name: 'kakao-login'
})
export default class KakaoLogin extends Vue {
  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/
  private authData = {} as IKakaoCertified
  private code = (this.$route.query.code || '') as string
  private formData = {
    email: '',
    pwd: '',
    dateOfBirth: '',
    signUpChannel: '',
    nickName: '',
    success: false
  } as ISignUp

  private checkPwd = ''
  private allConsent = false
  private consentTerms = false
  private consentPrivacy = false
  private consentPopup = true

  /********************************************************************************
   * Life Cycle
   ********************************************************************************/
  async created() {
    this.authData = {
      apikey: '2e79fbfa9c3fe6aad98a3ca66e8e5f6f',
      redirectUri: `${window.location.origin}/auth/kakao-login`,
      code: this.code
    }
    this.consentPopup = true

    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    const response = await kakaoCertified(this.authData)
    if (response.check) {
      commonStore.ADD_DIALOG({
        id: 'EMAIL_CHECK',
        text: '이미 가입된 이메일입니다. 관리자에게 문의 해주세요.',
        callback: () => {
          this.$router.push('/')
        }
      })
    }
    this.formData.email = response.email
    this.formData.nickName = response.nickName
    this.formData.signUpChannel = 'kakao'
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  }

  /********************************************************************************
   * Method (Event, Business Logic)
   ********************************************************************************/
  private async onClickSignUp() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    const response = await signUp(this.formData)
    if (StringUtil.isNotEmpty(response)) {
      commonStore.ADD_DIALOG({
        id: 'SUCCESS_SIGN_UP',
        text: '회원가입이 완료 됐습니다.',
        callback: () => {
          this.$router.push('/')
        }
      })
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  }

  private checkDateFormat(value: string): boolean | string {
    const regex = /^\d{6}$/
    return regex.test(value) || 'YYMMDD 형식으로 입력해주세요.'
  }

  private checkPassword(value: string): boolean | string {
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/
    return regex.test(value) || '패스워드는 8자리 이상 특수문자 포함(?제외) 영문자 포함하여 입력 해주세요.'
  }

  private checkSecondPassword(value: string): boolean | string {
    return this.formData.pwd === value || '패스워드와 패스워드 재입력이 불일치 합니다.'
  }

  private get isButtonDisabled(): boolean {
    if (this.checkDateFormat(this.formData.dateOfBirth) === true &&
      this.checkPassword(this.formData.pwd) === true &&
      StringUtil.isNotEmpty(this.formData.nickName) &&
      this.checkSecondPassword(this.checkPwd) === true) {
      return true
    } else {
      return false
    }
  }

  private onClickConsent() {
    this.consentPopup = false
  }

  private onClickAllConsent() {
    this.consentPrivacy = true
    this.consentTerms = true
  }

  private closeConsent() {
    this.$router.push('/home')
  }
}
</script>
