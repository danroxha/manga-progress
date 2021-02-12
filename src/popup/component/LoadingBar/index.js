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
        message = `Check new chapters`
      else if (!favorite.chapters)
        message = `Click here for update`
      else
        message = `Complete ${favorite.progress}%`

      return message
    },
  },
}