const express = require('express');
const app = express();
const morgan = require('morgan'); // Middlemare for logging requests

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// app.use((req, res, next) => {
//   res.status(200).json({
//     message: 'It works!'
//   });
// });

app.use(morgan('dev')); // 'dev' is for the form of the output

// Each route does not need the main endpoint name at the beginning
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


// Handle errors
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res,next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;