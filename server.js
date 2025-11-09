//src/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './src/routes/user.routes.js';
import clientRoutes from './src/routes/client.routes.js';
import adminisUsersRouter from './src/routes/adminUsers.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
// Middleware
app.use('/api', adminisUsersRouter);
app.use(cors());
app.use(express.json());
// BONUS: Logger solo en desarrollo
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`📥 ${req.method} ${req.url}`);
    next();
  });
}

app.use('/api/user', userRoutes);
app.use('/api/clientes', clientRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error de conexión a MongoDB:', err);
  });
  