// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js'; // ✅ Importás la función

// Importás las rutas
import userRoutes from './src/routes/user.routes.js';
import clientRoutes from './src/routes/client.routes.js';
import adminisUsersRouter from './src/routes/adminUsers.js';
import chatRoutes from './src/routes/chat.js';
import './src/services/verificarPagos.js';

dotenv.config(); // ✅ Cargás las variables de entorno

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`📥 ${req.method} ${req.url}`);
    next();
  });
}

// Rutas
app.use('/api', adminisUsersRouter);
app.use('/api/user', userRoutes);
app.use('/api/clientes', clientRoutes);
app.use('/api/chat', chatRoutes);

// Conectás a MongoDB y luego levantás el servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
});