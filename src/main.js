import './assets/base.css'

//database stuff
import Database from "tauri-plugin-sql-api";
const db = await Database.load("sqlite:finances.sqlite");

const init = await db.execute(`PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS transactions(
ID INTEGER PRIMARY KEY,
name TEXT NOT NULL,
value REAL NOT NULL,
date INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS groups(
ID INTEGER PRIMARY KEY,
name TEXT NOT NULL UNIQUE,
color TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS filters(
ID INTEGER PRIMARY KEY,
groupID INTEGER NOT NULL,
value TEXT NOT NULL,
FOREIGN KEY (groupID) REFERENCES groups(id)
);
CREATE TABLE IF NOT EXISTS transactionGroups(
ID INTEGER PRIMARY KEY,
transactionID INTEGER NOT NULL,
groupID INTEGER NOT NULL,
FOREIGN KEY (transactionID) REFERENCES transactions(ID),
FOREIGN KEY (groupID) REFERENCES groups(ID)
);
COMMIT;`);
console.log(init);

// const result = await db.execute("INSERT INTO transactions (name, value, date) VALUES (?, ?, ?)", ['test', 25.99, Date.now()]);
// console.log(result);

export { db }

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
