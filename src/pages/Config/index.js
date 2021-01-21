import { Container } from '../../component/index.js'

export default {
	name: 'config-page',
	components: {
		Container,
	},
	template: `
		<container>
			<router-link to="/">home</router-link>
		</container>
	`,
}