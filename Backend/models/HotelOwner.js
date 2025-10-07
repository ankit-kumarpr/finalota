const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const hotelOwnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  hotelName: { type: String, required: true },
  hotelRegistered: { type: Boolean, default: false },
});

hotelOwnerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

hotelOwnerSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('HotelOwner', hotelOwnerSchema);
