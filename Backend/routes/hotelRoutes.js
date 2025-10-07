const express = require('express');
const router = express.Router();
const { registerHotel, reviewHotel, getAllHotels,getPendingHotels } = require('../controllers/hotelController');
const { authenticate, authorize } = require('../middlewares/auth');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.post('/add', authenticate, authorize('hotelowner'), upload.single('image'), registerHotel);
router.patch('/review/:hotelId', authenticate, authorize('admin'), reviewHotel);
router.get('/all', authenticate, authorize('admin'), getAllHotels);
// Add this line for pending hotels
router.get('/pending', authenticate, authorize('admin'), getPendingHotels);


module.exports = router;
