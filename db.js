import sqlite from 'sqlite3';

const db = new sqlite.Database("./quote.db", sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE, (err) => {
  if (err) return console.error(err);
  console.log('Conectado a quote.db');
});

const createTableSQL = `
  CREATE TABLE IF NOT EXISTS quote (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    movie TEXT NOT NULL,
    quote TEXT NOT NULL,
    character TEXT NOT NULL,
    deleted TEXT NOT NULL
  )
`;

db.run(createTableSQL, (err) => {
  if (err) console.error("Error al crear la tabla:", err);
  else console.log("Tabla 'quote' lista");
});

export default db;
