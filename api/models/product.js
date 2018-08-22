const mongoose = require('mongoose');

productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,  // Serial id
  name: { type: String, require: true },
  price: { type: Number, required: true }  // Can also be a number string
});

module.exports = mongoose.model('Product', productSchema);