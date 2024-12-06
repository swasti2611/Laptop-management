const Laptop = require("../Model/laptops");
const Employee = require("../Model/Employees");
const Assignment = require("../Model/Assignment");

const assignLaptop = async (req, res) => {
  const { Email, laptopId } = req.body;

  // Validate input
  if (!Email || !laptopId) {
    return res.status(400).json({ message: "Email and Laptop ID are required" });
  }

  // Find employee and laptop
  const employee = await Employee.findOne({ Email });
  if (!employee) return res.status(404).json({ message: "Employee not found" });

  const laptop = await Laptop.findById(laptopId);
  if (!laptop) return res.status(404).json({ message: "Laptop not found" });
    console.log("**************",laptop);
    
  // Create assignment
  const newAssignment = new Assignment({
    laptopId,
    employeeId: employee._id,
  });

  await newAssignment.save();
  res.status(201).json({ message: "Laptop assigned successfully", newAssignment });
};





const fetchAssignedLaptops = async (req, res) => {
  const { employeeId } = req.params;
  console.log("Employee ID from request:", employeeId); // Log incoming employeeId

  try {
    if (!employeeId) {
      return res.status(400).json({ success: false, message: "Employee ID is required" });
    }

    const assignments = await Assignment.find({ employeeId }).populate("laptopId");
    console.log("Assignments fetched:", assignments); // Log assignments to see if they're fetched


    if (!assignments.length) {
      return res.status(404).json({ success: false, message: "No laptops assigned to this employee" });
    }


  
    const laptops = assignments.map((assignment) => ({
      assignmentId: assignment._id,
      laptopId: assignment.laptopId._id,
      brand: assignment.laptopId.brand,
      model: assignment.laptopId.model,
      serialNumber: assignment.laptopId.serialNumber,
      condition: assignment.laptopId.condition,
      image:assignment.laptopId.image,
    }));

    return res.status(200).json({ success: true, data: laptops });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


  

module.exports = { assignLaptop,fetchAssignedLaptops };
