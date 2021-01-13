import settings from './settings/index.js'
import cardState from './cardState/index.js'
import filterState from './filterState/index.js'
import Storage from './storage/Storage.js'

export {
  Storage
}

export default new Vuex.Store({
  modules: {
    cardState,
    filterState,
    settings,
  }
})