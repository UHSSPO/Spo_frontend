// https://axios.nuxtjs.org/extend.html
// https://ko.nuxtjs.org/api/context/

import qs from 'qs'

import StringUtil from '../util/StringUtil'
import { commonStore } from '~/util/store-accessor'
import { Globals } from '@/util/Globals'

export default function ({ $axios, redirect, app }) {
  $axios.onRequest((config) => {
    config.baseURL = process.env.VUE_APP_API_URL
    config.headers['Access-Control-Allow-Origin'] = 'application/json'
    config.withCredentials = true
    config.paramsSerializer = params => qs.stringify(params, { arrayFormat: 'repeat' })
    if (commonStore.token) {
      config.headers[Globals.AUTH_HEADER] = 'BEARER ' + commonStore.token
    }
  })

  $axios.onResponse((response) => {
    // const token = response.headers[Globals.AUTH_HEADER]
    // if (token) {
    //   commonStore.SET_TOKEN(token)
    // }
  })

  $axios.onError((error) => {
    if (error.response) {
      const errorData = error.response.data
      const errorCode = errorData.statusCode

      if ([4101, 4102, 4103, 4104, 4105].includes(errorCode)) {
        // 미등록IP 관련 예외처리
      } else if (errorCode === 500) {
        // 500에러 처리
        commonStore.ADD_DIALOG({
          id: 'ERROR',
          title: '오류',
          text: '서버에 응답이 없거나 오류가 발생하였습니다.'
        })
      } else {
        let addMessages = ''
        if (errorCode === 4000) {
          errorData.errors.forEach((item) => {
            addMessages += '\n' + item.message
          })
        } else if (errorData.message) {
          addMessages += '\n' + errorData.message
        } else {
          addMessages += '\n' + errorData
        }

        commonStore.ADD_DIALOG({
          id: errorData.messageCode,
          text: addMessages,
          callback: () => {
            // const isRedirectLogin = [9999, 4001].includes(errorCode) || _.startsWith(errorCode, '5')
            // if (isRedirectLogin) {
            //   redirect('/login')
            // }
          }
        })
      }
    }
    return Promise.resolve(false)
  })
}
