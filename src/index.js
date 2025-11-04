// backend/src/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 🛡️ Middlewares
app.use(cors());
app.use(express.json());

// 🔐 Rutas protegidas y públicas
app.use("/api/auth", authRoutes);     // Registro y login
app.use("/api/user", userRoutes);     // Perfil del usuario (requiere token)

// 🔗 Conexión a MongoDB
connectDB();

// 🚀 Arranque del servidor
app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
});