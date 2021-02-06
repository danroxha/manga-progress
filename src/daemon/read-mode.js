const readMode = {
  data: {url:'', title:'', page: 0, chapters: [] },
  
  enable() {
    this.loadData()
    this.clearPage()
    
    chrome.storage.local.get(['configuration'], localDB => {
      let storage = localDB['configuration']
      if(storage.switch.floatmenu.enable)
        this.createBar()
    })
    
  },
  
  canEnable() {
    return !!location.href.match(/mangahost\w+.com\/manga\/\w+.+\/\d+/)
  },

  loadData() {
    this.data.url      = String(location.href.match(/http?s:\/\/\w*.\w+\/\w+\/\w+?.+[^(\/\d+.\d+)#]/)[0])
    this.data.title    = String(document.querySelectorAll('.title')[0]?.textContent ?? document.querySelector('.html-embed-3')?.children[0]?.children[0]?.textContent?.match(/(\w+.*[-])/)[0]?.slice(0, -2))
    this.data.page     = Number((location.pathname.match(/\w+\d+\/(\d+|\w+.+)$/)?.length)? location.pathname.match(/\w+\d+\/(\d+|\w+.+)$/)[1] : 0)
    this.data.chapters = Array.from(document.querySelector('select').getElementsByTagName('option')).map(({value}) => Number(value), [])
    
    this.data.chapters.sort((a, b) => {
      if(a > b) return 1
      if(a < b) return -1
      return 0
    })
  },

  clearPage() {
    const pages = Array.from(document.getElementsByTagName('img'))

    const nodeSection = document.createElement('section')
    const nodeTitle   = document.createElement('title')

    nodeSection.setAttribute('class', 'focus-read')
    nodeTitle.innerText = this.data.title

    pages.forEach(page => {
      nodeSection.appendChild(page)
    })

    document.getElementsByTagName("html")[0].innerHTML = "";
    document.head.appendChild(nodeTitle)
    document.body.setAttribute('class', 'bground')
    document.body.appendChild(nodeSection)
  },

  createBar() {
    const nodeFooter  = document.createElement('footer')
    const nodeTitle   = document.createElement('h1')
    const nodeAnchor  = document.createElement('a')
    const nodeSection = document.createElement('section')
    const nodeButton  = new Array(2)

    nodeButton[0] = document.createElement('button')
    nodeButton[1] = document.createElement('button')

    nodeButton[0].addEventListener('click', () => this.previousPage())
    nodeButton[1].addEventListener('click', () => this.nextPage())
    nodeButton[0].innerText = '<<'
    nodeButton[1].innerText = '>>'

    nodeFooter.setAttribute('class', 'bar-footer')
    nodeAnchor.innerText = this.data.title
    nodeAnchor.href = this.data.url
    nodeTitle.appendChild(nodeAnchor)

    nodeFooter.appendChild(nodeTitle)

    nodeButton.forEach(button => {
      nodeSection.appendChild(button)
    })

    nodeFooter.appendChild(nodeSection)
    
    document.body.appendChild(nodeFooter)
    document.body.addEventListener('keyup', e => {
      if(e.code == 'ArrowLeft') this.previousPage()
      if(e.code == 'ArrowRight') this.nextPage()
    })
  },

  nextPage() {
    const pageIndex = this.data.chapters.indexOf(this.data.page)
    const nextPage = this.data.chapters[pageIndex + 1]

    if( nextPage )
      location.assign(`${this.data.url}/${nextPage}`)
    else 
      alert(`Last Chapter: ${this.data.page}`)
  },

  previousPage() {
    const pageIndex = this.data.chapters.indexOf(this.data.page)
    const previousPage = this.data.chapters[pageIndex - 1]

    if( previousPage )
      location.assign(`${this.data.url}/${previousPage}`)
    else
      alert(`First Chapter: ${this.data.page}`)
  },
}

chrome.storage.local.get(['configuration'], localDB => {
  let storage = localDB['configuration']
  if(storage.switch.readmode.enable) {
    if(readMode.canEnable())
    readMode.enable()
  }
})
