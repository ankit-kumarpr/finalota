const express = require('express');
const router = express.Router();
const { registerAdmin, registerHotelOwner, login } = require('../controllers/authController');

router.post('/admin/register', registerAdmin);
router.post('/hotelowner/register', registerHotelOwner);
router.post('/login', login);

module.exports = router;
