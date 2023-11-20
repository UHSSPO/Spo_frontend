import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import CommonModule from '../store/common'

let commonStore: CommonModule

function initialiseStores (store: Store<any>): void {
  commonStore = getModule(CommonModule, store)
}

export {
  initialiseStores,
  commonStore
}
