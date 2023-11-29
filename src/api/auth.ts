import { IKakaoCertified } from '../types/auth/auth'
import ApiUtil from '../util/ApiUtil'

export const kakaoCertified = (parmas: IKakaoCertified) => ApiUtil.post('/auth/kakao-login', parmas)
