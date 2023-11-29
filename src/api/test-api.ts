import ApiUtil from '../util/ApiUtil'
import { IKakaoCertified } from '../types/auth/auth'

export const geTestApi = () => ApiUtil.get('/', {})

export const geTestApiError400 = () => ApiUtil.get('/error', {})

export const geTestApiError500 = () => ApiUtil.get('/error500', {})
