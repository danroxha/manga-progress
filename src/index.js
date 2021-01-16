import store, { DBMangas } from './store/index.js'
import { 
  CardInfo, CardManga, ContainerList,
  FilterTool, TrashIcon, HeaderHome,
 } from './component/index.js'


new Vue({
  el: '#app',
  store,
  components: {
    CardInfo, CardManga, ContainerList,
    FilterTool, TrashIcon, HeaderHome,
  },
  template: `
    <main id='container'>
      <header-home>
         <trash-icon 
          :state="removing"
          @DragLeave='dragleave'
          @DragOver='dragover'
          @Drop="removeCard"
        />
      </header-home>
      
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
   
    ...Vuex.mapMutations( ['loadConfiguration']),
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
    
    dragCard(event){
      this.dragstart(event)
      this.disableCardInformation()
      this.disableFieldFilter()
    },

    dropCard(){
      this.enableFieldFilter()
      this.dragend()
    },

    organizeList() {

      const TITLE = 'title'
      const PROGRESS = 'progress'
      const ALPHABET = 'alphabet'

      switch(this.displaySetting.ordination.enable){
        case ALPHABET:
          if(!this.displaySetting.ordination.select[this.displaySetting.ordination.enable])
            this.list = _sort(this.list, TITLE)
          else 
            this.list = _sort(this.list, TITLE).reverse()

          break
        case PROGRESS:
          if(!this.displaySetting.ordination.select[this.displaySetting.ordination.enable])
            this.list = _sort(this.list, PROGRESS).reverse()
          else
            this.list = _sort(this.list, PROGRESS)
      
          break
      }

    
      function _sort(list, key)
      {
        return list.sort(function (a, b) {
          let valueA  = a[key], valueB = b[key]

          if(key == TITLE) {
            valueA = valueA.toLowerCase()
            valueB = valueB.toLowerCase()
          }

          if (valueA > valueB) return 1
          if (valueA < valueB) return -1
          
          return 0;
        });
      }
    },
    
    async onlineStatus() {
      
      try {
        const online = fetch('https://google.com')
        return online.status >= 200 && online.status < 300
      } catch(err){
          return false
      }
    },


    async loadCovers(){
      if(! await this.onlineStatus()){
        for(let key in this.raw) {
            this.raw[key].imageSource = await (import('./img/404.js')).then(data => data.default)
            this.raw[key].loading = false
        }
      }
      else {
        for(let key in this.raw) {
          this.raw[key].imageSource = this.raw[key].cover
          this.raw[key].loading = false
        }
      }
    },

    async configData() {
      let { mangas }  = await DBMangas.loadBD()
      
      this.raw = mangas
      this.list = this.raw
      this.loadCovers()
      this.organizeList()
      
    },
    
    async removeCard(){

      if( !this.removing.over )
        return
      
      await DBMangas.removeByID(this.removing.component.id)
      
      this.list = this.list.filter(card => card.hash != this.removing.component.id)
      this.raw = this.raw.filter(card => card.hash != this.removing.component.id)
  
    },
  },
  
  computed: {

    displaySetting(){
      return this.$store.state.settings.display
    },

    removing(){
      return this.$store.state.cardState.removing
    },
    
    search(){
      return this.$store.state.filterState.search
    },

    ordination() {
      return this.$store.state.settings.display.ordination.enable
    }
  },

  watch: {
    ordination(){
      this.organizeList()
    },
  },
  
  async mounted(){
    
    await this.loadConfiguration()
    await this.configData()
  }
})
