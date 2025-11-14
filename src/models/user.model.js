


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Formato de email inválido'],
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
      minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    },
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
    },
    tienda: {
      type: String,
      required: [true, 'El nombre de la tienda es obligatorio'],
    },
    tipo: {
      type: String,
      enum: ['Emprendedor', 'Escalable', 'Reseller PRO'],
      required: [true, 'El tipo de cliente es obligatorio'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);