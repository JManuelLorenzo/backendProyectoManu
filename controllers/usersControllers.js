import {
  getAllQuotes as serviceGetAllQuotes,
  createQuote as serviceCreateQuote,
  updateQuote as serviceUpdateQuote,
  deleteQuote as serviceDeleteQuote
} from '../services/usersService.js';

export const getAllQuotes = async (req, res) => {
  try {
    const rows = await serviceGetAllQuotes();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createQuote = async (req, res) => {
  const { movie, quote, character } = req.body;
  if (!movie || !quote || !character) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  try {
    const result = await serviceCreateQuote(movie, quote, character);
    res.status(201).json({ message: 'Cita creada exitosamente', quoteId: result.lastID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateQuote = async (req, res) => {
  const { quote } = req.body;
  const { id } = req.params;
  if (!quote) {
    return res.status(400).json({ error: 'Falta el nuevo texto de la cita' });
  }
  try {
    const changes = await serviceUpdateQuote(id, quote);
    if (changes === 0) {
      return res.status(404).json({ message: 'No se encontró una cita con ese ID' });
    }
    res.status(200).json({ message: 'Cita actualizada exitosamente', updatedRows: changes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteQuote = async (req, res) => {
  const { id } = req.params; // id viene en la URL ahora

  if (!id) {
    return res.status(400).json({ error: 'Falta el ID de la cita a eliminar' });
  }

  try {
    const changes = await serviceDeleteQuote(id);
    if (changes === 0) {
      return res.status(404).json({ message: 'No se encontró ninguna cita para eliminar' });
    }
    res.status(200).json({ message: 'Cita eliminada lógicamente', affectedRows: changes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

