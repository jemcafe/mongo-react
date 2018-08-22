const express = require('express');
const app = express();
const morgan = require('morgan');                  // Middlemare for logging requests
const bodyParser = require('body-parser');         // Middleware for parsing data
const mongoose = require('mongoose');              // 
require('dotenv').config();

// Api routes
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// Database
mongoose.connect(
  "mongodb://nd-md-ms:" + process.env.MONGO_ATLAS_PWD + "@node-mongo-shop-shard-00-00-6ii82.mongodb.net:27017,node-mongo-shop-shard-00-01-6ii82.mongodb.net:27017,node-mongo-shop-shard-00-02-6ii82.mongodb.net:27017/test?ssl=true&replicaSet=node-mongo-shop-shard-0&authSource=admin&retryWrites=true",
  { useNewUrlParser: true }
);

// Middleware
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
    res.header(                                    // The methods allowed
      'Access-Control-Allow-Methods', 
      'PUT, POST, PATCH, DELETE, GET'
    );
    return res.status(200).json({});
  }
  next();                                          // Without next, access is blocked
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

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: { message: error.message }
  });
});

module.exports = app;