const express = require('express');
const ProductService = require('../Services/ProductService');


const productRouter = express.Router();

// This becomes the file with all your product routes:
productRouter.get('/get-products', async (req, res, next) => {

  return ProductService.getProducts(req, res, next);
});

module.exports = productRouter;