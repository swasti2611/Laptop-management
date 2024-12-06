const Laptop = require("../Model/laptops");
const Employee = require("../Model/Employees");
const Assignment = require("../Model/Assignment");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Define a secret key
const secretKey = 'your-secret-key';  // Use a consistent secret key

// Add Employee Controller
const addEmployee = async (req, res) => {
  const { Name, LastName, Email, Password, ConfirmPassword, Department, Role } = req.body;
   console.log(Name,LastName,Email,Password,Role,Department);
   
  // Input validation
  if (!Name || !LastName || !Email || !Password || !ConfirmPassword || !Department) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  // Check if password and confirm password match
  if (Password !== ConfirmPassword) {
    return res.status(400).json({ success: false, message: "Passwords do not match" });
  }

  const assignedRole = Role || "user"; // Assign default role if not provided

  try {
    // Check if the email is already in use
    const existingEmployee = await Employee.findOne({ Email });
    if (existingEmployee) {
      return res.status(400).json({ success: false, message: "Email is already registered" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    // Create a new employee
    const newEmployee = new Employee({
      Name,
      LastName,
      Email,
      Password: hashedPassword,
      Department,
      Role: assignedRole, // Use assigned role
    });

    // Save the employee to the database
    await newEmployee.save();

    res.status(201).json({
      success: true,
      message: "Employee added successfully",
      employee: {
        Name: newEmployee.Name,
        LastName: newEmployee.LastName,
        Email: newEmployee.Email,
        Department: newEmployee.Department,
        Role: newEmployee.Role,
      },
    });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the employee",
    });
  }
};



const login = async (req, res) => {
  const { Email, Password } = req.body;

  // Validate input fields
  if (!Email || !Password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }

  try {
    // Check if the employee exists
    const employee = await Employee.findOne({ Email });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(Password, employee.Password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const secretKey = 'your-default-secret-key';  // Ensure secret key is available

    const token = jwt.sign(
      { id: employee._id, Role: employee.Role }, // Payload: id and Role
      secretKey,                                // Secret key
      { expiresIn: '4h' }                       // Token expiry time
    );

    // Log the token to check if it's generated correctly
    console.log('Generated token:', token);

    // Send response with user details and token
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: employee._id,
        name: employee.Name, // Assuming the employee model has a Name field
        role: employee.Role, // Assuming the employee model has a Role field
      }
    });
  } catch (err) {
    console.error("Error during login:", err); // Log error for debugging
    res.status(500).json({ message: "Server error" });
  }
};



// Get All Employees Controller
const getAllEmployee = async (req, res) => {
  try {
    let allEmployee = await Employee.find({});
    res.status(200).json({ message: "Successfully fetched employees", allEmployee });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching the employees",
    });
  }
};

// Assign Laptop Controller


module.exports = { getAllEmployee, login, addEmployee };
