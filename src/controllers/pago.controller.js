import mercadopago from 'mercadopago';
mercadopago.configure({ access_token: process.env.MP_ACCESS_TOKEN });

export const crearPreferencia = async (req, res) => {
  const { nombre, email, tienda, tipo, frecuencia, moneda } = req.body;

  const precios = {
    mensual: { ars: 9000, usd: 10, eur: 10 },
    trimestral: { ars: 25000, usd: 27, eur: 27 },
    anual: { ars: 95000, usd: 100, eur: 100 },
  };

  const monto = precios[frecuencia]?.[moneda] || 0;

  const preference = {
    items: [{
      title: `Plan ${tipo} (${frecuencia})`,
      quantity: 1,
      unit_price: monto,
      currency_id: moneda.toUpperCase(),
    }],
    payer: { email },
    back_urls: {
      success: `https://mlpadigital.com/success?email=${email}&tipo=${tipo}&tienda=${tienda}&nombre=${nombre}&frecuencia=${frecuencia}&moneda=${moneda}`,
      failure: `https://mlpadigital.com/failure`,
    },
    auto_return: 'approved',
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    res.json({ init_point: response.body.init_point });
  } catch (error) {
    console.error('Error al crear preferencia de pago:', error);
    res.status(500).json({ error: 'No se pudo generar la preferencia de pago' });
  }
};