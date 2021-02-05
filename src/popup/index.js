import store from './store/index.js'
import RootPage from './pages/index.js'
import router from './router/index.js'

new Vue({
  el: '#app',
  store,
  router,
  components: {RootPage},
  template: `<root-page />`
})