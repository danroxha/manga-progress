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
        {{ key }}
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
        {{option}}
        
      </label>
    </form>
  `,

  computed: {
    displaySetting() {
      return this.$store.state.settings.display
    },
  }
}