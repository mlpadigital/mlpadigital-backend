import { verifyToken } from "../utils/jwt.js";

/**
 * Middleware para proteger rutas privadas con JWT
 * Extrae el token del header Authorization y lo verifica
 */
export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token faltante o mal formado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("❌ Error al verificar token:", error.message);
    res.status(401).json({ error: "Token inválido o expirado" });
  }
};