import express from 'express';
import { getProductsByStore } from '../controllers/product.controller.js';
const router = express.Router();

router.get('/:storeId', getProductsByStore); // GET /api/products/:storeId

export default router;