import numeral from 'numeral'
import { DateTime, Duration, Interval, ToRelativeUnit } from 'luxon'
import _ from 'lodash'
import { Globals } from './Globals'

export default class StringUtil {
  // 숫자 콤마(,) 처리
  public static setNumberComma(value: string | number, decimal?: number): string {
    return numeral(value).format('0,0'.concat(decimal ? '.' + '0'.repeat(decimal) : ''))
  }

  // 숫자 콤마(,) 처리
  public static setDecimalNumberComma(value: string | number): string {
    return numeral(value).format('0,0.00')
  }

  public static setCurrencyNumberComma(value: string | number, currency: string) {
    if (currency === 'KRW') { return numeral(value).format('0,0') } else { return numeral(value).format('0,0.00') }
  }

  public static setNumberFormat(value: number | null, format: string): string {
    return _.isNumber(value) ? numeral(value).format(format) : ''
  }

  // 날짜관련
  public static getCurrentDate(dateFormat?: string): string {
    return DateTime.local()
      .setLocale('ko')
      .toFormat(dateFormat || Globals.DATE_FORMAT)
  }

  public static getCurrentDateTime(dateTimeFormat?: string): string {
    return DateTime.local()
      .setLocale('ko')
      .toFormat(dateTimeFormat || Globals.DATETIME_FORMAT)
  }

  public static getDateMonthPlus(value: number, dateTimeFormat?: string): string {
    return DateTime.local()
      .setLocale('ko')
      .plus({ months: value })
      .toFormat(dateTimeFormat || Globals.DATE_FORMAT)
  }

  public static getDatePlus(target: string, unit: ToRelativeUnit, value: number, dateTimeFormat?: string): string {
    const duration = {} as Duration
    duration[unit] = value
    return DateTime.fromISO(target)
      .setLocale('ko')
      .plus(duration)
      .toFormat(dateTimeFormat || Globals.DATE_FORMAT)
  }

  public static getDaysBetween(startDate: string, endDate: string): Array<String> {
    const interval = Interval.fromDateTimes(DateTime.fromISO(startDate), DateTime.fromISO(endDate))
    const result = []
    for (const day of this.days(interval)) {
      result.push(day.toFormat(Globals.DATE_FORMAT))
    }
    return result
  }

  private static *days(interval: Interval) {
    let cursor = interval.start.startOf('day')
    while (cursor < interval.end) {
      yield cursor
      cursor = cursor.plus({ days: 1 })
    }
  }

  /**
   * 빈값 체크
   */
  public static isEmpty(value: any): boolean {
    return (
      value === undefined ||
      value === null ||
      // eslint-disable-next-line use-isnan
      value === NaN ||
      (typeof value === 'object' && _.isEmpty(value)) ||
      (typeof value === 'string' && value.trim().length === 0)
    )
  }

  public static isNotEmpty(value: any): boolean {
    return !this.isEmpty(value)
  }

  /**
   * NULL 체크 후 VALUE 설정
   */
  public static nvl(value: string | null, alt: string | null): string | null {
    if (this.isEmpty(value)) {
      return alt
    }
    return value
  }

  /**
   * 엔터 BR 치환
   */
  public static enterToBr(value: string | undefined): string {
    if (typeof value === 'string') {
      return value.replace(/(?:\r\n|\r|\n)/g, '<br />')
    }
    return ''
  }

  /**
   * 원 단위 치환
   * @param value
   * @param won 원 단위
   * @param decimal 소수점 단위
   */
  public static setWonUnit(value: string | number, won?: number, decimal?: number): string | number {
    if (won && won > 0) { value = Number(value) / (won as number) }
    if (StringUtil.isNotEmpty(decimal) && Number(decimal) >= 0) { value = Math.floor(Number(value) * Math.pow(10, Number(decimal))) / Math.pow(10, Number(decimal)) }
    return value
  }

  public static copyToClipboard(text: string) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text)
    } else {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      return new Promise((resolve, reject) => {
        document.execCommand('copy') ? resolve(text) : reject(text)
        textArea.remove()
      })
    }
  }

  public static isNumber(value: any) {
    return _.isNumber(value)
  }
}
