export interface IKakaoCertified {
  apikey: string // api key
  redirectUri: string // 콜백 uri
  code: string // 인증 코드
}

export interface ISignUp {
  email: string // 이메일
  pw: string // 패스워드
  dateOfBirth: string // 생년월일
  signUpChannel: string // 가입채널
  nickName: string // 닉네임
}
