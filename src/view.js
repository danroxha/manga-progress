import error404 from './img/404.js'

Vue.component('gear-icon', {
  template: `
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
  `
})

Vue.component('list-icon', {
  methods: {
    onClicked(){
      this.$emit('showMenu')
    }
  },
  template: `
    <svg
      @click='onClicked'
      stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.46" y="3.06" width="23.08" height="2.18"></rect>
        <rect x="0.46" y="8.29" width="23.08" height="2.18"></rect>
        <rect x="0.46" y="13.53" width="23.08" height="2.18"></rect>
        <rect x="0.46" y="18.76" width="15.81" height="2.18">
      </rect>
    </svg>
  `
})

Vue.component('logo-icon', {
  template: `
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
  `
})

Vue.component('trash-icon', {
  props: ['state'],
  methods: {
    dragLeave(){
      this.$emit('dragLeave')
    },
    dragOver(){
      this.$emit('dragOver')
    },
    drop(){
      this.$emit('dropItem')
    }
  },

  template: `
    <svg
      id='trash'
      :class='(state.over)? "fill-red" : "fill-white"'
      v-show="state.status"    
      
      @dragleave='dragLeave'
      @dragover.prevent='dragOver'
      @drop="drop"
  
      stroke="currentColor" 
      fill="currentColor" 
      stroke-width="0" 
      viewBox="0 0 448 512" 
      height="80px" 
      width="80px" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 
        0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 
        0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 
        0 0 0 47.9-45L416 128H32z">
      </path>
    </svg>
  `
})

Vue.component('card-info', {
  props: ['cardInformation', 'displaySetting'],
  template: `
    <dl
      v-show='!!cardInformation.enable'
      id="card-float" 
      :style='{top:cardInformation.y+"px", left:cardInformation.x+"px", height: (displaySetting.modes.select == "list")? "60px": "70px"}'
    >
        <dt v-if='displaySetting.modes.select == "grid"'>Title</dt>
        <dd v-if='displaySetting.modes.select == "grid"'>{{cardInformation.data?.title}}</dd>
        <dt>Chapters</dt>
        <dd>{{cardInformation.data?.chapters ?? 9999}}</dd>
        <dt>Current</dt>
        <dd>{{cardInformation.data?.current ?? 9999}}</dd>
        <dt>Status</dt>
        <dd>{{cardInformation.data?.status}}</dd>
    </dl>
  `
})

Vue.component('filter-tool', {
  props:['search'],
  methods: {
    onInput(){
      this.$emit('filterAction')
    }
  },
  template: `
    <section v-show="search.enable" class='tool-search'>
      <input
        v-model='search.filter'
        @input.prevent='onInput'
        type='text'
        placeholder='Filter'
        autofocus
      />  
    </section>
  `
})

Vue.component('circle-progress', {
  props: ['percent'],
  template: `
    <svg>
    <circle cx='46' cy='52' r='45'></circle>
    <circle 
        cx='46' cy='52' r='45'
        :style="{ 'stroke-dashoffset': 440 - (280 * percent) / 100}"
      >
      </circle>
    </svg>
  `
})

