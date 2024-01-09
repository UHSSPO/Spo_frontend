import Vue from 'vue'
import StringUtil from '@/util/StringUtil'

/**
 * 숫자 콤마 설정
 */
Vue.filter('setNumberComma', (value, decimal) => {
  return StringUtil.setNumberComma(value, decimal)
})
/**
 * HHMMSS 설정
 */
Vue.filter('setTimeHHMMSS', (value) => {
  return value ? value.substr(0, 2) + ':' + value.substr(2, 2) + ':' + value.substr(3, 2) : ''
})

/**
 * YYYY-MM-DD 설정
 */
Vue.filter('setDate', (value) => {
  return value ? value.substr(0, 4) + '-' + value.substr(4, 2) + '-' + value.substr(6, 2) : ''
})

/**
 * 숫자 콤마 설정
 */
Vue.filter('setDecimalNumberComma', (value) => {
  return StringUtil.setDecimalNumberComma(value)
})

/**
 * 원 단위 설정
 * @param value
 * @param won 원 단위
 * @param decimal 소수점 단위
 */
Vue.filter('toWon', (value, won, decimal) => {
  return StringUtil.setWonUnit(value, won, decimal)
})

/**
 * 엔터 BR 치환
 */
Vue.filter('enterToBr', (value) => {
  return StringUtil.enterToBr(value)
})
