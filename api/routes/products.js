const express = require('express');
const router = express.Router(); // handles routes

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET request to /products'
  });
});

router.post('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling POST request to /products'
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