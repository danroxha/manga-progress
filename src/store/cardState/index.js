export default {

  state: {
    removing: {
      over: false,
      status: false,
      component: null,
    },

    cardInformation: {
      x: 0, y: 0, data: null,
      enable: false,
    },
  },
  mutations: {

    enableCardInformation(state, value) {

      const [event, data] = value
      const margin = 10

      // if(this.mode === 'read' )
      //   return

      state.cardInformation.enable = true
      state.cardInformation.data = data
      state.cardInformation.x = event.x + margin
      state.cardInformation.y = event.y + margin
    },

    disableCardInformation(state) {
      state.cardInformation.enable = false
    },

    dragstart(state, event) {
      state.cardInformation.enable = false
      // state.disableFieldFilter()
      state.removing.status = !state.removing.status
      state.removing.component = event.target
    },

    dragend(state) {
      // state.enableFieldFilter()
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