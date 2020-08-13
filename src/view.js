new Vue({
  el: '#app',
  template: `
    <section>
      <header id="header-manga-progress">
        <div v-if="mode != 'read'" class='header-title'>
          <h1>{{title}}</h1>
        </div>
        <div v-else class="card-read">
          <section>
             <header>
                 <img src="https://img-host.filestatic1.xyz/mangas_files/one-piece-br/image_one-piece-br.jpg"/>
                 <h1>{{mangas[0]?.title}}</h1>     
             </header>
             <div>
               <span>Chapters: mangas[0]?.chapters</span>
               <span>Current: mangas[0]?.current</span>
             </div>
          </section>
        </div>
       <button v-on:click="changeMode">{{mode}}</button>
      </header>
      <main class='card-container'>
          <ul >
             <li class='card' v-for="manga in mangas">
               <a 
                 :href="manga?.href" 
                 @click.prevent="redirectPage($event)" 
               > <header>
                   <img src="https://img-host.filestatic1.xyz/mangas_files/one-piece-br/image_one-piece-br.jpg"/>
                   <h3>{{manga.title}}</h3>
                 </header>
                 <section>
                   <span>Chapters: {{manga?.chapters}}</span>
                   <span>Current: {{manga?.current}} </span>
                 </section>
                 <input 
                   type='button' 
                   :value='(manga?.current)? "Continue" : "Read"'
                 /> 
               </a>
             </li>
          </ul>
      </main>
    </section>
  `,
  
  data: {
    title: 'Manga Progress',
    mode: 'read',
    mangas: [],
  },
  methods: {
  	changeMode(){
  		this.mode = (this.mode === 'read') ? 'blur' : 'read'
  	},

  	redirectPage(href){
       //window.open(href)
  	}
  },
  mounted(){

    // chrome.storage.sync.get(['favorites'], ( {favorites : mangas } ) => {
      // for(let key in mangas){
// 
      	// let manga = new Map(mangas[key])
// 
        // this.mangas.push({
        	// title: manga.get('title'),
        	// chapters: manga.get('chapters'),
        	// current: manga.get('current'),
        	// href: manga.get('address'),
        // })
      // }
    // })

    for(let i = 0; i < 8; i++){
    	this.mangas.push({
    		title: 'One Piece',
    		chapters: 987,
    		current: 0,
    		href: '#'
    	})
    }
  }
})
