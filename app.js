const express = require('express');
const app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// app.use((req, res, next) => {
//   res.status(200).json({
//     message: 'It works!'
//   });
// });

// The product routes do not need '/products' at the beginning of the endpoint name
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

module.exports = app;