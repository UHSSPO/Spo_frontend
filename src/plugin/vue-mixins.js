import Vue from 'vue'
import { Globals } from '@/util/Globals'
import StringUtil from '@/util/StringUtil'
import { USER_TYPE_ROLE } from '@/types/common'

/**
 * 전역 변수
 */
Vue.mixin({
  data() {
    return {
      Globals,
      USER_TYPE_ROLE,
      StringUtil
    }
  }
})
