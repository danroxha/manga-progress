export default {
  
  /**
   * 
   * @param {string} database database name
   */
  hasDB(database) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([database], db => {
        let size = 0
        if(db instanceof Object) { 
          for(let _ in db) {
            size++
            if(size > 0) break
          }
        }

        if(db[database] && size) 
          resolve(true)
        else {
          chrome.storage.local.remove([database])
          resolve(false)
        }
      })
    })    
  },

  /**
   * 
   * @param {string} database database name
   * @param {object} data any data
   */
  createDB(database, data) {
    
    if(!data || !database ) throw new Error(`[createDB]: 'database name' or 'data' underfined `)
    if(data instanceof Object) {
      let size = 0
      for(let _ in data) {
        size++;
        if(size > 0) break;
      }

      if(!size) throw new Error(`[createDB]: database "${database}" data empty`)
    }
  
    return new Promise(async(resolve, reject) => {
      if(await this.hasDB(database))
        reject({status: 406, msg: `Error:[createDB] has database name '${database}'`})

      await this.setDB(database, data, true)

      resolve({status: 201})

    })
  },

  /**
   * 
   * @param {string} database database name
   */
  loadDB(database) {

    if(!database) throw new Error('[loadDB]: database name undefined')
    if(typeof database !== 'string') throw new Error('[loadDB]: database name should string')

    return new Promise((resolve, reject) => {

      chrome.storage.local.get([database], async db => {
        if(!await this.hasDB(database))
          reject(`[loadDB]: database not exist "${database}"`)
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
    
    if(!database) throw new Error('[setDB]: database name undefined')
    if(!data) throw new Error(`[setDB]: data for ${database} undefined`)
    if(typeof database !== 'string') throw new Error('[setDB]: database name should string')
    
    return new Promise(async(resolve, reject) => {
      if(await this.hasDB(database) && !force) 
        reject(`[setBD]: has database name "${database}"`)
      
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
    
    if(!database) throw new Error('[removeDB]: database name undefined')

    return new Promise(async(resolve, reject) => {

      if(! await this.hasDB(database))
        reject('[removeDB]: database not exist')

      chrome.storage.local.remove([database], () => {
        resolve({status: 200, msg: `[removeDB]: database "${database}" removed`})
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
  },

  /**
   * 
   * @param {string} format capacity return format [megabyte, kilobyte, default = byte]
   */
  capacityDB(format) {
    return this._parseByte(chrome.storage.local.QUOTA_BYTES, format)
  },

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