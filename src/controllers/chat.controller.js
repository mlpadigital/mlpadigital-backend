// src/controllers/chat.controller.js
import { generateAIResponse } from '../services/openai.js';
import Store from '../models/Store.model.js';
import ChatLog from '../models/ChatLog.js';

export const handleSupportChat = async (req, res) => {
  try {
    const { history, storeId } = req.body;

    if (!storeId || !Array.isArray(history)) {
      return res.status(400).json({ error: 'Datos inválidos' });
    }

    const store = await Store.findOne({ slug: storeId });
    if (!store || !store.supportEnabled) {
      return res.status(403).json({ error: 'Soporte no habilitado para esta tienda' });
    }

    const reply = await generateAIResponse(history, store);

    await ChatLog.create({
      storeSlug: store.slug,
      history,
      reply,
    });

    res.json({ reply });
  } catch (err) {
    console.error('Error en /chat/support:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};