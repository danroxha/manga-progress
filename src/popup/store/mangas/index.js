import Storage from '../storage/Storage.js'

const DB_NAME = 'favorites'

export default {

  
  async loadBD() {
    
    let raw =  await Storage.loadDB(DB_NAME)
    let mangas = this.parseManga(raw).map(this.setProperty)
    
    return ( { mangas, raw })
  },

  async removeByID(id){
    
    let { raw } = await this.loadBD()
    
    if(raw[id]) 
      delete raw[id]
    
    await Storage.setDB(DB_NAME, raw, true)

  },

  parseManga(raw) {
    
    let parse = []

    for (let key in raw)
      parse.push(raw[key])

    return parse
  },

  setProperty(manga){
    return {
      ...manga,
      imageSource: null,
      imageLoading: null,
      loading: true,
      progress: parseFloat((100 * manga.current / manga.chapters).toFixed(2))
    }
  },
}