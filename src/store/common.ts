import { Module, Mutation, VuexModule } from 'vuex-module-decorators'
import _ from 'lodash'
import { IDialog } from '../types/common'
import { Namespace } from '../util/Namespace'
import { IUserDetail, IUserInfo } from '~/types/auth/auth'

export interface ICommonState {
  // locales: Array<string>
  // defaultLocale: string
  dialogs: Array<IDialog>
  // codeMap: ICodeMap
  token: string
  userInfo: IUserDetail
  // refresh: boolean
}

@Module({ name: Namespace.COMMON, stateFactory: true, namespaced: true })
export default class CommonModule extends VuexModule implements ICommonState {
  public dialogs = [] as Array<IDialog>
  public token = ''
  public userInfo = {} as IUserDetail

  @Mutation
  public ADD_USER_INFO(userInfo: IUserInfo) {
    this.token = userInfo.accessToken
    this.userInfo = userInfo.user
  }

  @Mutation
  public LOGOUT() {
    this.token = ''
  }

  // 대화상자
  @Mutation
  public ADD_DIALOG (dialog: IDialog) {
    // 중복 메시지는 제외
    if (!_.find(this.dialogs, (item: any) => item.id === dialog.id)) { this.dialogs.push(dialog) }
  }

  @Mutation
  public REMOVE_DIALOG (index: number) {
    this.dialogs.splice(index, 1)
  }

  @Mutation
  public RESET_DIALOG () {
    this.dialogs = []
  }

  @Mutation
  public CHANGE_PASSWORD() {
    alert(1)
  }
}
