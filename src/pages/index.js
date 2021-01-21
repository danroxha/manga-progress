export { default as HomePage } from './Home/index.js'
export { default as ConfigPage } from './Config/index.js'

export default {
  name: 'root-page',
  template: `
    <router-view />
  `,
}