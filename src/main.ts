import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Quasar, Notify, Dialog, LocalStorage, Cookies } from 'quasar'
import lang from 'quasar/lang/ru'

// Quasar CSS
import 'quasar/src/css/index.sass';
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/dist/quasar.css'

import './style/project/common_styles.scss'
import './style/project/z_input.scss'
import './style/project/z_select.scss'

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