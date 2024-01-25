import { IKakaoCertified } from '~/types/auth/auth'
import ApiUtil from '~/util/ApiUtil'

export const MarketIndex = () => ApiUtil.get('/home/market-index', {})
