// src/routes/user.routes.js
import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

/**
 * @route   GET /api/user/profile
 * @desc    Devuelve el perfil del usuario autenticado
 * @access  Privado (requiere token JWT)
 */
router.get("/profile", requireAuth, (req, res) => {
  res.status(200).json({
    email: req.user.email,
    _id: req.user.id
  });
});

export default router;