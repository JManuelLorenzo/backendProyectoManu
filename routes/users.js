import express from 'express';
import sqlite3 from 'sqlite3';

const router = express.Router();
const db = new sqlite3.Database('./quote.db'); 

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
/**
 * @swagger
 * /users:
 *   delete:
 *     summary: Eliminar una cita específica
 *     tags: [Users]
 *     description: Elimina una cita de la base de datos según movie, quote y character.
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
 *                 example: "El Padrino"
 *                 description: Nombre de la película.
 *               quote:
 *                 type: string
 *                 example: "Le haré una oferta que no podrá rechazar."
 *                 description: Texto de la cita.
 *               character:
 *                 type: string
 *                 example: "Vito Corleone"
 *                 description: Personaje que dijo la cita.
 *     responses:
 *       200:
 *         description: Cita eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cita eliminada exitosamente"
 *                 affectedRows:
 *                   type: integer
 *                   example: 1
 *                   description: Cantidad de filas eliminadas
 *       400:
 *         description: Faltan campos requeridos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Faltan campos requeridos"
 *       404:
 *         description: No se encontró la cita para eliminar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se encontró la cita para eliminar"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error de base de datos"
 */
router.delete('/', (req, res) => {
  const { movie, quote, character } = req.body;
  
  if (!movie || !quote || !character) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  
  const sql = 'DELETE FROM quote WHERE movie = ? AND quote = ? AND character = ?';
  const params = [movie, quote, character];
  
  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      message: 'Cita eliminada exitosamente',
      quoteId: this.changes,
    });
  });
});
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar una cita existente
 *     tags: [Users]
 *     description: Actualiza el texto de una cita específica identificada por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la cita que se desea actualizar.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quote
 *             properties:
 *               quote:
 *                 type: string
 *                 example: "Voy a hacerle una oferta mejor."
 *                 description: Nuevo texto de la cita.
 *     responses:
 *       200:
 *         description: Cita actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cita actualizada exitosamente"
 *                 updatedRows:
 *                   type: integer
 *                   example: 1
 *                   description: Cantidad de filas actualizadas
 *       400:
 *         description: Faltan campos requeridos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Falta el nuevo texto de la cita"
 *       404:
 *         description: No se encontró una cita con ese ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se encontró una cita con ese ID"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error de base de datos"
 */

router.put('/:id', (req, res) => {
  const { quote } = req.body;
  const { id } = req.params;

  if (!quote) {
    return res.status(400).json({ error: 'Falta el nuevo texto de la cita' });
  }

  const sql = 'UPDATE quotes SET quote = ? WHERE id = ?';
  const params = [quote, id];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'No se encontró una cita con ese ID' });
    }

    res.status(200).json({
      message: 'Cita actualizada exitosamente',
      updatedRows: this.changes,
    });
  });
});
;

export default router;