// routes/users.js - Actualizado para manejar la base de datos quote.db

import express from 'express';
import sqlite3 from 'sqlite3';

const router = express.Router();
const db = new sqlite3.Database('./quote.db'); // ← Conecta a tu base quote.db

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtiene todas las citas
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de citas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID:
 *                     type: integer
 *                   movie:
 *                     type: string
 *                   quote:
 *                     type: string
 *                   character:
 *                     type: string
 *       500:
 *         description: Error en el servidor
 */
router.get('/', (req, res) => {
  db.all('SELECT * FROM quote', [], (err, rows) => { 
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Agrega una nueva cita de película
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - movie
 *               - quote
 *               - character
 *             properties:
 *               movie:
 *                 type: string
 *                 example: El Padrino
 *               quote:
 *                 type: string
 *                 example: Le haré una oferta que no podrá rechazar.
 *               character:
 *                 type: string
 *                 example: Vito Corleone
 *     responses:
 *       201:
 *         description: Cita creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 quoteId:
 *                   type: integer
 *       400:
 *         description: Faltan campos requeridos
 *       500:
 *         description: Error en el servidor
 */
router.post('/', (req, res) => {
  const { movie, quote, character } = req.body;
  
  if (!movie || !quote || !character) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  
  const sql = 'INSERT INTO quote (movie, quote, character) VALUES (?, ?, ?)';
  const params = [movie, quote, character];
  
  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      message: 'Cita creada exitosamente',
      quoteId: this.lastID,
    });
  });
});

export default router;