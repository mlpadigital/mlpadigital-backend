import { Router } from "express";
import { Client } from "../models/client.model.js";

const router = Router();

router.post("/crear", async (req, res) => {
  try {
    const nuevoCliente = new Client(req.body);
    await nuevoCliente.save();
    res.status(201).json({ mensaje: "Cliente creado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al crear cliente" });
  }
});

export default router;