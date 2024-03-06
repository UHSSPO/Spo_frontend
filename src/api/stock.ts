import ApiUtil from '~/util/ApiUtil'

export const MarketIndex = () => ApiUtil.get('/stock/market-index', {})

export const PopularStock = () => ApiUtil.get('/stock/popular', {})

export const Theme = () => ApiUtil.get('/stock/theme', {})

export const ShortInvestment = () => ApiUtil.get('/stock/recommend/short-investment', {})

export const LongInvestment = () => ApiUtil.get('/stock/recommend/long-investment', {})

export const GetInterest = () => ApiUtil.get('/stock/my/interest', {})

export const getDetail = (stockInfoSequence: number) => ApiUtil.get(`/stock/${stockInfoSequence}`, {})

export const getInterestStockItem = () => ApiUtil.get('/user/my', {})
// 관심주식 등록
export const UpdateInterestStock = (stockInfoSequence: number) => ApiUtil.post('/stock/interest', { stockInfoSequence })

// 단기추천주식 더보기
export const ShortInvestmentAll = () => ApiUtil.get('/stock/recommend/short-investment-all', {})

// 장기추천주식 더보기
export const LongInvestmentAll = () => ApiUtil.get('/stock/recommend/long-investment-all', {})
