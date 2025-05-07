const express = require('express');
const { addToCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', authMiddleware, addToCart);

module.exports = router;
