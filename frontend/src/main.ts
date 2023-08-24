import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import {key, store} from './store'
import axios from 'axios'
import '@/assets/fonts/fonts.css'
import process from 'process'

axios.defaults.baseURL = 'https://api.pausestore.ca/api'
//axios.defaults.baseURL = 'http://localhost:8081/api'
const app = createApp(App)

app.use(router)
app.use(store, key)
app.mount('#app')
const globals = app.config.globalProperties
app.config.globalProperties.$S3_URL=process.env.VUE_APP_S3_URL
export { globals }