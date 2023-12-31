import { IKakaoCertified, ILogin, ISignUp } from '../types/auth/auth'
import ApiUtil from '../util/ApiUtil'

export const kakaoCertified = (parmas: IKakaoCertified) => ApiUtil.post('/auth/kakao-login', parmas)

export const signUp = (parmas: ISignUp) => ApiUtil.post('/auth/sign-up', parmas)

export const login = (params: ILogin) => ApiUtil.post('/auth/login', params)
