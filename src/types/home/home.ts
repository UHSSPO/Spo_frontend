export interface IMarketIndex {
  marketIndexSequence: number // 지수 일련번호
  clpr: number // 종가
  vs: number // 대비
  fltRt: number // 등락률
  idxNm: string // 지수명
}

export interface IPopularStock {
  stockInfoSequence: number // 주식상장정보 일련번호
  itmsNm: string // 주식명
  clpr: number // 종가
  fltRt: number // 등락률
  trqu: number // 거래량
  mrktTotAmt: number // 시가총액
}
export interface IHighViews {
  stockInfoSequence: number // 주식상장정보 일련번호
  itmsNm: string // 주식명
  clpr: number // 종가
  fltRt: number // 등락률
  trqu: number // 거래량
  mrktTotAmt: number // 시가총액
}
export interface IIncreaseStock {
  stockInfoSequence: number // 주식상장정보 일련번호
  itmsNm: string // 주식명
  clpr: number // 종가
  fltRt: number // 등락률
  trqu: number // 거래량
  mrktTotAmt: number // 시가총액
}
export interface IDeclineStock {
  stockInfoSequence: number // 주식상장정보 일련번호
  itmsNm: string // 주식명
  clpr: number // 종가
  fltRt: number // 등락률
  trqu: number // 거래량
  mrktTotAmt: number // 시가총액
}
export interface ITheme{
  highViews:Array<IHighViews> // 조회수 높은순
  increaseStock:Array<IIncreaseStock> // 상승률 높은순
  declineStock:Array<IDeclineStock> // 하락률 높은순

}
