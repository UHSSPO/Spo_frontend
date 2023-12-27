export interface IKakaoCertified {
  apikey: string // api key
  redirectUri: string // 콜백 uri
  code: string // 인증 코드
}

export interface ISignUp {
  email: string // 이메일
  pwd: string // 패스워드
  dateOfBirth: string // 생년월일
  signUpChannel: string // 가입채널
  nickName: string // 닉네임
}
export interface ILogin {
  email: string // 이메일
  pwd: string // 패스워드
}

export interface IUserDetail{
  userSequence:number // 유저일련번호
  email:string // 이메일
  signUpChannel:string // 가입채널
  investPropensity:string // 투자성향
  userRole:string // 유저권한
  nickName:string // 닉네임
  dateOfBirth:string // 생년월일
}

export interface IUserInfo{
  accessToken:string// jwt 토큰
  user: IUserDetail
}
