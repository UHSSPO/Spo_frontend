import { Module, Mutation, VuexModule } from 'vuex-module-decorators'
import _ from 'lodash'
import { IDialog } from '../types/common'
import { Namespace } from '../util/Namespace'

export interface ICommonState {
  // locales: Array<string>
  // defaultLocale: string
  dialogs: Array<IDialog>
  // codeMap: ICodeMap
  // token: string
  // loginInfo: IJwtClaims
  // refresh: boolean
}

@Module({ name: Namespace.COMMON, stateFactory: true, namespaced: true })
export default class CommonModule extends VuexModule implements ICommonState {
  public dialogs = [] as Array<IDialog>

  // 대화상자
  @Mutation
  public ADD_DIALOG (dialog: IDialog) {
    // 중복 메시지는 제외
    if (!_.find(this.dialogs, (item: any) => item.id === dialog.id)) { this.dialogs.push(dialog) }
  }

  @Mutation
  public test () {
    console.log('@@@')
  }

  @Mutation
  public REMOVE_DIALOG (index: number) {
    this.dialogs.splice(index, 1)
  }

  @Mutation
  public RESET_DIALOG () {
    this.dialogs = []
  }
}
