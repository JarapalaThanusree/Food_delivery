const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  order_data: [{
    type: Schema.Types.Mixed // Use Mixed type for flexible array elements 
  }]
});

module.exports = mongoose.model('Order', OrderSchema);
