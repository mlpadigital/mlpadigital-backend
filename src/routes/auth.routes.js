// src/routes/auth.routes.js
import express from "express";
import { login, register, session } from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Registra un nuevo usuario
 * @access  Público
 */
router.post("/register", register);

/**
 * @route   POST /api/auth/login
 * @desc    Inicia sesión y devuelve el token JWT
 * @access  Público
 */
router.post("/login", login);

/**
 * @route   GET /api/auth/session
 * @desc    Devuelve los datos del usuario autenticado
 * @access  Privado (requiere token JWT)
 */
router.get("/session", requireAuth, session);

export default router;