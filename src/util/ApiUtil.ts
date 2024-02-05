import axios, { AxiosRequestConfig } from 'axios'

import { $axios } from './axios'
import { Globals } from './Globals'
import StringUtil from './StringUtil'

export default class ApiUtil {
  public static get(url: string, params: any): Promise<any> {
    return $axios.$get(url, { params }).then(response => response.data)
  }

  public static post(url: string, params: any): Promise<any> {
    return $axios.$post(url, params).then(response => response.data)
  }

  public static put(url: string, params: any): Promise<any> {
    return $axios.$put(url, params).then(response => response.data)
  }

  public static delete(url: string, params: any): Promise<any> {
    return $axios.$delete(url, { params }).then(response => response.data)
  }
}
