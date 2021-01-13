export default {

  parseManga(raw) {
    
    let parse = []

    for (let key in raw)
      parse.push(raw[key])

    return parse
  },

  processProgress(manga){
    
    return {
      ...manga,
      progress: parseFloat((100 * manga.current / manga.chapters).toFixed(2))
    }
  },

  loadFavorites() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['favorites'], ({ favorites: raw }) => {
        
        let mangas = this.parseManga(raw)

        resolve({ mangas, raw })
      })
    })
  },

  removeFavorite(id){

    return new Promise( async (resolve, reject) => {
      
      let { raw } = await this.loadFavorites()

      if(raw[id])
        delete raw[id]
      else
        reject({status: 404})
      
      chrome.storage.local.set({'favorites': raw }, null)
      resolve({status:  200})
    })
  },

}