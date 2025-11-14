import mongoose from 'mongoose';

const chatLogSchema = new mongoose.Schema({
  storeSlug: String,
  history: Array,
  reply: String,
}, { timestamps: true });

export default mongoose.model('ChatLog', chatLogSchema);