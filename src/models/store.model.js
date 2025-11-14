import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  slug: { type: String, required: true, unique: true },
  settings: Object,
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.model('Store', storeSchema);