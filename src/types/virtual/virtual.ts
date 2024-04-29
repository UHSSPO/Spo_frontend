import { IInterestStock } from '~/types/user/user'

export interface ISelectUserInvestmentStart {
  startInvestmentYn: string // 가상 투자 시작 여부
}

export interface ISpoUserInvestmentStock {
  userInvestmentStockSequence: number // 유저 투자 종목 정보 일련번호
  userSequence: number // 유저 일련 번호
  stockInfoSequence: number // 주식 상장 정보 일련번호
  quantity: number // 보유수량
  itemValueAmount: number // 평가금액
  itemBuyAmount: number // 매수금액
  itemProfit: number // 손익
  itemFltRt: number // 수익률
  averageAmount: number // 평균단가
  creatAt: string // 생성 일자
}

export interface ISpoUserInvestment {
  userInvestmentSequence: number // 유저 투자 정보 일련번호
  userSequence: number // 유저 일련 번호
  amount: number // 현재금액
  buyAmount: number // 매수금액
  profitLossSales: number // 매매손익
  valueAmount: number // 평가금액
  userFltRt: number // 수익률
}

export interface IBuyStockInvestmentReq {
  stockInfoSequence: number // 주식상장정보 일련번호
  quantity: number // 매수량
}

export interface IBuyStockInvestmentRes {
  buyStockYn: string // 가상 투자 매수 여부
}
