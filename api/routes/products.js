const express = require('express');
const router = express.Router(); // handles routes

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET request to /products'
  });
});

router.post('/', (req, res, next) => {
  const product = {
    name: req.body.name,
    price: req.body.price
  };
  res.status(200).json({
    message: 'Handling POST request to /products',
    product: product
  });
});

router.get('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET request to /products for a product',
    id: req.params.productId
  });
});

router.patch('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'Product updated!',
    id: req.params.productId
  });
});

router.delete('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'Product deleted!',
    id: req.params.productId
  });
});

module.exports = router;