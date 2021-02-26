export default {

  state: {
    removing: {
      over: false,
      status: false,
      component: null,
    },

    cardInformation: {
      x: 0, y: 0, data: null,
      width: 0, height: 0,
      enable: false,
    },
  },
  mutations: {

    enableCardInformation(state, value) {

      const [event, data] = value
      const margin = 10

      state.cardInformation.height = 70
      state.cardInformation.width = 170
      state.cardInformation.enable = true
      state.cardInformation.data = data
      state.cardInformation.x = event.x + margin
      state.cardInformation.y = event.y + margin

      const { x, y, width, height } = state.cardInformation
      if( (width + x + margin) > event.view.innerWidth)
        state.cardInformation.x -= (width + x) - event.view.innerWidth + margin

      if( (height + y) > event.view.innerHeight)
        state.cardInformation.y -= (height + y) - event.view.innerHeight
    },

    disableCardInformation(state) {
      state.cardInformation.enable = false
    },

    dragstart(state, event) {
      state.cardInformation.enable = false
      state.removing.status = !state.removing.status
      state.removing.component = event.target
    },

    dragend(state) {
      state.removing.status = !state.removing.status
    },

    async removeCard(state) {

      if (!state.removing.over)
        return

      // delete this.rawMangas[this.removing.component.id]

      // await this.updateFavorites()
      // await this.syncStorage()
      // this.list = this.list.filter(card => card.hash != this.removing.component.id)

    },

    dragover(state) { state.removing.over = true },
    dragleave(state) { state.removing.over = false },

  },
}