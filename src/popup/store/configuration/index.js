import Storage from '../storage/Storage.js'

const DB_NAME = 'configuration'

export default {
  config: {
    dbname: 'configuration',
    switch: {
      readmode: {enable: true},
      floatmenu: {
        enable: true,
        zoom: 100,
        scroll: 0,
        position: {x: 50, y: 80},
      },
      hidefavorite: {enable: false},
      offline: {enable: false },
      date: {enable: true},
    },
  },

  async createDB() {
    try {
      await Storage.createDB(DB_NAME, {...this.config})
    }
    catch(err) {
      console.warn('[createDB]: Configuration')
      console.error(err)
    }
  },
  
  /**
   * 
   * @param {object} config 
   */
  async saveDB(config) {
    await Storage.setDB(DB_NAME, {...config}, true)
  },

  async resetDB() {
    await this.saveDB(this.config)
  },

  async loadBD() {
    if(!await Storage.hasDB(DB_NAME)) {
      await this.createDB()
    }
    return await Storage.loadDB(DB_NAME)
  },

}