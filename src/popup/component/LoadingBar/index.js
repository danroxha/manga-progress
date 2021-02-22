export default {
  name: "loading-bar",
  props: ['favorite'],
  template: `
    <div class='loading-bar'>
      <div class='percentage' :style="{'width': favorite.progress + '%'}"></div>
      <span>
      {{ messageBar(favorite) }}
      </span>
    </div>
  `,

  methods: {
    messageBar(favorite) {
      let message = ''

      if (favorite.status === 'Ativo' && favorite.progress === 100.0)
        message = chrome.i18n.getMessage('messageLoadingBarCheck')
      else if (favorite.status === 'Ativo' && favorite.progress < 100.0)
      	message = `${chrome.i18n.getMessage('messageLoadingBarProgress')} ${favorite.progress}%`
      else if (!favorite.chapters)
        message = chrome.i18n.getMessage('messageLoadingBarClickUpdate')
      else
      	message = chrome.i18n.getMessage('messageLoadingBarComplete')

      return message
    },
  },
}
