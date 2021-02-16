export default {
  name: 'filter-tool',
  props: ['search'],
  template: `
    <section v-show="search.enable" class='tool-search'>
      <input
        v-model='search.filter'
        @input.prevent='$emit("Input")'
        type='text'
        placeholder='${chrome.i18n.getMessage("placeholderFilter")}'
        autofocus
      />  
    </section>
  `
}
