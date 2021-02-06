export default {
  props: ['props', 'styleClass'],
  name: 'toogle-switch',
  template: `
    <label :class='styleClass'>
      <slot></slot>
      <div class='switch'>
        <input
          @change.prevent='$emit("Change")' 
          type='checkbox' v-model='props.enable' 
        />
        <span class='slider'></span>
      </div>
		</label>
  `
}