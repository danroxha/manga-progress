import { Container, ToogleSwitch, ArrowBackIcon, GithubIcon } from '../../component/index.js'
import store, { Storage, DBConfiguration } from '../../store/index.js'

export default {
	name: 'config-page',
	components: {
		Container, ToogleSwitch, ArrowBackIcon, GithubIcon
	},
	template: `
		<container styleClass='container-settings'>
			<header class='header-config'>
				<div>
					<router-link to="/"><arrow-back-icon/></router-link>
					<h2>Storage</h2>
				</div>
				<progress class='progress-store' id="file" :value='db.percent' max="100"></progress>
				<p>{{ db.statusMemory }} MB / {{ db.statusCapacity }} MB</p>
			</header>
			<section>
				<toogle-switch 
					v-for='prop in config.switch'
					styleClass='toogle-style' 
					@Change='saveConfig' :props='prop'	
				>
					<h3> {{ prop.label}} </h3>
				</toogle-switch>
				<div>
					<button @click='exportDB'>Export database</button>
					<button @click='clearDB'>Clear database</button>
					<button @click='resetSettings'>Reset settings</button>
					<button @click='removeFullManga'>Remove full manga</button>
					<button @click='showAbout'>About</button>
				</div>

			</section>
			<footer @click='redirect'>
				By Daniel Rocha &nbsp;
				<github-icon/>
			</footer>
		</container>
	`,

	data() {
		return {
			db: {
				percent: 0,
				statusMemory: 0,
				statusCapacity: 0,
			},
			config: {},
		}
	},

	methods: {

		saveConfig() {
			DBConfiguration.saveDB(this.config)
		},

		async loadConfig() {
			this.config = await DBConfiguration.loadBD()
		},

		exportDB() {

		},

		async clearDB() {
		},

		removeFullManga() {
		},

		async resetSettings() {
			DBConfiguration.resetDB()
			await this.loadConfig()
		},

		showAbout() {

		},

		redirect(){
			window.open("https://github.com/dannRocha")
		},

		async loadStatusStorage(){
			this.db.statusMemory =  await Storage.memoryUsedDB('megabyte')
			this.db.statusCapacity = Storage.capacityDB('megabyte')
			this.db.percent = parseFloat(((this.db.statusMemory * 100) / this.db.statusCapacity).toFixed(2))
		},
		
		sortLabelConfig(){
			this.config.switch = this.config.switch = Object.keys(this.config.switch)
				.sort((keyA, keyB) => {
					
					if( ( this.config.switch[keyA]?.index ?? this.config.switch[keyA]?.label) > (this.config.switch[keyB]?.index ?? this.config.switch[keyB]?.label)) return 1;
					if( ( this.config.switch[keyA]?.index ?? this.config.switch[keyA]?.label) < (this.config.switch[keyB]?.index ?? this.config.switch[keyB]?.label)) return -1;
					
					return 0;
				})
				.reduce((acc, key) => {
					acc[key] = this.config.switch[key]
					return acc
				}, {})
		},
	},

	async mounted(){
		await this.loadConfig()
		await this.loadStatusStorage()
	}
}