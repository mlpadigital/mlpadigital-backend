// src/controllers/ai.controller.js
import { generateDescriptionFromPrompt } from '../services/openai.js';

export const generateDescription = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt inválido' });
    }

    const text = await generateDescriptionFromPrompt(prompt);

    res.json({ text });
  } catch (err) {
    console.error('❌ Error en /ai/description:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};