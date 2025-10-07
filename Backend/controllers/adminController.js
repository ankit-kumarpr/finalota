const Admin = require('../models/Admin');
const HotelOwner = require('../models/HotelOwner');
const jwt = require('jsonwebtoken');

// Admin auto-register API
exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const admin = new Admin({ name, email, phone, password });
    await admin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Hotel owner register
exports.registerHotelOwner = async (req, res) => {
  try {
    const { name, email, phone, password, hotelName } = req.body;
    const hotelOwner = new HotelOwner({ name, email, phone, password });
    await hotelOwner.save();
    res.status(201).json({ message: 'Hotel owner registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login for both admin and hotel owner
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await Admin.findOne({ email });
    let role = 'admin';
    if (!user) {
      user = await HotelOwner.findOne({ email });
      role = 'hotelowner';
    }
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ token, role, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
