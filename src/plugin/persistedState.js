import createPersistedState from 'vuex-persistedstate'

import { Globals } from '~/util/Globals'

export default ({ store }) => {
  createPersistedState({
    key: Globals.PERSISTED_STATE_KEY,
    paths: ['common', 'user'],
    storage: window.sessionStorage
  })(store)
}
