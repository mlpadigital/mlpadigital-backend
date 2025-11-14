import Client from '../models/client.model.js';

export const crearClienteTrasPago = async (req, res) => {
  try {
    const { name, email, tienda, tipo, frecuencia, moneda } = req.body;

    // Verificar si ya existe un cliente con ese email y tienda
    const existe = await Client.findOne({ email, tienda });
    if (existe) {
      return res.status(200).json({ message: 'Cliente ya registrado', cliente: existe });
    }

    const fechaInicio = new Date();
    const proximoPago = new Date(fechaInicio);

    // Calcular días según frecuencia
    const dias = frecuencia === 'mensual' ? 30
               : frecuencia === 'trimestral' ? 90
               : frecuencia === 'anual' ? 365
               : 30;

    proximoPago.setDate(proximoPago.getDate() + dias);

    const nuevoCliente = new Client({
      name,
      email,
      tienda,
      tipo,
      frecuencia,
      moneda,
      plan_status: 'activo',
      estado_pago: 'pagado',
      fecha_inicio: fechaInicio,
      proximo_pago: proximoPago,
    });

    await nuevoCliente.save();
    res.status(201).json({ success: true, cliente: nuevoCliente });
  } catch (error) {
    console.error('Error al guardar cliente:', error);
    res.status(500).json({ success: false, error: 'No se pudo guardar el cliente' });
  }
};