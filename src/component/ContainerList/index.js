export default {
  name: 'container-list',
  template: `
    <section :class='(mode == "read" || removing.status)? "cards-container cards-blur":"cards-container"' >
      <ul :class='(displaySetting.modes.select == "list")? "list":  "grid" ' >
      <slot></slot>
      </ul>
    </section>
  `,
  computed: {
    // ...Vuex.mapGetters(['display']),
    mode(){
      return this.$store.state.settings.mode
    },
    displaySetting(){
      return this.$store.state.settings.display
    },
    removing(){
      return this.$store.state.cardState.removing
    },
  }
}