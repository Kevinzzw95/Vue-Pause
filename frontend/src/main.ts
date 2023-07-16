import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import VueTailwindDatepicker from 'vue-tailwind-datepicker'
import {key, store} from './store'
import {XCircleIcon} from '@heroicons/vue/24/outline'
import {CheckCircleIcon} from '@heroicons/vue/24/outline'
import axios from 'axios'
import '@/assets/fonts/fonts.css'

axios.defaults.baseURL = 'https://www.pausestore.ca/api'

const app = createApp(App)

app.use(router)
app.use(store, key)

app.mount('#app')
