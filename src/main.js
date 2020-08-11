class Store {
  constructor(){}

  static getData(id){
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get([id], function(result) {
        resolve(result)
      })
    })	
  }

  static setData(id, data){
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set({id: data}, function(store) {
        resolve(true)
        console.log(`Set data, ID: ${id}`)
      })	
    })
  }
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


async function main(){

  let manga = {  
  	id: location.pathname.match(/\d+/)[0],
  	title: document.querySelectorAll('.title')[0].textContent,
  	chapters: document.querySelector('.heading-5').textContent.match(/\d+/)[0],
  	current: 0,
  }
	
  document.querySelectorAll('.title')[0].innerHTML = `
  	<div id="title-manga-progress">
  	  <span>${manga?.title}</span>
  	  <span id="btn-add-manga-progress">
  	    &#x2B50;
  	  </span>
  	</div>`
  	
  document.getElementById('btn-add-manga-progress').addEventListener('click', async () => {
	
    chrome.storage.sync.set({'favorites': [...data, manga] }, function(store) {
      //console.log(`Set data`)
    })

    chrome.storage.sync.get(['favorites'], function(result) {
      //console.log(result)	
    })
  })
}


main()
