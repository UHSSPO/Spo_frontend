import ApiUtil from '~/util/ApiUtil'
import { IBuyStockInvestmentReq, ISelectUserInvestmentStart, ISellStockInvestmentReq } from '~/types/virtual/virtual'

// 가상투자 시작 여부
export const startInvestmentYn = () => ApiUtil.get('/virtual', {})

// 가상투자 종목 상세 조회
export const getVirtualDetail = (stockInfoSequence: number) => ApiUtil.get(`/virtual/stock/${stockInfoSequence}`, {})

// 가상투자 유저 투자 리스트
export const getVirtualUser = (userSequence: number) => ApiUtil.get(`/virtual/list/${userSequence}`, {})

// 가상투자 유저 투자 정보
export const UserInvestmentInfo = (userSequence: number) => ApiUtil.get(`/virtual/user/${userSequence}`, {})

// 가상투자 랭킹
export const InvestmentRank = () => ApiUtil.get('/virtual/ranking', {})

// 가상투자 시작
export const startVirtual = (params: ISelectUserInvestmentStart) => ApiUtil.post('/virtual/start', params)

// 가상투자 매수
export const buyVirtual = (params: IBuyStockInvestmentReq) => ApiUtil.post('virtual/buy', params)

// 가상투자 매도
export const sellVirtual = (params: ISellStockInvestmentReq) => ApiUtil.post('virtual/sell', params)
