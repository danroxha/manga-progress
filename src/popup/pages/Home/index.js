import { DBFavorite, DBConfiguration } from '../../store/index.js'
import { 
  CardInfo, CardFavorite, Container, ContainerList,
  FilterTool, TrashIcon, HeaderHome,
 } from '../../component/index.js'


export default {
  name: 'home-page',
  components: {
    CardInfo, CardFavorite, Container, ContainerList,
    FilterTool, TrashIcon, HeaderHome,
  },
  template: `
    <container>
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
        <card-favorite
          draggable 
          v-for='favorite in filteredList'
          @DragStart='dragCard($event)'
          @DragEnd='dropCard'
          @MouseMove='enableCardInformation([$event, favorite])'
          @MouseOut='disableCardInformation'
          :favorite="favorite"
          :enableDate='configuration?.date.enable'
          :key='favorite.hash'
        />
        <card-info />
      </container-list>
    </container>
  `,
  
  data: () => ({
    filteredList: [],
    raw: [],
    currentManga: {},
    configuration: {},
  }),
  
  methods: {
   
    ...Vuex.mapMutations( ['loadConfiguration']),
    ...Vuex.mapMutations( ['enableCardInformation', 'disableCardInformation']),
    ...Vuex.mapMutations( ['dragstart', 'dragend', 'dragover', 'dragleave']),
    ...Vuex.mapMutations( ['enableFieldFilter', 'disableFieldFilter']),

    applyFilter() {
      
      if(!this.search.enable || !this.search.filter?.trim() ) {
        this.filteredList = this.raw
        return
      }
  
      this.filteredList = this.raw.
        filter(favorite => favorite.title.toLowerCase().match(this.search.filter.toLowerCase()))
    },
    
    dragCard(event) {
      this.dragstart(event)
      this.disableCardInformation()
      this.disableFieldFilter()
    },

    dropCard() {
      this.enableFieldFilter()
      this.dragend()
    },

    organizeList() {

      const TITLE = 'title'
      const PROGRESS = 'progress'
      const ALPHABET = 'alphabet'

      switch(this.displaySetting.ordination.enable){
        case ALPHABET:
          if(!this.displaySetting.ordination.select[this.displaySetting.ordination.enable]) {
            this.raw = _sort(this.raw, TITLE)
          }
          else {
            this.raw = _sort(this.raw, TITLE).reverse()
          }

          break
        case PROGRESS:
          if(!this.displaySetting.ordination.select[this.displaySetting.ordination.enable]) {
            this.raw = _sort(this.raw, PROGRESS).reverse()
          }
          else {
            this.raw = _sort(this.raw, PROGRESS)
          }
      
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
          
          return 0
        })
      }
    },
    
    async onlineStatus() {
      
      try {
        const CHECK_URL = 'http://worldclockapi.com/api/json/utc/now'
        const online = await fetch(CHECK_URL).then(response => response)
        return online.status >= 200 && online.status < 300
      } catch(err){
          return false
      }
    },

    getImage(url){
      return fetch(url)
        .then(response => response.blob())
        .then(blob => new Promise((resolve, reject) => {
            
            const reader = new FileReader()
            if(!!blob.type.match('image'))
              reader.onloadend = () => resolve(reader.result)
            else 
              throw new Error('not is image')
          
            reader.onerror = reject
            reader.readAsDataURL(blob)
          })
        )

    }, 

    async loadCovers(){
      if(! await this.onlineStatus()){
        for(let key in this.raw) {
          (import('../../img/404.js'))
            .then(data => {
              this.raw[key].imageSource = data.default
              this.raw[key].loading = false
            })  
        }
      }
      else {
        for(let key in this.raw) {
          this.getImage(this.raw[key].cover)
            .then(image => {
              this.raw[key].imageSource = image    
              this.raw[key].loading = false
            })
            .catch(() => {
              (import('../../img/404.js'))
                .then(data => {
                  this.raw[key].imageSource = data.default
                  this.raw[key].loading = false
                })  
            })
          
        }
      }
    },

    async configData() {
      
      let { favorites }  = await DBFavorite.loadBD()
      let { switch: config } = await DBConfiguration.loadBD()

      this.configuration = config

      if(this.configuration.hidefavorite.enable) {
        favorites = favorites.filter(favorite =>
          favorite.status === 'active' && favorite.progress <= 100.0
        )
      }

      this.raw = favorites
      this.filteredList = this.raw
      
      if(this.raw.length) {
        this.loadCovers()
        this.organizeList()
      }
      
    },
    
    async removeCard() {
  
      if( !this.removing.over )
        return
      
      await DBFavorite.removeByID(this.removing.component.id)
      
      this.filteredList = this.filteredList.filter(card => card.hash != this.removing.component.id)
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
    ordination() {
      this.organizeList()
      this.applyFilter()
    },
  },
  
  async mounted() { 
    await this.loadConfiguration()
    await this.configData()
  }
}
