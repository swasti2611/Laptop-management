const mongoose = require('mongoose');

const laptopSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  serialNumber: { type: String, unique: true, required: true },
  status: { type: String, enum: ['available', 'assigned', 'maintenance'], required: true },
  purchaseDate: { type: Date, required: true },
  image: { type: String, required: false }, // Store image path
});

module.exports = mongoose.model("Laptop", laptopSchema);
