export default {
  
  /**
   * 
   * @param {string} database database name
   */
  hasDB(database) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([database], db => {
        let size = 0
        for(let _ in db) {
          size++;

          if(size > 0) break;
        }

        if(size) resolve(true)

        resolve(false)
      })
    })    
  },

  /**
   * 
   * @param {string} database database name
   */
  loadDB(database) {

    if(!database) throw new Error('database name undefined')
    if(typeof database !== 'string') throw new Error('database name should string')

    return new Promise((resolve, reject) => {
      chrome.storage.local.get([database], async db => {
        if(! await this.hasDB(database))
          reject('database not exist')
        resolve(db[database])
      })
    })
  },

  /**
   * 
   * @param {string} database database name
   * @param {any} data any data
   * @param {boolean} force force database replacement
   */
  setDB(database, data, force = false) {
    
    if(!database) throw new Error('database name undefined')
    if(!data) throw new Error(`data for ${database} undefined`)
    if(typeof database !== 'string') throw new Error('database name should string')
    if(this.hasDB(database) && !force) throw new Error('has database name')
    
    return new Promise((resolve, _) => {
      
      let db = {}
      db[database] = data

      chrome.storage.local.set(db, () => {
        resolve({status:  true })
      })
    })
  },

  /**
   * 
   * @param {string} database database name
   */
  removeDB(database) {
    
    if(!database) throw new Error('database name undefined')

    return new Promise((resolve, reject) => {

      if(!this.hasDB(database))
        reject('database not exist')

      chrome.storage.local.remove([database], () => {
        resolve({status: 200})
      })    
    })
  },
  
  /**
   * 
   * @description returns the memory used
   */
  memoryUsedDB(format) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.getBytesInUse( bytes => {
        resolve(this._parseByte(bytes, format))
      })
    })
  /**
   * 
   * @param {number} bytes integer bytes
   * @param {string} format format bytes [megabyte, kilobyte, default = byte]
   */
  _parseByte(bytes, format) {
    
    const MEGABYTE = 1e6;
    const KILOBYTE = 1e3;

    switch (format?.toLowerCase()) {
      case 'megabyte': return parseFloat((bytes / MEGABYTE).toFixed(2))
      case 'kilobyte': return parseFloat((bytes / KILOBYTE).toFixed(2))
      default:
        return bytes
    }
  }
}