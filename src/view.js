
new Vue({
  el: '#app',
  template: `
    <main id='container'>
      <header class='header'>
            <div v-if="mode == 'normal'" class="normal-header">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3.214 1.072C4.813.752 6.916.71 8.354 2.146A.5.5 0 018.5 2.5v11a.5.5 0 01-.854.354c-.843-.844-2.115-1.059-3.47-.92-1.344.14-2.66.617-3.452 1.013A.5.5 0 010 13.5v-11a.5.5 0 01.276-.447L.5 2.5l-.224-.447.002-.001.004-.002.013-.006a5.017 5.017 0 01.22-.103 12.958 12.958 0 012.7-.869zM1 2.82v9.908c.846-.343 1.944-.672 3.074-.788 1.143-.118 2.387-.023 3.426.56V2.718c-1.063-.929-2.631-.956-4.09-.664A11.958 11.958 0 001 2.82z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M12.786 1.072C11.188.752 9.084.71 7.646 2.146A.5.5 0 007.5 2.5v11a.5.5 0 00.854.354c.843-.844 2.115-1.059 3.47-.92 1.344.14 2.66.617 3.452 1.013A.5.5 0 0016 13.5v-11a.5.5 0 00-.276-.447L15.5 2.5l.224-.447-.002-.001-.004-.002-.013-.006-.047-.023a12.582 12.582 0 00-.799-.34 12.96 12.96 0 00-2.073-.609z" clip-rule="evenodd"></path>
              </svg>
              <section>
                <h1>Mangá <br/>Progress</h1>
              </section>
              <nav>

                <!-- Gear SVG -->
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 
                    0l-.1.34a1.464 1.464 0 01-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987
                    1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 
                    2.81l.34.1a1.464 1.464 0 01.872 2.105l-.17.31c-.698 1.283.705 2.686 1.987
                    1.987l.311-.169a1.464 1.464 0 012.105.872l.1.34c.413 1.4 2.397 1.4 2.81 
                    0l.1-.34a1.464 1.464 0 012.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464
                    1.464 0 01.872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464
                    0 01-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464
                    1.464 0 01-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 100-5.86 2.929 2.929
                    0 000 5.858z" clip-rule="evenodd">
                  </path>
                </svg>
               <!-- List SVG -->
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.46" y="3.06" width="23.08" height="2.18"></rect>
                  <rect x="0.46" y="8.29" width="23.08" height="2.18"></rect>
                  <rect x="0.46" y="13.53" width="23.08" height="2.18"></rect>
                  <rect x="0.46" y="18.76" width="15.81" height="2.18">
                  </rect>
                </svg>
                
              </nav>
            </div>
            <div v-else class="read-header" >
              <img src="https://fakeimg.pl/200/"/>
              <section>
                <h1>{{ highlight?.title }}</h1>
                <div>
                  <p>Chapters &nbsp;<span>{{ highlight?.chapters }}</span></p>
                  <p>Current &nbsp;<span>{{ highlight?.current }}</span></p>
                </div>
              </section>
              <nav>
                <p>
                  <!-- 
                  	<span>Read</span>
                  	<span>Continue</span>
                  	<span>Finished</span>
                   <span>Awaiting</span>
                  -->
                 <span>{{highlight?.status}}</span>

                </p>
              </nav>
            </div>
      </header>
      <section 
        :class='(mode == "read")? "cards-container cards-blur":"cards-container"' 
      >
        <ul>
          <li class='card' v-for='manga in mangas'>
            <header>
              <h2>{{ manga?.title }}</h2>
              <span> Go </span>
            </header>
            <div class='loading'>
               <div class='bar'></div>
            </div>
          </li>
        </ul>
      </section>
    </main>
  `,
  
  data: {
    title: 'Manga Progress',
    mode: 'normal',
    mangas: [],
    highlight: {},
  },
  methods: {
  	changeMode(){
  		this.mode = (this.mode === 'read') ? 'normal' : 'read'
  	},

  	redirectPage(href){
       //window.open(href)
  	}
  },

  computed: {
  	
  },
  
  mounted(){
    console.log(location)
    chrome.storage.sync.get(['favorites'], ( {favorites : mangas } ) => {
      for(let key in mangas){

      	let manga = new Map(mangas[key])

        this.mangas.push({
        	title: manga.get('title'),
        	chapters: manga.get('chapters'),
        	current: manga.get('current'),
        	href: manga.get('address'),
        })
      }
      this.highlight = this.mangas[0]

    })

    // for(let i = 0; i < 22; i++){
    	// this.mangas.push({
    		// title: 'One Piece',
    		// chapters: 987,
    		// current: 0,
    		// href: '#',
    		// status: 'read'
    	// })
    // }
// 
    // this.highlight = this.mangas[0]
	// this.highlight.status = 'finished'
  }
})
