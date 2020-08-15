
const $  = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


function addStarToPage( manga )
{


  let component = $$('.title')[0] ?? $('.heading-6')

  component.innerHTML = `
    <div id="title-manga-progress">
      <a href="${ manga.get('address') }">${ manga.get('title') }</a>
        <span id="btn-add-manga-progress">
    	  &#x2B50;
    	</span>
    </div>
  `
}


function getMangaData(){

  let manga = new Map()

  try {

    manga.set('title', String($$('.title')[0]?.textContent ?? $('.html-embed-3')?.children[0]?.children[0]?.textContent?.match(/(\w+.*[-])/)[0]?.slice(0, -2)) )
    manga.set('address', String(location.href.match(/http?s:\/\/\w*.\w+\/\w+\/\w+?.+[^(\/\d+.\d+)#]/)[0]) )
    manga.set('address-page', String(''))
	manga.set('id', Number(location.pathname.match(/\d+/)[0]))
    manga.set('page',  Number((location.hash.length) ? location.hash.replace('#', '') : 0))
    manga.set('chapters', Number($(".cap")?.id?.match(/\d+/)[0] ?? 0) )
    manga.set('current',  Number((location.pathname.match(/(\d+\/(\d+))/)?.length)? location.pathname.match(/(\d+\/(\d+))/)[2] : 0))
	manga.set('cover', String(document.querySelector('.image-3')?.src ?? ''))

	return manga

  } catch(e) {
	  throw new Error(e)
  }
}


async function main(){

  let manga = null
  
  try {

    manga = getMangaData()

    addStarToPage(manga)

        
    $('#btn-add-manga-progress').addEventListener('click', async e => {
       
      chrome.storage.sync.get(['favorites'], function({favorites}) {
        if(!favorites){
          	favorites = {}
        }

        if(favorites[`${ manga.get('id') }`]){

          let favorite = new Map( favorites[`${ manga.get('id') }`] )
          
          if( !favorite.get('chapters') || favorite.get('chapters') < manga.get('chapters') ){
            favorite.set('chapters', manga.get('chapters') )	
          }
  
        }

        favorites[`${ manga.get('id') }`] = [ ...manga ]
        
        chrome.storage.sync.set({'favorites': favorites }, function() {
          console.log(`Save data`)
        })

        chrome.storage.sync.get(['favorites'], function(result) {
          console.log(result)
        })
      })
    })

   } catch(e) {
     console.error(e)
   }
  
}


main()
