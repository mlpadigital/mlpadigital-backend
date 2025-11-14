// services/openai.js
import dotenv from 'dotenv';
import { OpenAI } from 'openai';


dotenv.config(); // ✅ Cargás las variables de entorno

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // ✅ esto debe tener valor
});


export async function generateAIResponse(history, store) {
  const messages = history.map(msg => ({
    role: msg.role,
    content: msg.content,
  }));

  const systemPrompt = `Eres un asistente virtual para la tienda "${store.name}". Ayuda a los clientes con dudas sobre productos, envíos y promociones.`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'system', content: systemPrompt }, ...messages],
  });

  return completion.choices[0].message.content;
}