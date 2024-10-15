import './assets/css/GlobalStyle.css'

import { createApp } from 'vue'

// Pinia
import { createPinia } from 'pinia'

// Sweat Alert
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// FontAwesome imports
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue'
import router from './routers'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueSweetalert2);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app')
