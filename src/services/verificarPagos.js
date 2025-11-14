import cron from 'node-cron';
import Client from '../models/Client.js';

cron.schedule('0 0 * * *', async () => {
  const hoy = new Date();

  const clientes = await Client.find({ plan_status: 'activo' });

  for (const cliente of clientes) {
    if (hoy > cliente.proximo_pago && cliente.estado_pago !== 'pagado') {
      cliente.plan_status = 'pendiente';
      await cliente.save();
      console.log(`⚠️ Cliente pendiente: ${cliente.email}`);
    }

    const fechaLimite = new Date(cliente.proximo_pago);
    fechaLimite.setDate(fechaLimite.getDate() + 5);

    if (hoy > fechaLimite && cliente.estado_pago !== 'pagado') {
      cliente.plan_status = 'bloqueado';
      await cliente.save();
      console.log(`⛔ Cliente bloqueado: ${cliente.email}`);
    }
  }
});