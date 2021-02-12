import Storage from '../storage/Storage.js'

const DB_NAME = 'favorites'

export default {
  
  async loadBD() {
    
    let raw =  await Storage.loadDB(DB_NAME)
    let favorites = this.parseFavorites(raw).map(this.setProperty)
    
    return ( { favorites, raw })
  },

  async removeByID(id) {
    
    let { raw } = await this.loadBD()
    
    if(raw[id]) 
      delete raw[id]
    
    await Storage.setDB(DB_NAME, raw, true)

  },

  parseFavorites(raw) {
    
    let parse = []

    for (let key in raw)
      parse.push(raw[key])

    return parse
  },

  setProperty(favorite) {
    return {
      ...favorite,
      imageSource: null,
      imageLoading: null,
      loading: true,
      progress: parseFloat((100 * favorite.current / favorite.chapters).toFixed(2))
    }
  },
}