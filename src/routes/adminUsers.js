
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Asegurate de tener este modelo

router.get('/admin/users', async (req, res) => {
  try {
    const users = await User.find({}, 'name email plan_status active');
    res.json(users);
  } catch (err) {
    console.error('Error al obtener usuarios:', err);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

module.exports = router;