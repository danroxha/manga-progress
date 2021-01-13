import error404 from './img/404.js'
import store, { Storage } from './store/index.js'
import { 
  CardInfo, CardManga, CircleProgress, ContainerList,
  FilterTool, GearIcon, ListIcon, LogoIcon, MenuList, 
  TrashIcon
 } from './component/index.js'


new Vue({
  el: '#app',
  store,
  components: {
    GearIcon, ListIcon, LogoIcon, TrashIcon,
    CardInfo, FilterTool, CircleProgress,
    CardManga, MenuList, ContainerList,
  },
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
              <list-icon @Click="setVisibleMenu" />
              
              <menu-list 
                @ChangeDisplay='setSettingDisplay'
                @ChangeMode='setSettingDisplayMode'
              />
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
          <img :src="currentManga?.cover"/>
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
          @DragLeave='dragleave'
          @DragOver='dragover'
          @Drop="removeCard"
        />
      </header>
      
      <filter-tool 
        @Input="applyFilter"
        :search="search"
      />  
  
      <container-list>
        <card-manga
          draggable 
          v-for='manga in list'
          @DragStart='dragCard($event)'
          @DragEnd='dropCard'
          @MouseMove='enableCardInformation([$event, manga])'
          @MouseOut='disableCardInformation'
          :manga="manga"
          :key='manga.hash'
        />
        <card-info />
      </container-list>
    </main>
  `,
  
  data: {
    list: [],
    raw: [],
    currentManga: {},
  },
  
  methods: {
   
    ...Vuex.mapMutations( ['loadConfiguration', 'saveConfiguration', 'setVisibleMenu', 'changeMode']),
    ...Vuex.mapMutations( [ 'enableCardInformation', 'disableCardInformation']),
    ...Vuex.mapMutations( [ 'dragstart', 'dragend', 'dragover', 'dragleave']),
    ...Vuex.mapMutations( [ 'enableFieldFilter', 'disableFieldFilter']),

    applyFilter() {
      
      if(!this.search.enable || !this.search.filter.trim() ) {
        
        this.organizeList()
        this.list = this.raw

        return
      }

      this.list = this.raw.
        filter(manga => manga.title.toLowerCase().match(this.search.filter.toLowerCase())) 

      this.organizeList()
    },
    
    setVisibleMenu(){
      this.displaySetting.visible = !this.displaySetting.visible
    },

    setSettingDisplay(_, key){

      this.setVisibleMenu()
      this.displaySetting.ordination.enable = key
      this.organizeList()
      this.saveConfiguration()
    },

    setSettingDisplayMode(_, key){
      this.setVisibleMenu()
      this.displaySetting.modes.select = key
      this.saveConfiguration()
    },

    dragCard(event){
      this.dragstart(event)
      this.disableCardInformation()
      this.disableFieldFilter()
    },

    dropCard(){
      this.enableFieldFilter()
      this.dragend()
    },

    organizeList(){
      
      switch(this.displaySetting.ordination.enable){
        case 'alphabet':
          if(!this.displaySetting.ordination.select[this.displaySetting.ordination.enable])
            this.list = _sort(this.list, 'title')
          else 
            this.list = _sort(this.list, 'title').reverse()

          break
        case 'progress':
          if(!this.displaySetting.ordination.select[this.displaySetting.ordination.enable])
            this.list = _sort(this.list, 'progress').reverse()
          else
            this.list = _sort(this.list, 'progress')
      
          break
      }

    
      function _sort(list, key)
      {
        return list.sort(function (a, b) {
          let valueA  = a[key], valueB = b[key]

          if(key == 'title') {
            valueA = valueA.toLowerCase()
            valueB = valueB.toLowerCase()
          }

          if (valueA > valueB) return 1
          if (valueA < valueB) return -1
          
          return 0;
        });
      }
    },

    async configData() {
      let { mangas }  = await Storage.loadFavorites()
      
      this.raw = mangas
      this.list = mangas.map(Storage.processProgress)
  
    },
    
    async removeCard(){

      if( !this.removing.over )
        return
      
      // await this.removeFavorite(this.removing.component.id)
      await Storage.removeFavorite(this.removing.component.id)
    
      // await this.loadFavorites()

      this.list = this.list.filter(card => card.hash != this.removing.component.id)
  
    },
    
    async order(){
      this.organizeList()
    },
  },
  
  computed: {

    displaySetting(){
      return this.$store.state.settings.display
    },

    mode(){
      return this.$store.state.settings.mode
    },
    removing(){
      return this.$store.state.cardState.removing
    },
    
    search(){
      return this.$store.state.filterState.search
    },

    error404(){
      return error404
    },
  },
  
  async mounted(){
    
    await this.loadConfiguration()
    await this.configData()
    await this.order()
  }
})
