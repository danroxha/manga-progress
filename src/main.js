
const $  = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


function addStarToPage( manga )
{


  let component = $$('.title')[0] ?? $('.heading-6')

  component.innerHTML = `
    <div id="title-manga-progress">
      <a href="${ manga['address'] }">${ manga['title'] }</a>
        <span id="btn-add-manga-progress">
    	  &#x2B50;
    	</span>
    </div>
  `
}


function getMangaData(){

  let manga = new Object()

  try {

    manga.title = String($$('.title')[0]?.textContent ?? $('.html-embed-3')?.children[0]?.children[0]?.textContent?.match(/(\w+.*[-])/)[0]?.slice(0, -2)) 
	  manga.cover = String(document.querySelector('.image-3')?.src ?? null) 
    manga.address = String(location.href.match(/http?s:\/\/\w*.\w+\/\w+\/\w+?.+[^(\/\d+.\d+)#]/)[0])
	  manga.id = Number(location.pathname.match(/mh(\d+)/)[1])
    manga.page = Number((location.hash.length) ? location.hash.replace('#', '') : 1)
    manga.chapters = Number($(".cap")?.id?.match(/\d+/)[0] ?? 0) 
    manga.current = Number((location.pathname.match(/(\d+\/(\d+))/)?.length)? location.pathname.match(/(\d+\/(\d+))/)[2] : 0)
    manga.progress = 0
    manga.status = String($('.btn-caps')?.textContent ?? null )
    
	return manga

  } catch(e) {
	  throw new Error(e)
  }
}

function isEmpty(obj) {
  for(var key in obj) {
    if(obj.hasOwnProperty(key))
      return false
  }

  return true
}

async function main(){

  let manga = null
  let currentManga = null
  
  try {

    manga = getMangaData()
    currentManga = null;
    addStarToPage(manga)

    window.addEventListener('hashchange', _ => {
      manga.page = Number((location.hash.length) ? location.hash.replace('#', '') : 1)
      
      chrome.storage.sync.get(['favorites'], function({favorites}) {
        
        if(favorites[manga.id]) {
          
          let favorite = favorites[manga.id]
          
          if(favorite.current == manga.current)
            favorite.page =  manga.page
          else
            return
        
          favorites[manga.id] = favorite
          
          chrome.storage.sync.set({'favorites': favorites }, function(){})
        }
      })
    })

    chrome.storage.sync.set({'currentManga': manga }, function(){})

    chrome.storage.sync.get(['favorites'], function({favorites}) {
      
      if(favorites[manga.id]){

        let favorite = favorites[manga.id]
        
        if( !favorite.chapters || favorite.chapters < manga.chapters ){	
          favorite.chapters =  manga.chapters
        }
        
        if( !favorite.current || favorite.current < manga.current){
          favorite.current = manga.current
        }

        if(manga?.cover !== 'null'){
          favorite.cover = manga.cover
        }

        if(manga.status !== 'null'){
          favorite.status = manga.status
        }

        favorites[manga.id] = favorite
        
        chrome.storage.sync.set({'favorites': favorites }, function(){})
      }
    })

        
    $('#btn-add-manga-progress').addEventListener('click', async e => {
       
      chrome.storage.sync.get(['favorites'], function({favorites}) {
        
        if( isEmpty(favorites) ){
          	favorites = {}
        }

        if(favorites[manga.id]){

          let favorite = favorites[manga.id]
          
          if( !favorite.chapters || favorite.chapters < manga.chapters ){	
            favorite.chapters =  manga.chapters
          }

          if( !favorite.cover?.length && favorite.cover?.length < manga.cover ){
          	favorite.cover = manga.cover
          }

          favorites[manga.id] = favorite

        }
        else {
          favorites[manga.id] = manga
        }
        
        chrome.storage.sync.set({'favorites': favorites }, function() {})
      })
    })

   } catch(e) {
     console.error(e)
   }
  
}


main()
