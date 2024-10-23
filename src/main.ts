import './assets/css/GlobalStyle.css'

import { createApp } from 'vue'

// Pinia
import { createPinia } from 'pinia'

// Sweat Alert
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

// FontAwesome imports
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Vuetify
import vuetify from '@/plugins/vuetify'

// reCaptcha
import { install } from "vue3-recaptcha-v2";

import App from './App.vue'
import router from './routers'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(VueSweetalert2)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(install, {
    sitekey: '6Lf1uWkqAAAAADu_ZKUCBEDfimxOWYMvG-OrXOv0',
    cnDomains: false, // Optional, If you use in China, set this value true
  })

app.mount('#app')
