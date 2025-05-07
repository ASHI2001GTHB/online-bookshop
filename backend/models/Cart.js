const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
      quantity: { type: Number, required: true },
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
