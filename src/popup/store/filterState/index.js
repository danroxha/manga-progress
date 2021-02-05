export default {
  state: {
    search: {
      enable: true,
      filter: null,
    },
  },

  mutations: {
    enableFieldFilter(state) {
      state.search.enable = true
    },

    disableFieldFilter(state) {
      state.search.enable = false
    },
  },
}