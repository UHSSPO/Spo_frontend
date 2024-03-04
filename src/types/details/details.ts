export interface ISummFinaInfo {
  finaInfoSequence: number; // 재무제표 일련번호
  stockInfoSequence: number; // 주식 상장 정보 일련번호
  crno: string; // 법인등록번호
  bizYear: string; // 사업연도
  fnclDcd: string; // 재무재표구분코드
  fnclDcdNm: string; // 재무재표구분코드명
  enpSaleAmt: number; // 기업매출금액
  enpBzopPft: number; // 기업영업이익
  iclsPalClcAmt: number; // 포괄손익계산금액
  enpCrtmNpf: number; // 기업당기순이익
  enpTastAmt: number; // 기업총자산금액
  enpTdbtAmt: number; // 기업총부채금액
  enpTcptAmt: number; // 기업총자본금액
  enpCptlAmt: number; // 기업자본금액
  fnclDebtRto: number; // 재무제표부채비율
  updateAt: string; // 업데이트 일자 (Format: date-time)
}

export interface IIncoInfo {
  incoInfoSequence: number; // 손익계산서 일련번호
  stockInfoSequence: number; // 주식 상장 정보 일련번호
  crno: string; // 법인등록번호
  bizYear: string; // 사업연도
  curCD: string; // 통화코드
  fnclDcd: string; // 재무재표구분코드
  fnclDcdNm: string; // 재무재표구분코드명
  acitId: string; // 계정과목ID
  acitNm: string; // 계정과목명
  crtmAcitAmt: number; // 당기계정과목금액
  pvtrAcitAmt: number; // 전기계정과목금액
  bpvtrAcitAmt: number; // 전전기계정과목금액
  updateAt: string; // 업데이트 일자 (Format: date-time)
}

export interface IPriceInfo {
  stockPriceSequence: number; // 주식 가격 정보 일련번호
  stockInfoSequence: number; // 주식 상장 정보 일련번호
  srtnCd: string; // 단축코드
  itmsNm: string; // 종목명
  basDt: string; // 기준일자
  clpr: number; // 종가
  fltRt: number; // 등락률
  vs: number; // 대비
  mkp: number; // 시가
  hipr: number; // 고가
  lopr: number; // 저가
  trqu: number; // 거래량
  trPrc: number; // 거래대금
  lstgStCnt: number; // 상장주식수
  mrktTotAmt: number; // 시가총액
  updateAt: string; // 업데이트 일자 (Format: date-time)
}

export interface IEnterpriseCategories {
  enterpriseCategorySequence: number; // 기업 평가 항목 일련번호
  stockInfoSequence: number; // 주식 상장 정보 일련번호
  itmsNm: string; // 종목명
  pbr: number; // PBR
  per: number; // PER
  salesGrowthRate: number; // 매출 성장률
  incomeBeforeTaxExpenseDiff: number; // 법인세 비용 차감 전 순이익 성장률
  financialStatementDebtRatio: number; // 재무제표 부채비율
  roe: number; // ROE
  roa: number; // ROA
  volume: number; // 거래량 변화 비율
  changeMarketGap: number; // 시가총액 변화 비율
  volumeRatio: number; // 시가총액 기준 거래대금 비율
  moveAverage: string; // 이동평균선
  updateAt: string; // 업데이트 일자 (Format: date-time)
}

export interface IEnterpriseInfo {
  enterpriseInfoSequence: number; // 기업 정보 일련번호
  stockInfoSequence: number; // 주식 상장 정보 일련번호
  crno: string; // 법인등록번호
  corpNm: string; // 법인명
  enpRprFnm: string; // 대표이사 명
  enpBsadr: string; // 기업기본주소
  enpHmpgUrl: string; // 기업홉페이지
  enpTlno: string; // 기업전화번호
  enpEstbDt: string; // 기업설립일자
  enpEmpeCnt: number; // 기업종업원수
  enpMainBizNm: string; // 기업주요사업명
  updateAt: string; // 업데이트 일자 (Format: date-time)
}

export interface IStockInfo {
  stockInfoSequence: number; // 주식 상장 정보 일련번호
  basDt: string; // 기준일자
  crno: string; // 법인등록번호
  srtnCd: string; // 단축코드
  corpNm: string; // 법인명
  itmsNm: string; // 종목명
  mrktCtg: string; // 시장구분
  tradeSuspendYn: string; // 거래정지 여부
  badData: string; // 부실 데이터 여부
  updateAt: string; // 업데이트 일자 (Format: date-time)
  summFinaInfo: ISummFinaInfo
  incoInfo: Array<IIncoInfo>
  priceInfo: IPriceInfo
  prc15tnMonInfo: Array<IPriceInfo>
  enterpriseCategories: IEnterpriseCategories
  enterpriseInfo: IEnterpriseInfo
}
