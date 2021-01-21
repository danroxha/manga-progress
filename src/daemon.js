
const $  = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


function addStarToPage( manga ){

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

function updateManga(favorite, manga){
 
  if( !favorite.id !== manga.id) {
    favorite.id = manga.id
  }
  
  if( !favorite.chapters || favorite.chapters < manga.chapters ){	
    favorite.chapters =  manga.chapters
  }
  
  if( !favorite.current || favorite.current < manga.current){
    favorite.current = manga.current
  }

  if(manga?.cover !== null && !favorite?.cover !== manga?.cover){
    favorite.cover = manga.cover
  }

  if(manga.status !== 'null'){
    favorite.status = manga.status
  }

  if(manga.address !== favorite.address) {
    favorite.address = manga.address
  }
  
  return favorite
}

function getMangaData(){

  let manga = new Object()

  try {

	// MANGAHOSTED.COM/MANGA or MANGAHOST2.COM/MANGA
	
    manga.title = String($$('.title')[0]?.textContent ?? $('.html-embed-3')?.children[0]?.children[0]?.textContent?.match(/(\w+.*[-])/)[0]?.slice(0, -2)) 
    manga.cover = String(document.querySelector('.image-3')?.src ?? null) 
    manga.address = String(location.href.match(/http?s:\/\/\w*.\w+\/\w+\/\w+?.+[^(\/\d+.\d+)#]/)[0])
    manga.id = Number(location.pathname.match(/mh(\d+)/)[1])
    manga.page = Number((location.hash.length) ? location.hash.replace('#', '') : 1)
    manga.chapters = Number($(".cap")?.id?.match(/(\d+|\d+.+)$/)[0].replace("_", ".") ?? 0) 
    manga.current = Number((location.pathname.match(/\w+\d+\/(\d+|\w+.+)$/)?.length)? location.pathname.match(/\w+\d+\/(\d+|\w+.+)$/)[1] : 0)
    manga.progress = 0
    manga.status = String($('.w-list-unstyled')?.getElementsByTagName('li')[1].textContent.replace(/(\w+).:/ig, '').trim() ?? null )    
    manga.hash = SHA1(manga.title)

    
	// CENTRALDEMANGAS.ONLINE/TITULOS/
	
	// manga.title = String($('h1')?.textContent ?? $$('.ui.breadcrumb > a')[2].textContent )
	// manga.chapters = Number(document.querySelectorAll('.active tr a')[0].textContent)
	// manga.current = String(location.pathname.match(/(\/manga\/\w+.+\/(\d+.\d+))/)[2]) -> capitulo atualmente lendo
	// manga.paga =  Number((location.hash.length) ? location.hash.replace('#', '') : 1)
	// manga.cover = String( document.querySelector('.ui.relaxed.list div img').src ?? null )
	
    
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
      
      chrome.storage.local.get(['favorites'], function({favorites}) {
        
        if(favorites[manga.hash]) {
          
          let favorite = favorites[manga.hash]
          
          if(favorite.current == manga.current)
            favorite.page =  manga.page
          else
            return
        
          favorites[manga.hash] = favorite
          
          chrome.storage.local.set({'favorites': favorites }, function(){})
        }
      })
    })

    chrome.storage.local.set({'currentManga': manga }, function(){})

    chrome.storage.local.get(['favorites'], function({favorites}) {
      
      if(favorites[manga.hash]){
        
        favorites[manga.hash] = updateManga(favorites[manga.hash], manga)
        chrome.storage.local.set({'favorites': favorites }, function(){})
      }
    })

        
    $('#btn-add-manga-progress').addEventListener('click', async e => {
       
      chrome.storage.local.get(['favorites'], function({favorites}) {
        
        if( isEmpty(favorites) ){
          favorites = {}
        }


        if(favorites[manga.hash])
          favorites[manga.hash] = updateManga(favorites[manga.hash], manga)
        else 
          favorites[manga.hash] = manga
        
        chrome.storage.local.set({'favorites': favorites }, function() {})
      })
    })

   } catch(e) {
     console.error(e)
   }
  
}


/**
*
*  Secure Hash Algorithm (SHA1)
*  http://www.webtoolkit.info/
*
**/


function SHA1 (msg) {
  
  function rotate_left(n,s) {
    var t4 = ( n<<s ) | (n>>>(32-s));
    return t4;
  };

  function lsb_hex(val) {
    
    var str="";
    var i;
    var vh;
    var vl;

    for( i=0; i<=6; i+=2 ) {
      vh = (val>>>(i*4+4))&0x0f;
      vl = (val>>>(i*4))&0x0f;
      str += vh.toString(16) + vl.toString(16);
    }

    return str;
  };

  function cvt_hex(val) {
    var str="";
    var i;
    var v;

    for( i=7; i>=0; i-- ) {
      v = (val>>>(i*4))&0x0f;
      str += v.toString(16);
    }
    
    return str;
  };
 
  function Utf8Encode(string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {

      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      }
      else if((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  }

  var blockstart;
  var i, j;
  var W = new Array(80);
  var H0 = 0x67452301;
  var H1 = 0xEFCDAB89;
  var H2 = 0x98BADCFE;
  var H3 = 0x10325476;
  var H4 = 0xC3D2E1F0;
  var A, B, C, D, E;
  var temp;
 
  msg = Utf8Encode(msg);

  var msg_len = msg.length;
  var word_array = new Array();

  for( i=0; i<msg_len-3; i+=4 ) {
    j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
    msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
    word_array.push( j );
  }

  switch( msg_len % 4 ) {
    case 0:
      i = 0x080000000;
      break;
    case 1:
      i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
      break;
    case 2:
      i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
      break;
    case 3:
      i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8    | 0x80;
      break;
    }

  word_array.push( i );
 

  while( (word_array.length % 16) != 14 ) word_array.push( 0 );
    
    word_array.push( msg_len>>>29 );
    word_array.push( (msg_len<<3)&0x0ffffffff );

    for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
      for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
      for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
      A = H0;
      B = H1;
      C = H2;
      D = H3;
      E = H4;

      for( i= 0; i<=19; i++ ) {
        temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
        E = D;
        D = C;
        C = rotate_left(B,30);
        B = A;
        A = temp;
      }

      for( i=20; i<=39; i++ ) {
        temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
        E = D;
        D = C;
        C = rotate_left(B,30);
        B = A;
        A = temp;
      }

      for( i=40; i<=59; i++ ) {
        temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
        E = D;
        D = C;
        C = rotate_left(B,30);
        B = A;
        A = temp;
      }

      for( i=60; i<=79; i++ ) {
        temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
        E = D;
        D = C;
        C = rotate_left(B,30);
        B = A;
        A = temp;
      }

      H0 = (H0 + A) & 0x0ffffffff;
      H1 = (H1 + B) & 0x0ffffffff;
      H2 = (H2 + C) & 0x0ffffffff;
      H3 = (H3 + D) & 0x0ffffffff;
      H4 = (H4 + E) & 0x0ffffffff;
    }

  var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

  return temp.toLowerCase();
}

main()
