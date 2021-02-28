export default {
  name: 'menu-list',
  template: `
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
          @change='$emit("ChangeDisplay", $event, key)'
        />
        {{ format(key) }}
      </label>
      
      <hr/>

      <label
        v-for='(option, key) in displaySetting.modes.options'
      >
        <input
          :checked='!!(displaySetting.modes.select == option)'
          type="radio" name="view" :value=option 
          @change='$emit("ChangeMode", $event, option)'
        />
        {{ format(option) }}
        
      </label>
    </form>
  `,
  methods: {
    format(key) {
      switch(key) {
        case 'alphabet': return chrome.i18n.getMessage('submenuAlphabet')
        case 'progress': return chrome.i18n.getMessage('submenuProgress')
        case 'list': return chrome.i18n.getMessage('submenuList')
        case 'grid': return chrome.i18n.getMessage('submenuGrid')
      }
    }
  },
  computed: {
    displaySetting() {
      return this.$store.state.settings.display
    },
  }
}