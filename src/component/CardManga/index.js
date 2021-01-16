import { CircleProgress, LoadingBar } from '../index.js'

export default {
  name: 'card-manga',
  props: ['manga'],
  components: {
    CircleProgress, LoadingBar
  },
  template: `
    <li 
      class='card' 
      @dragstart='$emit("DragStart", $event)'
      @dragend='$emit("DragEnd")'
      @mousemove='$emit("MouseMove", $event, manga)'
      @mouseout='$emit("MouseOut")'
      :id='manga.hash'
    >
      
      <section
        v-if='displaySetting.modes.select == "list"'
        class="list"
        @click.prevent='redirectPage($event, manga)'
        
      >
        <header>
        
          <h2>{{ manga?.title }}</h2>
          <span
            @click.prevent='redirectCurrentChapter($event, manga)'
          > Go </span>
        </header>
        <loading-bar :manga='manga' />
      </section>
    
      <section
        v-else
        class='grid-box'
        @click.prevent='redirectPage($event, manga)'
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
  `,

  methods: {

    redirectCurrentChapter(_, manga) {

      if (!manga.current)
        manga.current++

      let href = `${manga.address}${manga.id}/${manga.current}#${manga.page}`
      window.open(href)
    },

    redirectPage(_, manga) {
      window.open(`${manga.address}${manga.id}`)
    },
  },

  computed: {
    displaySetting() {
      return this.$store.state.settings.display
    },
  }
}