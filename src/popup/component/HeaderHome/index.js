
import {GearIcon, ListIcon ,LogoIcon, MenuList } from '../index.js'

export default {
  name: 'header-home',
  components: {
    LogoIcon, GearIcon, ListIcon, MenuList
  },
	template: `
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
            
            <router-link to="/config"><gear-icon /></router-link>
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
      <slot>
      </slot>
    </header>
  `,

  methods: {
    ...Vuex.mapMutations( ['loadConfiguration', 'saveConfiguration', 'setVisibleMenu', 'changeMode']),
    setVisibleMenu(){
      this.displaySetting.visible = !this.displaySetting.visible
    },
    setSettingDisplay(_, key){

      this.setVisibleMenu()
      this.displaySetting.ordination.enable = key
      // this.organizeList()
      this.saveConfiguration()
    },
    setSettingDisplayMode(_, key){
      this.setVisibleMenu()
      this.displaySetting.modes.select = key
      this.saveConfiguration()
    },

  },

  computed: {
    mode(){
      return this.$store.state.settings.mode
    },
    
    currentManga(){
      return null
    },

    displaySetting(){
      return this.$store.state.settings.display
    },
    removing(){
      return this.$store.state.cardState.removing
    },
  }
}