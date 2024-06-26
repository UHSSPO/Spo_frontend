import { IKakaoCertified, ILogin, ISignUp } from '../types/auth/auth'
import ApiUtil from '../util/ApiUtil'
import {
  IChangeNickNameReqBody,
  IChangePasswordReqBody,
  IDeleteUserReqBody,
  IinvestPropensityReqBody
} from '~/types/user/user'

export const kakaoCertified = (parmas: IKakaoCertified) => ApiUtil.post('/auth/kakao-login', parmas)

export const signUp = (parmas: ISignUp) => ApiUtil.post('/auth/sign-up', parmas)

export const login = (params: ILogin) => ApiUtil.post('/auth/login', params)

export const changePassword = (params: IChangePasswordReqBody, userSequence: number) => ApiUtil.put(`/user/change-password/${userSequence}`, params)

export const changeNickname = (params: IChangeNickNameReqBody, userSequence: number) => ApiUtil.put(`/user/change-nickName/${userSequence}`, params)

export const investPropensity = (params: IinvestPropensityReqBody, userSequence: number) => ApiUtil.put(`/user/invest-propensity/${userSequence}`, params)

export const userDelete = (params: IDeleteUserReqBody) => ApiUtil.put('/user/delete', params)
