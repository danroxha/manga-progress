export default {
  name: 'card-info',
  template: `
    <dl
      v-show='!!cardInformation.enable'
      id="card-float" 
      :style='{top:cardInformation.y+"px", left:cardInformation.x+"px", height: (displaySetting.modes.select == "list")? "60px": "70px"}'
    >
        <dt v-if='displaySetting.modes.select == "grid"'>Title</dt>
        <dd v-if='displaySetting.modes.select == "grid"'>{{cardInformation.data?.title}}</dd>
        <dt>${chrome.i18n.getMessage('messageCardInfoChapters')}</dt>
        <dd>{{cardInformation.data?.chapters ?? 9999}}</dd>
        <dt>${chrome.i18n.getMessage('messageCardInfoCurrent')}</dt>
        <dd>{{cardInformation.data?.current ?? 9999}}</dd>
        <dt>${chrome.i18n.getMessage('messageCardInfoStatus')}</dt>
        <dd>{{cardInformation.data?.status}}</dd>
    </dl>
  `,

  computed: {
    displaySetting() {
      return this.$store.state.settings.display
    },
    cardInformation() {
      return this.$store.state.cardState.cardInformation
    }
  },
}
