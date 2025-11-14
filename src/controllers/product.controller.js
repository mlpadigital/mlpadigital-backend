import Product from '../models/product.model.js';

export const getProductsByStore = async (req, res) => {
  const { storeId } = req.params;
  const products = await Product.find({ storeId });
  res.json(products);
};