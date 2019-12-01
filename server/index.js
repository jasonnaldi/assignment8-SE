#!/usr/bin/node

const App = require('./src/app.js');

const { env } = process;
const {
  PORT,
  DB_URL,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
} = env;
const app = new App(DB_URL, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_PORT);

app.listen(PORT || 80);
