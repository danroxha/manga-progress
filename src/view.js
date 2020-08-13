let $ = document.querySelector.bind(document)

function template(list){
  return `
    <section>
      <h1>Manga Progress</h1>
        <ul>
          ${list}
        </ul>
    </section>
  `
}

document.body.onload = function() {

  let app = $('#app')
  let list = ''
      

  chrome.storage.sync.get(['favorites'], function( {favorites : mangas } ) {

    for(let key in mangas){

      let manga = new Map(mangas[key])

      list += `
        <li>
          <a  href="#" onClick="console.log('ok')">
             <h3>${ manga.get('title') }</h3>
             <div>
               <span>Chapters: ${ manga.get('chapters') }</span>
               <span>Current: ${ manga.get('current') }</span>
             </div>
          </a>
        </li>
      `
    }

    app.innerHTML = template(list)
     
  })

}


function redirect(href){
	location.href = href
}

// new Vue({
  // el: '#app',
  // datas: {
  	// title: "Manga Progress",
  // },
// })
