import './assets/base.css'

//database stuff
import Database from "tauri-plugin-sql-api";
const db = await Database.load("sqlite:finances.sqlite");

const result = await db.execute("INSERT INTO transactions (name, value, date) VALUES (?, ?, ?)", ['test', 25.99, Date.now()]);
console.log(result);

export { db };

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
