import './assets/base.css'

//database stuff
import SQLite from 'tauri-plugin-sql-api';
console.log(SQLite)
const db = await SQLite.open('./finances.sqlite');

await db.execute(`
    INSERT INTO transactions VALUES ('Test', ?1, ?2 )
`, [29.99, Date.now()]);

export { db };

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
