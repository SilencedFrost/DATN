import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './styles/custom.scss'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import '@fontsource/open-sans'
import '@fontsource/open-sans/500.css'
import '@fontsource/open-sans/700.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
