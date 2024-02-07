// import 'bootstrap/scss/bootstrap.scss'
import './assets/all.scss'
import Loading from 'vue-loading-overlay'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// app.ues(bootstrap)
app.use(createPinia())
app.use(router)
app.component('VueLoading', Loading)
app.mount('#app')
