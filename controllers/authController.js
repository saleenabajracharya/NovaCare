const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByEmail, createUser } = require('../models/userModel');

exports.register = async (req, res) => {
  const { fullName, email, password, role, specialist } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(fullName, email, hashedPassword, role, specialist);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
        console.error('Error during registration:', err);
    res.status(500).json({ message: 'Database error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION
    });

    res.status(200).json({ user: { id: user.id, fullName: user.fullName, email: user.email }, token });
  } catch (err) {

    res.status(500).json({ message: 'Database error' });
  }
};
