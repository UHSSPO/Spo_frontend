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
  mrktTotAmt: number // 시가총액
  interestStockYn: string // 즐겨찾기
}
export interface IThemeStockInfo {
  stockInfoSequence: number // 주식상장정보 일련번호
  itmsNm: string // 주식명
  clpr: number // 종가
  fltRt: number // 등락률
  trqu: number // 거래량
  mrktTotAmt: number // 시가총액
}
export interface ITheme{
  highViews:Array<IThemeStockInfo> // 조회수 높은순
  increaseStock:Array<IThemeStockInfo> // 상승률 높은순
  declineStock:Array<IThemeStockInfo> // 하락률 높은순
}

export interface IShortInvestment {
  stockInfoSequence: number // 주식상장정보 일련번호
  itmsNm: string // 주식명
  clpr: number // 종가
  fltRt: number // 등락률
  mrktTotAmt: number // 시가총액
  interestStockYn: string // 즐겨찾기
  rating?: string // 등급
}

export interface ILongInvestment {
  stockInfoSequence: number // 주식상장정보 일련번호
  itmsNm: string // 주식명
  clpr: number // 종가
  fltRt: number // 등락률
  mrktTotAmt: number // 시가총액
  interestStockYn: string // 즐겨찾기
  rating?: string // 등급
}

export interface IInterest {
  stockInfoSequence: number // 주식상장정보 일련번호
  itmsNm: string // 주식명
  clpr: number // 종가
  fltRt: number // 등락률
  trqu: number // 거래량
  mrktTotAmt: number // 시가총액
}

export interface ISearchStockInfo {
  stockInfoSequence:number // 주식상장정보 일련번호
  itmsNm:string // 주식명
}
