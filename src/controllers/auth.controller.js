// src/controllers/auth.controller.js
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/jwt.js";

/**
 * @route   POST /api/auth/register
 * @desc    Registra un nuevo usuario y devuelve token
 * @access  Público
 */
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: "Usuario ya existe" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });

    const token = generateToken(user);
    console.log("✅ Token generado:", token);

    res.status(201).json({ user, token });
  } catch (err) {
    console.error("❌ Error en registro:", err.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/**
 * @route   POST /api/auth/login
 * @desc    Inicia sesión y devuelve token
 * @access  Público
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Contraseña incorrecta" });

    const token = generateToken(user);
    console.log("✅ Token generado:", token);

    res.status(200).json({ user, token });
  } catch (err) {
    console.error("❌ Error en login:", err.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/**
 * @route   GET /api/auth/session
 * @desc    Devuelve los datos del usuario autenticado
 * @access  Privado (requiere token JWT)
 */
export const session = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Token inválido o ausente" });
    res.status(200).json({ user: req.user });
  } catch (err) {
    console.error("❌ Error en sesión:", err.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};