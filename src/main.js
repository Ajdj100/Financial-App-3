import './assets/base.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

var sqlite3 = require('sqlite3');
var db;


const app = createApp(App)

app.use(router)

app.mount('#app')
