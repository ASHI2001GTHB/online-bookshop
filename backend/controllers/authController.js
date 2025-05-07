const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

// Register a new user
const registerUser = async (req, res) => {
  const { email, password, username } = req.body;

  // Input validation (simple check)
  if (!email || !password || !username) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const user = new User({
      email,
      password: hashedPassword,
      username,
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while registering user' });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials2' });
    }

    // Debugging: Check if password comparison is being executed correctly
    console.log('Comparing passwords:', password, user.password); // Log the entered and stored password

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Password comparison failed');
      return res.status(400).json({ message: 'Invalid credentials1' });
    }

    // Proceed to generate the token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during login' });
  }
};

module.exports = { registerUser, loginUser };
