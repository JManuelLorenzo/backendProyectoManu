import sqlite from 'sqlite3'
const db = new sqlite.Database("./quote.db", sqlite.OPEN_READWRITE, (err) =>{
    if(err) return console.error(err);
});
const sql = `CREATE TABLE quote(ID INTEGER PRIMARY KEY, movie, quote, character, eliminado)`;
db.run(sql);