import settings from './settings/index.js'
import cardState from './cardState/index.js'
import filterState from './filterState/index.js'

export { default as Storage } from './storage/Storage.js'
export { default as DBMangas } from './mangas/index.js'
export { default as DBConfiguration } from './configuration/index.js'

export default new Vuex.Store({
  modules: {
    cardState,
    filterState,
    settings,
  }
})