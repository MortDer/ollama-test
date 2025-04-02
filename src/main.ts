import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {Cookies, Dialog, LocalStorage, Notify, Quasar} from 'quasar'
import lang from 'quasar/lang/ru'

import './style/project/reset_styles.scss'
// Quasar CSS
import 'quasar/src/css/index.sass';
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/dist/quasar.css'

import './style/project/common_styles.scss'
import './style/project/z_input.scss'
import './style/project/z_select.scss'
import './style/project/project_styles.scss'

const app = createApp(App)

app.use(Quasar, {
    plugins: {
        Notify,
        Dialog,
        LocalStorage,
        Cookies
    },
    lang
})

app.mount('#app')