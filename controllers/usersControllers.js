import {
  getAllQuotes as serviceGetAllQuotes,
  createQuote as serviceCreateQuote,
  updateQuote as serviceUpdateQuote,
  deleteQuote as serviceDeleteQuote,
} from '../services/usersService.js';

// Obtener todas las citas
export const getAllQuotes = async (req, res) => {
  try {
    const quotes = await serviceGetAllQuotes();
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear una nueva cita
export const createQuote = async (req, res) => {
  const { movie, quote, character } = req.body;
  if (!movie || !quote || !character) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  try {
    const result = await serviceCreateQuote(movie, quote, character);
    res.status(201).json({ message: 'Cita creada exitosamente', quoteId: result.ID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const updateQuote = async (req, res) => {
  const { quote } = req.body;
  const { ID } = req.params;
  
  if (!quote) {
    return res.status(400).json({ error: 'Falta el nuevo texto de la cita' });
  }
  
  try {
    // PARSEAR AQUÍ, antes de enviar al servicio
    const parsedID = parseInt(ID);
    if (isNaN(parsedID)) {
      return res.status(400).json({ error: 'ID debe ser un número válido' });
    }
    
    const changes = await serviceUpdateQuote(parsedID, quote); // Enviar el int
    if (!changes) {
      return res.status(404).json({ message: 'No se encontró una cita con ese ID' });
    }
    res.status(200).json({ message: 'Cita actualizada exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteQuote = async (req, res) => {
  const { ID } = req.params;
  
  try {
    // PARSEAR AQUÍ, antes de enviar al servicio
    const parsedID = parseInt(ID);
    if (isNaN(parsedID)) {
      return res.status(400).json({ error: 'ID debe ser un número válido' });
    }
    
    const changes = await serviceDeleteQuote(parsedID); // Enviar el int
    if (!changes) {
      return res.status(404).json({ message: 'No se encontró ninguna cita con ese ID' });
    }
    res.status(200).json({ message: 'Cita eliminada lógicamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};