const Cart = require('../models/Cart');
const Book = require('../models/Book');

// Add to cart
const addToCart = async (req, res) => {
  const { bookId, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    if (cart) {
      const bookIndex = cart.items.findIndex((item) => item.bookId.toString() === bookId);
      if (bookIndex >= 0) {
        cart.items[bookIndex].quantity += quantity; // Update quantity
      } else {
        cart.items.push({ bookId, quantity }); // Add new item
      }

      await cart.save();
    } else {
      const newCart = new Cart({
        userId: req.user.id,
        items: [{ bookId, quantity }],
      });
      await newCart.save();
    }

    res.status(200).json({ message: 'Added to cart' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding to cart' });
  }
};

module.exports = { addToCart };
