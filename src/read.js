function changeReadMode(title) {

  const pages = Array.from(document.getElementsByTagName('img'))

  const nodeSection = document.createElement('section')
  const nodeTitle   = document.createElement('title')

  nodeSection.setAttribute('class', 'focus-read')
  nodeTitle.innerText = title

  pages.forEach(page => {
    nodeSection.appendChild(page)
  })

  document.getElementsByTagName("html")[0].innerHTML = "";
  document.head.appendChild(nodeTitle)
  document.body.setAttribute('class', 'bground')
  document.body.appendChild(nodeSection)

}

function createBarFooter(pageData) {


  const { url, title, pageNumber, chapters } = pageData
  const request = { url, page: pageNumber, chapters }

  const nodeFooter  = document.createElement('footer')
  const nodeTitle   = document.createElement('h1')
  const nodeAnchor  = document.createElement('a')
  const nodeSection = document.createElement('section')
  const nodeButton  = new Array(2)
  
  nodeButton[0] = document.createElement('button')
  nodeButton[1] = document.createElement('button')

  nodeButton[0].addEventListener('click', () => previousPage(request))
  nodeButton[1].addEventListener('click', () => nextPage(request))
  nodeButton[0].innerText = '<<'
  nodeButton[1].innerText = '>>'

  nodeFooter.setAttribute('class', 'bar-footer')
  nodeAnchor.innerText = title
  nodeAnchor.href = url
  nodeTitle.appendChild(nodeAnchor)

  nodeFooter.appendChild(nodeTitle)

  nodeButton.forEach(button => {
    nodeSection.appendChild(button)
  })

  nodeFooter.appendChild(nodeSection)
  
  document.body.appendChild(nodeFooter)
  document.body.addEventListener('keyup', e => {
    if(e.code == 'ArrowLeft') previousPage(request)
    if(e.code == 'ArrowRight') nextPage(request)
  })

  function nextPage(request) {
          
    const pageIndex = request.chapters.indexOf(request.page)
    const nextIndex = request.chapters[pageIndex + 1]

    if( nextIndex )
      window.location.replace(`${request.url}/${nextIndex}`)
    else 
      alert(`Last Chapter: ${request.page}`)
  
  }

  function previousPage(request) {

    const pageIndex = request.chapters.indexOf(request.page)
    const nextIndex = request.chapters[pageIndex - 1]

    if( nextIndex )
      window.location.replace(`${request.url}/${nextIndex}`)
    else
      alert(`First Chapter: ${request.page}`)
     
  }
}

function main() {
  
  const url = String(location.href.match(/http?s:\/\/\w*.\w+\/\w+\/\w+?.+[^(\/\d+.\d+)#]/)[0])
  const title = String($$('.title')[0]?.textContent ?? $('.html-embed-3')?.children[0]?.children[0]?.textContent?.match(/(\w+.*[-])/)[0]?.slice(0, -2))
  const pageNumber = Number((location.pathname.match(/\w+\d+\/(\d+|\w+.+)$/)?.length)? location.pathname.match(/\w+\d+\/(\d+|\w+.+)$/)[1] : 0)
  const chapters = Array.from(document.querySelector('select').getElementsByTagName('option')).map(({value}) => Number(value), [])
  
  chapters.sort((a, b) => {
    if(a > b) return 1
    if(a < b) return -1
    return 0
  })

  changeReadMode(title)
  createBarFooter({url, title, pageNumber, chapters })
}

const isPageRead = !!location.href.match(/mangahost\w+.com\/manga\/\w+.+\/\d+/)
if(isPageRead)
  main()
