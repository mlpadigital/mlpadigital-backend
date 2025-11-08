import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
//Rutas
import userRoutes from './routes/user.routes.js';
import clientRoutes from './routes/client.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());
// BONUS: Logger solo en desarrollo
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`📥 ${req.method} ${req.url}`);
    next();
  });
}


// Rutas
app.use('/api/user', userRoutes);       // rutas protegidas y login
app.use('/api/clientes', clientRoutes); // formulario de creación de cliente

// Conexión a MongoDB
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
  app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url}`);
  next();
});