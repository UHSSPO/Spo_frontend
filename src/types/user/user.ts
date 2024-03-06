export interface InterestStockItem {
  interestSequence: number; // 관심 주식 일련번호
  stockInfoSequence: number; // 주식 상장 정보 일련번호
  userSequence: number; // 유저 일련번호
  updateAt: string; // 업데이트 일자 (날짜 및 시간)
}

export interface IInterest {
  stockInfoSequence: number // 주식상장정보 일련번호
  itmsNm: string // 주식명
  clpr: number // 종가
  fltRt: number // 등락률
  trqu: number // 거래량
  mrktTotAmt: number // 시가총액
}

export interface ISelectMyInfoRes {
  userSequence: number; // 유저 일련번호
  email: string; // 이메일
  investPropensity: string; // 투자 성향
  createdAt: string; // 가입일 (날짜 및 시간)
  userRole: string; // 유저 권한
  nickName: string; // 닉네임
  dateOfBirth: string; // 생년월일
  interest: Array<IInterest> // 관심 주식
}

export interface IChangePasswordReqBody {
  beforePassword: string; // 현재 비밀번호
  afterPassword: string; // 변경 비밀번호
}
