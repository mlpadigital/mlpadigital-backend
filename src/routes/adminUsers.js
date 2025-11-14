// src/routes/adminUsers.js
import { Router } from 'express';
import User from '../models/User.js'; // ✅ asegurate que también sea ESM

const router = Router();

router.get('/admin/users', async (req, res) => {
  try {
    const users = await User.find({}, 'name email plan_status active');
    res.json(users);
  } catch (err) {
    console.error('❌ Error al obtener usuarios:', err.message);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

export default router;