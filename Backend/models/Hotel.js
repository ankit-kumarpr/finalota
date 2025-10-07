const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'HotelOwner', required: true },
  hotelName: { type: String, required: true },
  GST: { type: String, required: true },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    landmark: String,
  },
  image: { type: String }, // store path or URL
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  rejectionNote: { type: String },
});

module.exports = mongoose.model('Hotel', hotelSchema);
