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
      config: {
        switch: {
          floatmenu: { enable: false, label: 'Enable read mode floating menu', index: 0 },
          readmode: { enable: false, label: 'Enable reading mode', index: 1 },
          hidemanga: { enable: false, label: 'Hide full favorites', index: 2 },
          offline: { enable: false, label: 'Offline favorites covers', index: 3 },
          date: { enable: false, label: 'Show date in list', index: 4 },
        },
      },
    }
  },

  methods: {

    saveConfig() {
      for (let key in this.config.switch) {
        for (let attr in this.config.switch[key]) {
          if (attr === 'enable') continue
          delete this.config.switch[key][attr]
        }
      }

      DBConfiguration.saveDB(this.config)
    },

    async loadConfig() {
      let configDB = await DBConfiguration.loadBD()
      for (var key in configDB.switch)
        this.config.switch[key].enable = configDB.switch[key].enable

      for (var key in configDB) {
        if (key == 'switch') continue
        this.config[key] = configDB[key]
      }

    },

    exportDB() {

    },

    async clearDB() {
    },

    removeFullManga() {
    },

    resetSettings() {
      DBConfiguration.resetDB()
      this.loadConfig()
    },

    showAbout() {

    },

    redirect() {
      window.open("https://github.com/dannRocha")
    },

    async loadStatusStorage() {
      this.db.statusMemory = await Storage.memoryUsedDB('megabyte')
      this.db.statusCapacity = Storage.capacityDB('megabyte')
      this.db.percent = parseFloat(((this.db.statusMemory * 100) / this.db.statusCapacity).toFixed(2))
    },

    sortLabelConfig() {
      this.config.switch = this.config.switch = Object.keys(this.config.switch)
        .sort((keyA, keyB) => {

          if ((this.config.switch[keyA]?.index ?? this.config.switch[keyA]?.label) > (this.config.switch[keyB]?.index ?? this.config.switch[keyB]?.label)) return 1;
          if ((this.config.switch[keyA]?.index ?? this.config.switch[keyA]?.label) < (this.config.switch[keyB]?.index ?? this.config.switch[keyB]?.label)) return -1;

          return 0;
        })
        .reduce((acc, key) => {
          acc[key] = this.config.switch[key]
          return acc
        }, {})
    },
  },

  async mounted() {
    this.sortLabelConfig()
    this.loadStatusStorage()
    this.loadConfig()
  }
}