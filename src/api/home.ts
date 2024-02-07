import ApiUtil from '~/util/ApiUtil'

export const MarketIndex = () => ApiUtil.get('/home/market-index', {})

export const PopularStock = () => ApiUtil.get('/home/popular-stock', {})
