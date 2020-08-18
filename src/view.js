// import Objects from './lib/utils/Objects.js'

new Vue({
  el: '#app',
  template: `
    <main id='container'>
    <header class='header' 
    >
            <div 
              v-if="mode == 'normal'" 
              :class='
                (removing.status)
                  ? "normal-header blur-trash"
                  : "normal-header"
              '
              >
              <!-- Logo -->
              <svg     
                  stroke="currentColor"
                  fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M3.214 1.072C4.813.752 6.916.71 8.354 2.146A.5.5 0 
                      018.5 2.5v11a.5.5 0 01-.854.354c-.843-.844-2.115-1.059-3.47-.92-1.344.14-2.66.617-3.452 
                      1.013A.5.5 0 010 13.5v-11a.5.5 0 01.276-.447L.5 2.5l-.224-.447.002-.001.004-.002.013-.006a5.017 
                      5.017 0 01.22-.103 12.958 12.958 0 012.7-.869zM1 2.82v9.908c.846-.343 1.944-.672 3.074-.788 
                      1.143-.118 2.387-.023 3.426.56V2.718c-1.063-.929-2.631-.956-4.09-.664A11.958 11.958 0 001 
                      2.82z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M12.786 1.072C11.188.752 
                      9.084.71 7.646 2.146A.5.5 0 007.5 2.5v11a.5.5 0 00.854.354c.843-.844 2.115-1.059 3.47-.92 
                      1.344.14 2.66.617 3.452 1.013A.5.5 0 0016 13.5v-11a.5.5 0 00-.276-.447L15.5 
                      2.5l.224-.447-.002-.001-.004-.002-.013-.006-.047-.023a12.582 12.582 0 00-.799-.34 12.96 
                      12.96 0 00-2.073-.609z" clip-rule="evenodd">
                    </path>
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
                  <svg

                    @click="setOrganizeCards"
                  
                    stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.46" y="3.06" width="23.08" height="2.18"></rect>
                      <rect x="0.46" y="8.29" width="23.08" height="2.18"></rect>
                      <rect x="0.46" y="13.53" width="23.08" height="2.18"></rect>
                      <rect x="0.46" y="18.76" width="15.81" height="2.18">
                    </rect>
                  </svg>
                  <form 
                    id="organize"
                    v-show="organizeBox.visible"
                  >
                    <div></div>
                    <label 
                      v-for='option in organizeBox.options'
                      >
                        <input
                          :checked='!!(organizeBox.select == option)'
                          @change="setOrganizeCards"
                          type="radio" name="organize" :value=option 
                        />
                        {{ option }}
                        <br/>
                    </label>
        
                    <!-- 
                    <label>
                      <input type="radio" name="organize" value="z-a" />
                      Z-A
                    </label>
                    -->
                    
                </form>
                </nav>
            </div>
            <div 
              v-else 
              :class='
                (removing.status)
                  ? "read-header blur-trash"
                  : "read-header"
              '
            >
              <img :src="currentManga?.cover"/> <!-- https://fakeimg.pl/200/ -->
              <section>
                <h1>{{ currentManga?.title }}</h1>
                <div>
                  <p>Chapters &nbsp;<span>{{ currentManga?.chapters }}</span></p>
                  <p>Current &nbsp;<span>{{ currentManga?.current }}</span></p>
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
                 <span>{{currentManga?.status}}</span>

                </p>
              </nav>
            </div>
            <svg 
                id='trash'
                v-show="removing.status"    
                
                @dragleave='dragleave'
                @dragover.prevent='dragover'
                @drop="drop"


                  stroke="currentColor" 
                  fill="currentColor" 
                  stroke-width="0" 
                  viewBox="0 0 448 512" 
                  height="80px" 
                  width="80px" 
                  xmlns="http://www.w3.org/2000/svg">
                <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 
                  0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 
                  0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 
                  0 0 0 47.9-45L416 128H32z">
                </path>
            </svg>
      </header>
      <section 
        :class='(mode == "read" || removing.status)? "cards-container cards-blur":"cards-container"' 
      >
        <ul>
          <li

            draggable 
            class='card' v-for='manga in mangas'
            
            @dragstart='dragstart'
            @dragend='dragend'
            @mousemove='enableCardInformation($event, manga)'
            @mouseout='disableCardInformation'
            @click.prevent='redirectPage($event, manga.address)'
            :key="manga.id"
            :id="manga.id"
          >
            <header>
              <h2>{{ manga?.title }}</h2>
              <span
                @click.prevent='redirectCurrentChapter($event, manga)'
              > Go </span>
            </header>
          
            <div class='loading-bar'>
              <div class='percentage' :style="{'width': manga.progress + '%'}">
              </div>
              <span>
                {{ messageBar(manga) }}
              </span>
            </div>
          </li>
        </ul>
        <dl
          v-show='!!cardInformation.enable'
          id="card-float" :style='{top:cardInformation.y+"px", left:cardInformation.x+"px"}'
        >
            <dt>Chapters</dt>
            <dd>{{cardInformation.data?.chapters ?? 9999}}</dd>
            <dt>Current</dt>
            <dd>{{cardInformation.data?.current ?? 9999}}</dd>
            <dt>Status</dt>
            <dd>{{cardInformation.data?.status}}</dd>
        </dl>
      </section>
    </main>
  `,
  
  data: {
    mode: 'normal',
    mangas: [],
    rawMangas: null,
    currentManga: {},
    removing: {
      over: false,
      status: false,
      component: null,
    },
   
    organizeBox: {
      visible: false,
      options: ['a-z', 'z-a'],
      select: 'a-z'
    },

    cardInformation: {
      x: 0, y: 0, data: null,
      enable: false,
    }
  },
  methods: {

  	changeMode(){
  		this.mode = (this.mode === 'read') ? 'normal' : 'read'
  	},

  	redirectPage(_, href){
      // alert(href)
      window.open(href)
    },
    
    redirectCurrentChapter(_, manga){
      
      if(!manga.current)
        manga.current++

      window.open(`${manga.address}/${manga.current}#${manga.page}`)
    },
    
    processProgress() {
      for( let manga of this.mangas ){
        manga.progress = manga.current * 100 / manga.chapters
        manga.progress = Number(manga.progress.toFixed(2))
        this.rawMangas[manga.id] = manga
      }
      
    },

    loadFavorites(){
      return new Promise((resolve, reject) => {
        chrome.storage.sync.get(['favorites'], ( { favorites : mangas } ) => {

          let __mangas = []
          let __raw = mangas

          for(let key in mangas){
            __mangas.push(mangas[key])
          }
          
    
          chrome.storage.sync.get(['currentManga'], ({ currentManga }) => {
          
            this.currentManga = mangas[currentManga?.id]
            resolve({favorites: __mangas, raw: __raw })

          })
        })
      })
    },

    updateFavorites(){
      return new Promise((resolve, reject) => {
        chrome.storage.sync.set({'favorites': this.rawMangas }, null)
        resolve({status:  true })
      })
    },

    async syncStorage(){
      const { favorites, raw } = await this.loadFavorites()
      this.mangas = favorites
      this.rawMangas = raw
    },

    setOrganizeCards(event){
      this.organizeBox.visible = !this.organizeBox.visible
      if(event.type === 'change'){
        this.organizeBox.select = event.target.defaultValue
        this.organizeList()
      }

    },

    enableCardInformation(event, data){
      
      if(this.mode === 'read' )
        return

      this.cardInformation.enable = true
      this.cardInformation.data = data
      this.cardInformation.x = event.x + 10
      this.cardInformation.y = event.y + 10
    
    },

    disableCardInformation(){
      this.cardInformation.enable = false
    },

    dragstart({target}){
      this.disableCardInformation()
      this.removing.status = !this.removing.status
      this.removing.component = target
    },

    dragend(){
      this.removing.status = !this.removing.status
    },
    
    async drop(){

      if( !this.removing.over )
        return

      delete this.rawMangas[this.removing.component.id]

      await this.updateFavorites()
      await this.syncStorage()
    
    },

    dragover(){ this.removing.over = true },
    dragleave(){ this.removing.over = false },
    
    organizeList(){

      const _sort =  (list) =>
      {
        return list.sort(function (a, b) {
          
          if (a.title > b.title) return 1
          if (a.title < b.title) return -1
          
          return 0;
        });
      }

      switch(this.organizeBox.select){
        case 'a-z':
          _sort(this.mangas)
          break
        case 'z-a':
          _sort(this.mangas).reverse()
          break
      }
    },

    messageBar(manga){
      let message = ''

      if(manga.status === 'Ativo' && manga.progress === 100.0)
        message = `Check new chapters`
      else if(!manga.chapters)
        message = `Click here for update`
      else
        message = `Complete ${manga.progress}%`

      return message
    },
  },
  
  computed: {
 
  },
  
  async mounted(){
    
    await this.syncStorage()
    this.organizeList()
    this.processProgress()
    console.log(this.mangas)
  }
})
