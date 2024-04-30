export interface IInterestStock {
  stockInfoSequence: number; // 종목 정보 일련번호
  itmsNm: string; // 종목명
  clpr: number; // 종가
  fltRt: number; // 등락률
  trqu: number; // 거래량
  mrktTotAmt: number; // 시가총액
}

export interface ISelectMyInfoRes {
  userSequence: number; // 유저 일련번호
  email: string; // 이메일
  investPropensity: string; // 투자 성향
  createdAt: string; // 가입일 (날짜 및 시간)
  userRole: string; // 유저 권한
  nickName: string; // 닉네임
  dateOfBirth: string; // 생년월일
  interestStock: Array<IInterestStock>
  commendPersonalStock: Array<ICommendPersonalStock>
}

export interface IChangePasswordReqBody {
  beforePassword: string; // 현재 비밀번호
  afterPassword: string; // 변경 비밀번호
}

export interface IChangeNickNameReqBody {
  changeNickName: string; // 변경 닉네임
}

export interface IChangePasswordRes {
  changePasswordYn: string // 비밀번호 변경 여부
}

export interface IChangeNickNameRes {
  changeNickNameYn: string // 닉네임 변경 여부

}

export interface IinvestPropensityReqBody {
  totalScore: number // 투자성향 45
}

export interface IinvestPropensityRes {
  investPropensity: string // 투자성향 05
}

export interface ICommendPersonalStock {
  stockInfoSequence: number // 주식 상장 정보 일련번호
  basDt: string // 기준일자 (예: "20231218")
  crno: string // 법인등록번호 (예: "1101110043870")
  srtnCd: string // 단축코드 (예: "A00123")
  corpNm: string // 법인명 (예: "삼성전자")
  itmsNm: string // 종목명 (예: "삼성전자")
  mrktCtg: string // 시장구분 (예: "KOSPI")
  tradeSuspendYn: string // 거래정지 여부 (예: "N")
  badData: string // 부실 데이터 여부 (예: "N")
  updateAt: string; // 업데이트 일자 (예: "20231218")
  clpr: number,
  fltRt: number,
  trqu: number,
  mrktTotAmt: number
}