new Vue({
  el: '#app',
  template: `
    <main id='container'>
    <header class='header' >
            <div 
              v-if="mode == 'normal'" 
              :class='
                (removing.status)
                  ? "normal-header blur-trash"
                  : "normal-header"
              '
              >
              <logo-icon/>
                <section>
                  <h1>Mangá<br/>Progress</h1>
                </section>
                <nav>
                 <gear-icon />
                 <list-icon @showMenu="setVisibleMenu" />
      
                  <form 
                    id="display-setting"
                    v-show="displaySetting.visible"
                  >
                    <label
                      v-for='(option, key) in displaySetting.ordination.options'
                    >
                      <input
                        :checked='!!(displaySetting.ordination.enable == key)'
                        type="radio" name="ordination"
                        @change='setSettingDisplay($event, key)'
                      />
                      {{ key }}
                    </label>
                    
                    <hr/>

                    <label
                      v-for='(option, key) in displaySetting.modes.options'
                    >
                      <input
                        :checked='!!(displaySetting.modes.select == option)'
                        type="radio" name="view" :value=option 
                        @change='setSettingDisplayMode($event, option)'
                      />
                      {{option}}
                      
                    </label>

                    </form>
                    <!-- 
                    <div id='display-setting-submenu'>
                      <label
                        v-for='(value, key) in displaySetting.ordination.options[displaySetting.ordination.enable]'
                      >
                        <input
                          @change='setSettingDisplay($event, key)'  
                          type="radio" name="ordination-option"
                          :checked='
                            (
                              displaySetting.ordination.options[
                                displaySetting.ordination.enable
                              ][displaySetting.ordination.select[displaySetting.ordination.enable]] == value
                            )
                          '
                        />  
                        {{ value }}
                      </label>  
                    </div>
                    -->
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

            <trash-icon 
              :state="removing"
              @dragLeave='dragleave'
              @dragOver='dragover'
              @dropItem="removeCard"
            />
      </header>
      
      <filter-tool 
        @filterAction="applyFilter"
        :search="search"
      />    
      
      <section 
        :class='(mode == "read" || removing.status)? "cards-container cards-blur":"cards-container"'
      >
        <ul
          :class='(displaySetting.modes.select == "list")? "list":  "grid" '
        >   
          <li

            draggable 
            class='card' 
            v-for='manga in list'
            
            @dragstart='dragstart'
            @dragend='dragend'
            @mousemove='enableCardInformation($event, manga)'
            @mouseout='disableCardInformation'
            @click.prevent='redirectPage($event, manga)'
            :key="manga.hash"
            :id="manga.hash"
            
          >
            
            <section
              v-if='displaySetting.modes.select == "list"'
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
            </section>
            <section
            class='grid-box'
            v-else 
            >
            <figure>
            <img draggable='false' :src='(manga.cover !== "null")? manga.cover : error404' />
                <p>{{
                  (manga.progress !== Infinity) 
                  ? manga.progress + "%"
                  : "Click" 
                }}</p>
                </figure>
                <circle-progress :percent="manga.progress" />
              </section>
          </li>
        </ul>
        <card-info 
          :cardInformation="cardInformation" 
          :displaySetting="displaySetting"
        />
      </section>
    </main>
  `,
  
  data: {
    mode: 'normal',
    mangas: [],
    list: [],
    rawMangas: null,
    currentManga: {},
    removing: {
      over: false,
      status: false,
      component: null,
    },
    search: {
      enable: true,
      filter: null, 
    },

    displaySetting: {
      visible: false,
      ordination: {
        select: {alphabet: 0, progress: 0},
        enable: 'alphabet',
        options: {
          alphabet: ['order', 'reverse'],
          progress: ['more progress', 'less progress']
        },
      },
      
      modes: {
        select: 'grid',
        options: ['list', 'grid'],
      }
    },  

    cardInformation: {
      x: 0, y: 0, data: null,
      enable: false,
    },
  },
  methods: {
    applyFilter() {
      
      if(!this.search.enable || !this.search.filter.trim() ) {
        
        this.organizeList()
        this.list = this.mangas

        return
      }

      this.list = this.mangas.
        filter(manga => manga.title.toLowerCase().match(this.search.filter.toLowerCase())) 

      this.organizeList()
    },
    changeMode(){
      
      const NORMAL = 'normal'
      const READ   = 'read'

      this.mode = (this.mode === READ) ? NORMAL : READ
      this.saveConfiguration()
    },

    redirectPage(_, manga){
      window.open(`${manga.address}${manga.id}`)
    },
    
    redirectCurrentChapter(_, manga){
      
      if(!manga.current)
        manga.current++
      
      let href = `${manga.address}${manga.id}/${manga.current}#${manga.page}`
      window.open(href)
    },
    
    processProgress() {
      for( let manga of this.mangas ){
        
        const HUNDRED_PERCENT = 100

        manga.progress = manga.current * HUNDRED_PERCENT / manga.chapters
        manga.progress = Number(manga.progress.toFixed(2))
        this.rawMangas[manga.hash] = manga
      }
    },

    loadFavorites(){
      return new Promise((resolve, reject) => {
        chrome.storage.local.get(['favorites'], ( { favorites : mangas } ) => {

          let __mangas = []
          let __raw = mangas

          for(let key in mangas){
            __mangas.push(mangas[key])
          }
          
    
          chrome.storage.local.get(['currentManga'], ({ currentManga }) => {
          
            //this.currentManga = mangas[currentManga?.hash]
            resolve({favorites: __mangas, raw: __raw })

          })
        })
      })
    },

    updateFavorites(){
      return new Promise((resolve, _) => {
        chrome.storage.local.set({'favorites': this.rawMangas }, null)
        resolve({status:  true })
      })
    },

    loadConfiguration(){
      return new Promise((resolve, _) => {
        chrome.storage.local.get(['settings'], ( { settings} ) => {
          if(settings !== undefined)
            this.displaySetting = settings
          
          resolve({status: true})
        })
      })
    },
    
    saveConfiguration(){
      return new Promise((resolve, _) => {
        chrome.storage.local.set({'settings': this.displaySetting }, null)
        resolve({status:  true })
      })
    },

    async syncStorage(){
      const { favorites, raw } = await this.loadFavorites()
      this.mangas = favorites
      this.rawMangas = raw
    },

    setVisibleMenu(){
      this.displaySetting.visible = !this.displaySetting.visible
    },

    setSettingDisplay(_, key){

      this.setVisibleMenu()

      if(this.displaySetting.ordination.select[key] !== undefined){
        this.displaySetting.ordination.enable = key
      }
      else {
        this.displaySetting.ordination.select[this.displaySetting.ordination.enable] = key
      }

      this.organizeList()
      this.saveConfiguration()
    },

    setSettingDisplayMode(_, key){
      this.setVisibleMenu()
      this.displaySetting.modes.select = key
      this.saveConfiguration()
    },

    enableCardInformation(event, data){
      
      const margin = 10
      
      if(this.mode === 'read' )
        return

      this.cardInformation.enable = true
      this.cardInformation.data = data
      this.cardInformation.x = event.x + margin
      this.cardInformation.y = event.y + margin
    },

    disableCardInformation(){
      this.cardInformation.enable = false
    },
    enableFieldFilter(){
      this.search.enable = true

    },
    disableFieldFilter(){
      this.search.enable = false
    },

    dragstart(event){
      this.disableCardInformation()
      this.disableFieldFilter()
      this.removing.status = !this.removing.status
      this.removing.component = event.target
    
    },

    dragend(){
      this.enableFieldFilter()
      this.removing.status = !this.removing.status
    },
    
    async removeCard(){

      if( !this.removing.over )
        return

      delete this.rawMangas[this.removing.component.id]

      await this.updateFavorites()
      this.syncStorage()
    },

    dragover(){ this.removing.over = true },
    dragleave(){ this.removing.over = false },
    
    organizeList(){
    
      switch(this.displaySetting.ordination.enable){
        case 'alphabet':
          if(!this.displaySetting.ordination.select[this.displaySetting.ordination.enable])
            this.mangas = _sort(this.mangas, 'title')
          else 
            this.mangas = _sort(this.mangas, 'title').reverse()

          break
        case 'progress':
          if(!this.displaySetting.ordination.select[this.displaySetting.ordination.enable])
            this.mangas = _sort(this.mangas, 'progress').reverse()
          else
            this.mangas = _sort(this.mangas, 'progress')
      
          break
      }

    
      function _sort(list, key)
      {
        return list.sort(function (a, b) {
          
          if (a[key] > b[key]) return 1
          if (a[key] < b[key]) return -1
          
          return 0;
        });
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

    async order(){
      this.processProgress()
      this.organizeList()
    },
  },
  
  computed: {
    error404(){
      return error404
    },
  },
  
  async mounted(){
    
    await this.syncStorage()
    await this.loadConfiguration()
    await this.order()

    this.list = this.mangas

  }
})
