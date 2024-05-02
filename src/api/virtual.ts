import ApiUtil from '~/util/ApiUtil'
import { IBuyStockInvestmentReq, ISelectUserInvestmentStart } from '~/types/virtual/virtual'

export const startInvestmentYn = () => ApiUtil.get('/virtual', {})
export const getVirtualList = (stockInfoSequence: number) => ApiUtil.get(`/virtual/list/${stockInfoSequence}`, {})
export const getVirtualUser = (stockInfoSequence: number) => ApiUtil.get(`/virtual/user/${stockInfoSequence}`, {})
export const startVirtual = (params: ISelectUserInvestmentStart) => ApiUtil.post('/virtual/start', params)
export const buyVirtual = (params: IBuyStockInvestmentReq) => ApiUtil.post('virtual/buy', params)