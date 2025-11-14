import Store from '../models/store.model.js';

export const getStoreBySlug = async (req, res) => {
  const { slug } = req.params;
  const store = await Store.findOne({ slug });
  if (!store) return res.status(404).json({ error: 'Tienda no encontrada' });
  res.json(store);
};