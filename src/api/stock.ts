import ApiUtil from '~/util/ApiUtil'

export const MarketIndex = () => ApiUtil.get('/stock/market-index', {})

export const PopularStock = () => ApiUtil.get('/stock/popular', {})

export const Theme = () => ApiUtil.get('/stock/theme', {})
