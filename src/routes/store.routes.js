import express from 'express';
import { getStoreBySlug } from '../controllers/store.controller.js';
const router = express.Router();

router.get('/settings/:slug', getStoreBySlug); // GET /api/store/settings/:slug

export default router;