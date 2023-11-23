import ApiUtil from '../util/ApiUtil'

export const geTestApi = () => ApiUtil.get('/', {})

export const geTestApiError400 = () => ApiUtil.get('/error', {})

export const geTestApiError500 = () => ApiUtil.get('/error500', {})
