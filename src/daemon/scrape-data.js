const $  = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const scrapeData = {
  db: 'favorites',
  data: {
    title: '', cover: '', address: '', id: '',
    page: '', chapters: '', current: '', progress: '',
    status: '', hash: '', lastUpdate: ''
  },

  enable() {
    this.scrape()
    this.updateDB()
    this.addButton()
  },

  addButton() {
    
    let component = null

    switch(location.href.match(/[https?:\/\/]?(\w+.\w+\/)/)[0].replaceAll('/', '')) {
      case 'mangahostz.com':
      case 'mangahosted.com':
      case 'mangahost2.com': { 
        component = $('.title')?? $('.heading-6')
        break
      }
      case 'centraldemangas.online': {
        component = $('h1')
        break
      }
    }

    if(component === null) return

    const nodeDiv    = document.createElement('div')
    const nodeAnchor = document.createElement('a')
    const nodeSpan   = document.createElement('span')

    nodeAnchor.href = this.data.address
    nodeAnchor.textContent = this.data.title
    
    nodeSpan.setAttribute('id', 'btn-add-manga-progress')
    nodeSpan.innerHTML = '&#x2B50;'
    nodeSpan.addEventListener('click', () => {
      chrome.storage.local.get([this.db], localDB => {
        
        let storage = localDB[this.db]

        if(storage.isEmpty()) storage = {}

        if(storage[this.data.hash])
          storage[this.data.hash] = this.updateData(storage[this.data.hash])
        else 
          storage[this.data.hash] = this.data
        
        const db = {}
        db[this.db] = storage
        chrome.storage.local.set(db)
      }) 
    })
    
    nodeDiv.appendChild(nodeAnchor)
    nodeDiv.appendChild(nodeSpan)
    
    component.innerHTML = ''
    component.appendChild(nodeDiv)
  },

  scrape() {
    switch(location.href.match(/[https?:\/\/]?(\w+.\w+\/)/)[0].replaceAll('/', '')) {
      case 'mangahostz.com':
      case 'mangahosted.com':
      case 'mangahost2.com': {
        this.data.title = String($$('.title')[0]?.textContent ?? $('.html-embed-3')?.children[0]?.children[0]?.textContent?.match(/(\w+.*[-])/)[0]?.slice(0, -2))
        this.data.cover = String(document.querySelector('.image-3')?.src ?? null).replace('full', 'xmedium')
        this.data.address = String(location.href.match(/http?s:\/\/\w*.\w+\/\w+\/\w+?.+[^(\/\d+.\d+)#]/)[0])
        this.data.id = Number(location.pathname.match(/mh(\d+)/)[1])
        this.data.page = Number((location.hash.length) ? location.hash.replace('#', '') : 1)
        this.data.chapters = Number($(".cap")?.id?.match(/(\d+|\d+.+)$/)[0].replace("_", ".") ?? 0) 
        this.data.current = Number((location.pathname.match(/\w+\d+\/(\d+|\w+.+)$/)?.length)? location.pathname.match(/\w+\d+\/(\d+|\w+.+)$/)[1] : 0)
        this.data.progress = 0
        this.data.status = String($('.w-list-unstyled')?.getElementsByTagName('li')[1].textContent.replace(/(\w+).:/ig, '').trim() ?? null )    
        this.data.hash = SHA1(this.data.title)
        this.data.lastUpdate =  String(new Date(Date.parse(document.querySelector('.pop-content')?.querySelector('small')?.innerText.match(/\s+(\w+\s+\d+.+\d+)$/)[0]?.trim()?.replace(',', ''))))

        break;
      }

      case 'centraldemangas.online': {
        break;
      }
    } 
  },

  updateData(favorite) {

    const oldDate = new Date(favorite.lastUpdate)
    const newDate = new Date(this.data.lastUpdate)
    if(newDate.isValided() && !oldDate.isValided() || newDate.isValided()){
      favorite.lastUpdate = this.data.lastUpdate
    }

    if( !favorite.id !== this.data.id) {
      favorite.id = this.data.id
    }
    
    if( !favorite.chapters || favorite.chapters < this.data.chapters ){ 
      favorite.chapters =  this.data.chapters
    }
    
    if( !favorite.current || favorite.current < this.data.current){
      favorite.current = this.data.current
    }

    if(this.data?.cover !== 'null' && !this.data?.cover !== this.data?.cover){
      favorite.cover = this.data.cover
    }

    if(this.data.status !== 'null'){
      favorite.status = this.data.status
    }

    if(this.data.address !== favorite.address) {
      favorite.address = this.data.address
    }

    return favorite
  },

  updateDB() {
    chrome.storage.local.get([this.db], localDB => {
      
      let storage = localDB[this.db]

      if(storage[this.data.hash]){
        storage[this.data.hash] = this.updateData(storage[this.data.hash])
        const db = {}
        db[this.db] = storage
        chrome.storage.local.set(db)
      }
    })
  }
}


scrapeData.enable()
