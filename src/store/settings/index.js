import Storage from '../storage/Storage.js'

const DB_NAME = 'settings'

export default {
    namespaced: true,
    
    state: {
      mode: 'normal',
      display: {
        visible: false,
        ordination: {
          select: {alphabet: 0, progress: 0},
          enable: 'alphabet',
          options: {
            alphabet: ['order', 'reverse'],
            progress: ['more progress', 'less progress']
          },
        },
        
        modes: {
          select: 'grid',
          options: ['list', 'grid'],
        }
      },
    },
  
    mutations: {
      async loadConfiguration(state){
        state.display = await Storage.loadDB(DB_NAME)
      },
  
      async saveConfiguration(state) {
        await Storage.setDB(DB_NAME, state.display, true)
      },
      
      setVisibleMenu(state){
        state.displaySetting.visible = !state.displaySetting.visible
      },

      changeMode(state){
      
        const NORMAL = 'normal'
        const READ   = 'read'
  
        state.mode = (state.mode === READ) ? NORMAL : READ
        
      },
    },
    actions: {},
    gettets: {
      display: state => state.display,
      mode: state => state.mode,
    }, 
  }