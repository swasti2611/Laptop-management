const Issue = require("../Model/Issues")
const Employee = require("../Model/Employees")  // Assuming you have an Employee model

// Controller to report an issue
const reportIssue = async (req, res) => {
    try {
      const { userId } = req.user;  // Extract userId from the request object
  
      // Find the employee who reported the issue
      const employee = await Employee.findById(userId);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      // Extract data from the request body
      const { laptopId, description, priority, status } = req.body;
      console.log(description);
      
      // Create a new issue
      const newIssue = new Issue({
        laptopId,
        description,
        priority,
        status,
        reportedBy: employee._id,  // Employee who reported the issue
        reportedAt: Date.now(),
      });
  
      // Save the new issue in the database
      await newIssue.save();
  
      // Send a success response
      res.status(201).json({
        success: true,
        message: "Issue reported successfully",
        issue: newIssue,
      });
    } catch (error) {
      console.error("Error reporting issue:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
module.exports = { reportIssue };
