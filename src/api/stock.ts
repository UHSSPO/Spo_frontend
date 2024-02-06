import ApiUtil from '~/util/ApiUtil'

export const MarketIndex = () => ApiUtil.get('/stock/market-index', {})
