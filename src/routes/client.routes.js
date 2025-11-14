import { Router } from 'express';
import Client from '../models/client.model.js';

const router = Router();

// Crear cliente
router.post('/crear', async (req, res) => {
  try {
    const {
      nombre,
      email,
      tienda,
      tipo,
      frecuencia,
      moneda,
      pais,
      telefono
    } = req.body;

    if (!nombre || !email || !tienda || !tipo || !frecuencia || !moneda || !pais || !telefono) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const existe = await Client.findOne({ email, tienda });
    if (existe) {
      return res.status(409).json({ error: 'El cliente ya existe', cliente: existe });
    }

    const fecha_inicio = new Date();
    const proximo_pago = new Date(fecha_inicio);
    const dias = frecuencia === 'mensual' ? 30
               : frecuencia === 'trimestral' ? 90
               : frecuencia === 'anual' ? 365
               : 30;
    proximo_pago.setDate(proximo_pago.getDate() + dias);

    const nuevoCliente = new Client({
      nombre,
      email,
      tienda,
      tipo,
      frecuencia,
      moneda,
      pais,
      telefono,
      estado_pago: 'pagado',
      plan_status: 'activo',
      fecha_inicio,
      proximo_pago,
    });

    await nuevoCliente.save();
    res.status(201).json({ mensaje: 'Cliente creado correctamente', cliente: nuevoCliente });
  } catch (err) {
    console.error('❌ Error al crear cliente:', err.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Listar todos los clientes
router.get('/listar', async (req, res) => {
  try {
    const clientes = await Client.find().sort({ proximo_pago: 1 });
    res.json(clientes);
  } catch (err) {
    console.error('❌ Error al listar clientes:', err.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;