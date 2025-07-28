import express from 'express';
import {
  getAllQuotes,
  createQuote,
  updateQuote,
  deleteQuote
} from '../controllers/usersControllers.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Quotes
 *   description: API para gestionar frases de películas
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todas las citas no eliminadas
 *     tags: [Quotes]
 *     responses:
 *       200:
 *         description: Lista de citas obtenidas exitosamente
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
 *         description: Error interno del servidor
 */
router.get('/', getAllQuotes);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear una nueva cita
 *     tags: [Quotes]
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
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', createQuote);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar una cita existente
 *     tags: [Quotes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la cita a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movie:
 *                 type: string
 *               quote:
 *                 type: string
 *               character:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cita actualizada exitosamente
 *       404:
 *         description: Cita no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', updateQuote);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Eliminación lógica de una cita por ID
 *     tags: [Quotes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la cita a eliminar
 *     responses:
 *       200:
 *         description: Cita marcada como eliminada
 *       404:
 *         description: Cita no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', deleteQuote);


export default router;
