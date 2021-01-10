import settings from './settings/index.js'
import cardState from './cardState/index.js'
import filterState from './filterState/index.js'
import storage from './storage/index.js'

export default new Vuex.Store({
  modules: {
    cardState,
    filterState,
    settings,
    storage,
  }
})