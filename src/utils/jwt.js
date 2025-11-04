// src/utils/jwt.js
/* eslint-env node */
import jwt from "jsonwebtoken";

/**
 * Genera un token JWT válido por 7 días
 * @param {Object} user - Objeto de usuario con _id y email
 * @returns {string} token firmado
 */
export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

/**
 * Verifica y decodifica un token JWT
 * @param {string} token - Token JWT recibido en el header Authorization
 * @returns {Object} payload decodificado
 */
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};