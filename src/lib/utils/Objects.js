export default class Objects {
  constructor(){}

  /**
   * 
   * @param {Object} obj 
   */
  static isEmpty(obj) {
    for(let key in obj) {
      if(obj.hasOwnProperty(key))
        return false
    }
  
    return true
    }
}