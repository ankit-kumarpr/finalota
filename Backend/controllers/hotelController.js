const Hotel = require('../models/Hotel');
const HotelOwner = require('../models/HotelOwner');
const sendEmail = require('../utils/sendEmail');

// Register hotel
exports.registerHotel = async (req, res) => {
  try {
    const { hotelName, GST, street, city, state, pincode, landmark } = req.body;
    const ownerId = req.user.id;

    if (!req.file) return res.status(400).json({ error: 'Hotel image is required' });
    if (req.file.size > 1 * 1024 * 1024) return res.status(400).json({ error: 'Image must be <1MB' });

    const hotel = new Hotel({
      owner: ownerId,
      hotelName,
      GST,
      address: { street, city, state, pincode, landmark },
      image: req.file.path,
    });

    await hotel.save();

    res.status(201).json({ message: 'Hotel registered successfully and pending approval' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin approve/reject hotel
exports.reviewHotel = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const { status, rejectionNote } = req.body;

    const hotel = await Hotel.findById(hotelId).populate('owner');
    if (!hotel) return res.status(404).json({ error: 'Hotel not found' });

    hotel.status = status;
    hotel.rejectionNote = rejectionNote || '';
    await hotel.save();

    // Send email
    if (status === 'approved') {
      await sendEmail(hotel.owner.email, 'Hotel Approved', 'Your hotel has been approved by admin.');
    } else if (status === 'rejected') {
      await sendEmail(hotel.owner.email, 'Hotel Rejected', `Your hotel was rejected. Note: ${rejectionNote}`);
    }

    res.status(200).json({ message: `Hotel ${status}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin view all hotels
exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().populate('owner', 'name email phone');
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Admin view hotels pending approval
exports.getPendingHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({ status: 'pending' }).populate('owner', 'name email phone');
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

