// src/models/client.model.js
import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Formato de email inválido"],
    },

    tienda: { type: String, required: true },

    tipo: {
      type: String,
      enum: ["Emprendedor", "Escalable", "Reseller PRO"],
      required: true,
    },

    plan_status: {
      type: String,
      enum: ["activo", "pendiente", "bloqueado"],
      default: "activo",
    },

    estado_pago: {
      type: String,
      enum: ["pagado", "pendiente"],
      default: "pagado",
    },

    fecha_inicio: {
      type: Date,
      default: Date.now,
    },

    proximo_pago: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Client", clientSchema);