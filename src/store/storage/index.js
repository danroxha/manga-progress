export default {
  
  state: {
    mangas: [],
    rawMangas: null,
    currentManga: null,
  },

  mutations: {
    loadFavorites(state){
      return new Promise((resolve, reject) => {
        chrome.storage.local.get(['favorites'], ( { favorites : mangas } ) => {

          state.rawMangas = mangas
          state.mangas.length = 0

          for(let key in mangas) {
            mangas[key].progress = parseFloat(100 * mangas[key].current / mangas[key].chapters).toFixed(2)
            state.mangas.push({...mangas[key]})
          }
          
          chrome.storage.local.get(['currentManga'], ({ currentManga }) => {
            state.currentManga = currentManga
            resolve({status: 200})
          })
        })
      })
    },

    removeFavorite(state, id){

      delete state.rawMangas[id]

      return new Promise((resolve, _) => {
        chrome.storage.local.set({'favorites': state.rawMangas }, null)
        resolve({status:  true })
      })
    },
    
    syncStorage(state){
      return new Promise((resolve, reject) => {
        chrome.storage.local.get(['favorites'], ( { favorites : mangas } ) => {

          state.rawMangas = mangas
          state.mangas = []

          for(let key in mangas){
            state.mangas.push(mangas[key])
          }
        })
      })
    },

  },
}