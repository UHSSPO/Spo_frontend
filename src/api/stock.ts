import ApiUtil from '~/util/ApiUtil'

export const MarketIndex = () => ApiUtil.get('/stock/market-index', {})

export const Theme = () => ApiUtil.get('/stock/theme', {})
