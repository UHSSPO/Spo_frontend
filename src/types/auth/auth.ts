export interface IKakaoCertified {
  apikey: string
  redirectUri: string
  code: string
}

export interface ISignUp {
  email: string
  pw: string
  dateOfBirth: string
  signUpChannel: string
  nickName: string
}
