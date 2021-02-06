import Storage from '../storage/Storage.js'

const DB_NAME = 'configuration'

export default {
  config: {
    dbname: 'configuration',
    switch: {
      readmode: {enable: true, label: 'Enable reading mode'},
      floatmenu: {enable: true, label: 'Enable read mode floating menu'},
      hidemanga: {enable: false, label: 'Hide full mangas'},
      offline: {enable: false, label: 'Offline manga covers', sublabel: 'This option reduces the storage capacity of the database'},
      date: {enable: false, label: 'Show date in list' },
    },
  },

  async createDB() {
    await Storage.createDB(DB_NAME, {...this.config})
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

    if(! await Storage.hasDB(DB_NAME))
      await this.createDB()

      return this._sort(await Storage.loadDB(DB_NAME))
  },

   /**
    * 
    * @param {object|configuration} config 
    */
  _sort(config){
    config.switch = Object.keys(config.switch)
      .sort((keyA, keyB) => {
        
        if(config.switch[keyA].label > config.switch[keyB].label) return 1;
        if(config.switch[keyA].label < config.switch[keyB].label) return -1;
        
        return 0;
      })
      .reduce((acc, key) => {
        acc[key] = config.switch[key]
        return acc
      }, {})

    return config
  },
}