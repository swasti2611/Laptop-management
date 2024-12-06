const jwt = require('jsonwebtoken');
const Employee = require("../Model/Employees");

// Define a secret key
const secretKey = 'your-default-secret-key';  // Use a consistent secret key

// Middleware to check if user is authenticated
const isAuthenticated = async (req, res, next) => {
  // Log all incoming headers to check if Authorization is included
  console.log("Request Headers:", req.headers);

  const token = req.header('Authorization')?.split(' ')[1]; // Get token after "Bearer"
  console.log("Token:", token);

  if (!token) {
    return res.status(401).json({ message: "No token provided, access denied" });
  }

  try {
    const decoded = jwt.verify(token, secretKey); // Verify token using the secret key
    console.log("Decoded:", decoded);
    req.user = decoded; // Store user info in request object
    next(); // Continue to the next middleware/route handler
  } catch (err) {
    console.error("JWT Verification Error:", err); // Log the error for debugging
    res.status(400).json({ message: "Invalid token" });
  }
};


// Middleware to check if user is an employee
const isEmployee = async (req, res, next) => {
  if (req.user.Role === 'user') {
    return next(); // Allow access to employee
  } else {
    return res.status(403).json({ message: "Access denied. You must be an employee." });
  }
};

// Middleware to check if user is an admin
const isAdmin = async (req, res, next) => {
    console.log(req.user);
    
  if (req.user.Role === 'admin') {
    return next(); // Allow access to admin
  } else {
    return res.status(403).json({ message: "Access denied. You must be an admin." });
  }
};

module.exports = { isAuthenticated, isEmployee, isAdmin };
