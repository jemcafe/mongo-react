const express = require('express');
const app = express();
const morgan = require('morgan');  // Middlemare for logging requests
const bodyParser = require('body-parser');

// Api routes
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use(morgan('dev'));                            // 'dev' is for the form of the output.
app.use(bodyParser.urlencoded({extended: false})); // Parses urlencoded data.
app.use(bodyParser.json());                        // Parses json data. Needed for request bodies.

// CORS (Cross-Origin Resource Sharing) - preventing cors errors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');  // Allows clients access. Here, all are allowed.
  res.header(                                      // Allows certain headers to be accepted.
    'Access-Control-Allow-Headers',
    'Origin, X-Requeste-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();  // Without next the access is blocked
});

// Routes for handling requests (route does not need the main endpoint name at the beginning)
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Error handling
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res,next) => {
  res.status(error.status || 500)
  res.json({
    error: { message: error.message }
  });
});

module.exports = app;