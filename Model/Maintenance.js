const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema({
  laptopId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Laptop", 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ["pending", "completed"], 
    default: "pending", 
    required: true 
  },
  cost: { 
    type: Number, 
    default: 0 
  },
  loggedAt: { 
    type: Date, 
    default: Date.now, 
    required: true 
  },
});

module.exports = mongoose.model("Maintenance", maintenanceSchema);
