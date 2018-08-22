const mongoose = require('mongoose');

productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,  // Serial id
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // references Product
  quantity: { type: Number, default: 1 }  // default value is 1
});

module.exports = mongoose.model('Order', productSchema);