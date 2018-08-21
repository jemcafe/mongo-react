const express = require('express');
const router = express.Router(); // handles routes
const mongoose = require('mongoose');

// Model
const Product = require('../models/product');

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET request to /products'
  });
});

router.post('/', (req, res, next) => {
  // const product = {
  //   name: req.body.name,
  //   price: req.body.price
  // };

  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });

  // A method for mogoose models for saving data to database
  product.save()
    .then(results => {
      console.log('Results', results);
      res.status(200).json({
        message: 'Handling POST request to /products',
        product: product
      });
    }).catch(err => {
      console.log(err)
      res.status(500).json({error: err});
    });
});

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;

  // Using exec() returns a real promise, so .then() can be used.
  Product.findById(id)
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({message: 'No valid entry found'});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });

  // res.status(200).json({
  //   message: 'Handling GET request to /products for a product',
  //   id: req.params.productId
  // });
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