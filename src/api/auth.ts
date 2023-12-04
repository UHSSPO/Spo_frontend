import { IKakaoCertified, ISignUp } from '../types/auth/auth'
import ApiUtil from '../util/ApiUtil'

export const kakaoCertified = (parmas: IKakaoCertified) => ApiUtil.post('/auth/kakao-login', parmas)

export const signUp = (parmas: ISignUp) => ApiUtil.post('/auth/sign-up', parmas)
