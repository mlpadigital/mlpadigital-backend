//src/routes/test.js
import express from 'express';
import User from '../models/user.model.js';

const router = express.Router();

router.post('/create-user', async (req, res) => {
  const nuevo = await User.create({
    email: 'test@mlpgdigital.com',
    password: '123456',
    nombre: 'Martín',
    tienda: 'mlpgdigital',
    tipo: 'Emprendedor',
  });
  res.json(nuevo);
});