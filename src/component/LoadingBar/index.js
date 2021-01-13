export default {
  name: "loading-bar",
  props: ['manga'],
  template: `
    <div class='loading-bar'>
      <div class='percentage' :style="{'width': manga.progress + '%'}"></div>
      <span>
      {{ messageBar(manga) }}
      </span>
    </div>
  `,

  methods: {
    messageBar(manga) {
      let message = ''

      if (manga.status === 'Ativo' && manga.progress === 100.0)
        message = `Check new chapters`
      else if (!manga.chapters)
        message = `Click here for update`
      else
        message = `Complete ${manga.progress}%`

      return message
    },
  },
}