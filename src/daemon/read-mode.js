let defaultConfiguration = {
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
    date: {enable: false},
  },
}

const readMode = {
  db: 'configuration',
  scroll: {
    id: 0
  },
  data: {
    url:'', title:'', currentChapter: 0, chapters: [], chapters: [],
  },
  config: {},
  
  async enable() {
    
    this.loadData()
    this.clearPage()
    
    let configuration = await this.loadConfig()
    this.config = configuration?.switch?.floatmenu ?? defaultConfiguration.switch.floatmenu
  
    if(this.config.enable) {
      this.createFloatMenu()
      this.handlePostionFloatMenu()
    }    
  },
  
  canEnable() {
    return !!location.href.match(/mangahost\w+.com\/manga\/\w+.+\/\d+/)
  },

  loadConfig() {
    return new Promise((resolve, _) => {
      chrome.storage.local.get([this.db], localDB => {
        resolve(localDB[this.db])
      })
    })  
  },

  loadData() {
    this.data.url             = String(location.href.match(/http?s:\/\/\w*.\w+\/\w+\/\w+?.+[^(\/\d+.\d+)#]/)[0])
    this.data.title           = String(document.querySelectorAll('.title')[0]?.textContent ?? document.querySelector('.html-embed-3')?.children[0]?.children[0]?.textContent?.match(/(\w+.*[-])/)[0]?.slice(0, -2))
    this.data.currentChapter  = Number((location.pathname.match(/\w+\d+\/(\d+|\w+.+)$/)?.length)? location.pathname.match(/\w+\d+\/(\d+|\w+.+)$/)[1] : 0)
    this.data.chapters        = Array.from(document.querySelector('select').getElementsByTagName('option')).map(({value}) => Number(value), [])
    
    this.data.chapters.sort((a, b) => {
      if(a > b) return 1
      if(a < b) return -1
      return 0
    })
  },

  getPages() {
    return Array.from(document.getElementsByTagName('img'))
      .filter(img => 
        img?.id.match(/(img.+\d+)|(pag.+\d+)/)  // mangahost?.com | centraldemangas.online
        ?? img?.alt.match(/Page.+\d+/)          // unionmanga.xyz/
      )

  },

  clearPage() {
    this.data.pages = this.getPages() 

    const nodeSection = document.createElement('section')
    const nodeTitle   = document.createElement('title')

    nodeSection.setAttribute('class', 'focus-read')
    nodeTitle.innerText = this.data.title

    this.data.pages.forEach(page => {
      nodeSection.appendChild(page)
    })

    document.getElementsByTagName('html')[0].innerHTML = '';
    document.head.appendChild(nodeTitle)
    document.body.setAttribute('class', 'bground')
    document.body.appendChild(nodeSection)
  },

  createFloatMenu() {
    const { currentChapter, chapters, url } = this.data

    const template = `
      <section id='container-menu'>
        <span id='indicator' draggable='true'> 
          <span class='sub-title'>ch</span>
          <span class='currentChapter-text'>${currentChapter}</span>
        </span>
        <div id='float-menu'>
          <a class='float-menu-home' href='${url}'>
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M288 114.96L69.47 307.71c-1.62 1.46-3.69 2.14-5.47 3.35V496c0 8.84 7.16 16 16 16h149.23L192 439.19l104.11-64-60.16-119.22L384 392.75l-104.11 64L319.81 512H496c8.84 0 16-7.16 16-16V311.1c-1.7-1.16-3.72-1.82-5.26-3.2L288 114.96zm282.69 121.32L512 184.45V48c0-8.84-7.16-16-16-16h-64c-8.84 0-16 7.16-16 16v51.69L314.75 10.31C307.12 3.45 297.56.01 288 0s-19.1 3.41-26.7 10.27L5.31 236.28c-6.57 5.91-7.12 16.02-1.21 22.6l21.4 23.82c5.9 6.57 16.02 7.12 22.6 1.21L277.42 81.63c6.05-5.33 15.12-5.33 21.17 0L527.91 283.9c6.57 5.9 16.69 5.36 22.6-1.21l21.4-23.82c5.9-6.57 5.36-16.69-1.22-22.59z">
              </path>
          </svg>
          </a>
          <div class='help-tutotial'>
            <span class='help-float-menu'>?</span>
            <div>
              <p>Move the menu by dragging the icon with the chapter number.</p>
              <p>
                Use the arrows <span><button>&#8592;</button></span> and <span><button>&#8594;</button></span>  to change the chapters, 
                and the keys for <span><button>&#8593;</button></span> and <span><button>&#8595;</button></span> to navigate between pages.
              </p>
            </div>
          </div>
          <div class='sliders'>
            <div>
              <div class='label-control'>
                <label>Zoom</label>
                <span>100%</span>
              </div>
              <div class='control-slide'>
                <button disabled name='minusControlZoom'>-</button>
                <input name='zoom' type='range' min='50' max='200' value='100' class='slider'/>
                <button disabled name='plusControlZoom'>+</button>
              </div>
              </label>
            </div>
            <div>
              <div class='label-control'>
                <label>Scroll</label>
                <span>2x</span>
              </div>
              <div class='control-slide'>
                <button disabled name='minusControlScroll'>-</button>
                <input name='scroll' type='range' min='0' max='2' value='0' step='0.25' value='0' class='slider' />
                <button disabled name='plusControlScroll'>+</button>
              </div>
            </div>
          </div>
          <div class='buttons'>
            <div>
              <button id='previousChapter'>
                <svg stroke='currentColor' fill='currentColor' stroke-width='0' viewBox='0 0 24 24' height='1em' width='1em'
                  xmlns='http://www.w3.org/2000/svg'>
                  <g>
                    <path fill='none' d='M0 0h24v24H0z'></path>
                    <path d='M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z'></path>
                  </g>
                </svg>
              </button>
              <button id='nextChapter'>
                <svg stroke='currentColor' fill='currentColor' stroke-width='0' viewBox='0 0 24 24' height='1em' width='1em'
                  xmlns='http://www.w3.org/2000/svg'>
                  <g>
                    <path fill='none' d='M0 0h24v24H0z'></path>
                    <path d='M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z'></path>
                  </g>
                </svg>
              </button>
            </div>
            <select id='selectChapter' name='chapters'>
              <option value='${currentChapter}' selected>Chapters ${currentChapter}</option>
              ${
                chapters.map(chapter =>
                `<option value='${chapter}'> Chapter ${chapter}</option>`
                ).join('')
              }
            </select>
          </div>
        </div>
      </section>
    `

    nodeFloatMenu = document.createRange().createContextualFragment(template)
    document.body.appendChild(nodeFloatMenu)

    document.getElementById('nextChapter')
      .addEventListener('click', () => this.nextChapter())
    document.getElementById('previousChapter')
      .addEventListener('click', () => this.previousChapter())
  
    document.body.addEventListener('keyup', e => {
      if(e.code == 'ArrowLeft') this.previousChapter()
      if(e.code == 'ArrowRight') this.nextChapter()
    })

    document.getElementById('selectChapter')
      .addEventListener('change', e => {
        e.preventDefault()
        const chapter = parseInt(e.target.value)
        if(chapter === this.data.currentChapter ) return
        
        this.jumpChapter(chapter)
      })
    
    let labelZoom = document.querySelectorAll('.label-control')[0].querySelector('span')
    let labelScroll = document.querySelectorAll('.label-control')[1].querySelector('span')

    labelZoom.innerText = `${this.config.zoom}%`
    labelScroll.innerText = `${this.config.scroll}x`

    document.querySelectorAll('.slider').forEach(input => {
      input.addEventListener('input',  e => {
        e.preventDefault()
        
        const inputName = e.target.name

        switch(inputName) {
          case 'zoom': {
            this.config.zoom = parseInt(e.target.value)
            labelZoom.innerText = `${this.config.zoom}%`
            this.setZoom()
            break;
          }
          case 'scroll': {
            this.config.scroll = parseFloat(e.target.value)
            labelScroll.innerText = `${this.config.scroll}x`
            this.setScroll()
            break;
          }
        }
      })
    })

  },

  setZoom() {
    this.data.pages.forEach(page => {
      page.style.zoom = `${this.config.zoom}%`
    })
  },

  setScroll() {

    if(!this.config.scroll) {
      clearInterval(this.scroll.id)
      return
    }

    const TIME = 10
    let id = setInterval(() => this.setScroll(), TIME / this.config.scroll )

    if(id !== this.scroll.id){
      clearInterval(this.scroll.id)
      this.scroll.id = id
    }

    scrollBy(0, 1 + this.config.scroll)

  },

  jumpChapter(chapter) {
    location.assign(`${this.data.url}/${chapter}`)
  },

  nextChapter() {
    const pageIndex = this.data.chapters.indexOf(this.data.currentChapter)
    const nextChapter = this.data.chapters[pageIndex + 1]

    if( nextChapter )
      this.jumpChapter(nextChapter)
    else 
      alert(`Last Chapter: ${this.data.currentChapter}`)
  },

  previousChapter() {
    const pageIndex = this.data.chapters.indexOf(this.data.currentChapter)
    const previousChapter = this.data.chapters[pageIndex - 1]

    if( previousChapter )
      this.jumpChapter(previousChapter)
    else
      alert(`First Chapter: ${this.data.currentChapter}`)
  },

  handlePostionFloatMenu() {
    
    let container = document.getElementById('container-menu')
    let indicator = document.getElementById('indicator')
    let floatMenu = document.getElementById('float-menu')

    container.style.left = `${this.config.position.x}px`
    container.style.top = `${this.config.position.y}px`

    indicator.ondrag = e => {
      if (e.clientX > 0 || e.clientY > 0) {
        this.config.position.x = e.clientX
        this.config.position.y = e.clientY
        floatMenu.style.display = 'none'
        container.style.left = `${this.config.position.x}px`
        container.style.top = `${this.config.position.y}px`
      }
    }

    indicator.ondragstart =  ({dataTransfer}) => {
      dataTransfer.setDragImage(new Image(), 0, 0); 
    }

    indicator.ondragend = e => {
      floatMenu.removeAttribute('style')
      this.updateConfigDB()
      console.info('[read-mode] save menu position')
    }
  },

  updateConfigDB() {
    let db = {}
    
    defaultConfiguration.switch.floatmenu = this.config

    db[defaultConfiguration.dbname] = defaultConfiguration
    chrome.storage.local.set(db, () => {})
  }
}

chrome.storage.local.get([readMode.db], localDB => {

  let storage = localDB[readMode.db]

  let size = 0;
  if(storage instanceof Object) {
    for(let _ in storage) {
      size++
      if(size > 0) break
    }
  }
  
  if(!size) {
    let db = {}
    db[defaultConfiguration.dbname] = defaultConfiguration
    chrome.storage.local.set(db, () => {
      console.info('[read-mode] setted default configuration')
    })
    storage = defaultConfiguration
  }

  defaultConfiguration = storage

  if(storage?.switch.readmode.enable) {
    if(readMode.canEnable())
      readMode.enable()
  }
})
