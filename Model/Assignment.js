// models/Assignment.js
const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  laptopId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Laptop", 
    required: true 
  },
  employeeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Employee", 
    required: true 
  },
  
});

module.exports = mongoose.model("Assignment", assignmentSchema);
