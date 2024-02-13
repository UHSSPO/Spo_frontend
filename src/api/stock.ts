import ApiUtil from '~/util/ApiUtil'

export const MarketIndex = () => ApiUtil.get('/stock/market-index', {})

export const PopularStock = () => ApiUtil.get('/stock/popular', {})

export const Theme = () => ApiUtil.get('/stock/theme', {})

export const ShortInvestment = () => ApiUtil.get('/stock/recommend/short-investment', {})

export const LongInvestment = () => ApiUtil.get('/stock/recommend/long-investment', {})

// 관심주식 등록
export const UpdateInterestStock = (stockInfoSequence: number) => ApiUtil.post('/stock/interest', { stockInfoSequence })
