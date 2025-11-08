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
      match: [/^\S+@\S+\.\S+$/, "Formato de email inválido"]
    },
    tienda: { type: String, required: true },
    tipo: {
      type: String,
      enum: ["Emprendedor", "Escalable", "Reseller PRO"],
      required: true
    }
  },
  { timestamps: true }
);

export const Client = mongoose.model("Client", clientSchema);