export default {
  name: 'circle-progress',
  props: ['percent'],
  template: `
    <svg>
      <circle cx='46' cy='52' r='45'></circle>
      <circle 
        cx='46' cy='52' r='45'
        :style="{ 'stroke-dashoffset': 440 - (280 * percent) / 100}"
      >
      </circle>
    </svg>
  `
}