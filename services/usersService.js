import db from '../db.js';

export const getAllQuotes = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM quote WHERE eliminado = 0', [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

export const createQuote = (movie, quote, character) => {
  const sql = 'INSERT INTO quote (movie, quote, character, eliminado) VALUES (?, ?, ?, 0)';
  return new Promise((resolve, reject) => {
    db.run(sql, [movie, quote, character], function (err) {
      if (err) return reject(err);
      resolve({ lastID: this.lastID });
    });
  });
};

export const updateQuote = (id, quote) => {
  const sql = 'UPDATE quote SET quote = ? WHERE ID = ?';
  return new Promise((resolve, reject) => {
    db.run(sql, [quote, id], function (err) {
      if (err) return reject(err);
      resolve(this.changes);
    });
  });
};

export const deleteQuote = (id) => {
  const sql = 'UPDATE quote SET eliminado = 1 WHERE ID = ? AND eliminado = 0';
  return new Promise((resolve, reject) => {
    db.run(sql, [id], function (err) {
      if (err) return reject(err);
      resolve(this.changes);
    });
  });
};
