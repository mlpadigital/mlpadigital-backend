//src/routes/chat.js
import express from 'express';
import { handleSupportChat } from '../controllers/chat.controller.js';

const router = express.Router();

router.post('/support', handleSupportChat); // POST /api/chat/support

export default router;