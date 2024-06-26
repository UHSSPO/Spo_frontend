import { Module, Mutation, VuexModule, Action } from 'vuex-module-decorators'
import _ from 'lodash'
import { IDialog } from '../types/common'
import { Namespace } from '../util/Namespace'
import { IUserDetail, IUserInfo } from '~/types/auth/auth'
import StringUtil from '~/util/StringUtil'
import { commonStore } from '~/util/store-accessor'
import { IChangePasswordReqBody, ICommendPersonalStock, ISelectMyInfoRes } from '~/types/user/user'
import { ISearchStockInfo } from '~/types/home/home'
import { getMyInfo } from '~/api/user'

export interface ICommonState {
  // locales: Array<string>
  // defaultLocale: string
  dialogs: Array<IDialog>
  // codeMap: ICodeMap
  token: string
  userInfo: IUserDetail
  stockList: Array<ISearchStockInfo>
  // refresh: boolean
}

@Module({ name: Namespace.COMMON, stateFactory: true, namespaced: true })
export default class CommonModule extends VuexModule implements ICommonState {
  public dialogs = [] as Array<IDialog>
  public token = ''
  public userInfo = {} as IUserDetail
  public userPassword = {} as IChangePasswordReqBody
  public stockList = [] as Array<ISearchStockInfo>
  public pickList = [] as Array<ICommendPersonalStock>

  @Action
  public async UPDATE_USER() {
    const response = await getMyInfo()
    this.UPDATE_USER_INFO(response)
  }

  @Mutation
  public ADD_USER_INFO(userInfo: IUserInfo) {
    this.token = userInfo.accessToken
    this.userInfo = userInfo.user
  }

  @Mutation
  public UPDATE_USER_INFO(userInfo: IUserDetail) {
    this.userInfo = userInfo
  }

  @Mutation
  public ADD_STOCK_LIST(stockList: Array<ISearchStockInfo>) {
    this.stockList = stockList
  }

  @Mutation
  public LOGOUT() {
    this.token = ''
  }

  // 대화상자
  @Mutation
  public ADD_DIALOG(dialog: IDialog) {
    // 중복 메시지는 제외
    if (!_.find(this.dialogs, (item: any) => item.id === dialog.id)) { this.dialogs.push(dialog) }
  }

  @Mutation
  public REMOVE_DIALOG(index: number) {
    this.dialogs.splice(index, 1)
  }

  @Mutation
  public RESET_DIALOG() {
    this.dialogs = []
  }

  @Mutation
  public CHECK_LOGIN() {
    if (StringUtil.isEmpty(this.token)) {
      commonStore.ADD_DIALOG({
        id: 'ERROR',
        text: '로그인이 필요한 서비스입니다!'
      })
    } else {
      return true
    }
  }

  @Mutation
  public ADD_PICK_LIST(picklist: Array<ICommendPersonalStock>) {
    this.pickList = picklist
  }
}
