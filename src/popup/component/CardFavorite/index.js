import { CircleProgress, LoadingBar, LoadingCircle } from '../index.js'

export default {
  name: 'card-favorite',
  props: ['favorite', 'enableDate'],
  components: {
    CircleProgress, LoadingBar, LoadingCircle
  },
  template: `
    <li 
      class='card' 
      @dragstart='$emit("DragStart", $event)'
      @dragend='$emit("DragEnd")'
      @mousemove='$emit("MouseMove", $event, favorite)'
      @mouseout='$emit("MouseOut")'
      :id='favorite.hash'
    >
      
      <section
        v-if='displaySetting.modes.select == "list"'
        class="list"
        @click.prevent='redirectPage($event, favorite)'
        
      >
        <header>
          <span v-show='enableDate' class='last-update-manga'>
            {{ dateFormat(favorite?.lastUpdate) }}
          </span>
          <h2>{{ favorite?.title }}</h2>
          <span @click.prevent='redirectCurrentChapter($event, favorite)'> 
            ${chrome.i18n.getMessage('messageCardFavoriteButtonGo')}
          </span>
        </header>
        <loading-bar :favorite='favorite' />
      </section>
    
      <section
        v-else
        class='grid-box'
        @click.prevent='redirectPage($event, favorite)'
      >
        <loading-circle v-if='favorite.loading' />
        <figure v-else>
          <img draggable='false' :src='favorite.imageSource' />
            <p>{{
              (favorite.progress !== Infinity) 
              ? favorite.progress + "%"
              : '${chrome.i18n.getMessage('messageCardFavoriteGridClick')}'
            }}</p>
        </figure>
        <circle-progress 
          v-show='!favorite.loading' 
          :percent="favorite.progress" 
        />
      </section>
    </li>
  `,

  methods: {
    dateFormat(date) {
      return new Date(date).toLocaleDateString()
    },
    redirectCurrentChapter(_, favorite) {

      if (!favorite.current)
        favorite.current++

      let href = `${favorite.address}${favorite.id}/${favorite.current}#${favorite.page}`
      window.open(href)
    },

    redirectPage(_, favorite) {
      window.open(`${favorite.address}${favorite.id}`)
    },
  },

  computed: {
    displaySetting() {
      return this.$store.state.settings.display
    },
  }
}
