import { HomePage, ConfigPage } from '../pages/index.js'


export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/public/index.html', alias: '/', component: HomePage },
    { path: '/config', component: ConfigPage }
  ]
})