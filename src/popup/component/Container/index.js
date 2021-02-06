export default {
  props: ['styleClass'],
  name: 'container',
  template: `
    <main :class='"container " + styleClass'>
      <slot/>
    </main>
  `
}