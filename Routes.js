const express = require('express');
let Route = express.Router();

const { getAllLaptops, addLaptop, deleteLaptop, updateLaptop} = require('./controllers/Laptop');
const {  getAllEmployee, login, addEmployee } = require("./controllers/Employee");
const {addMaintenanceLog,maintenanceHistory}=require("./controllers/Maintenance");
const {assignLaptop}=require("./controllers/AssignLaptop");
const {upload}=require("./controllers/upload")
// Import Middlewares
const { isAuthenticated, isEmployee, isAdmin } = require("./middleware/Auth");
const {fetchAssignedLaptops}=require("./controllers/AssignLaptop");
const { getLaptopCountByStatus } = require('./controllers/getLaptopCountByStatus');
const {reportIssue}=require("./controllers/Isssue")
// Laptops Routes
// Admin can handle these routes
Route.get("/getAllLaptops", isAuthenticated, isAdmin, getAllLaptops);  // admin access 
Route.post("/addLaptop", isAuthenticated, isAdmin,upload.single('image'), addLaptop);         // admin access 
Route.delete("/deleteLaptop/:id", isAuthenticated, isAdmin, deleteLaptop); // admin access 
Route.put("/updateLaptop/:id", isAuthenticated, isAdmin, updateLaptop);   // admin access 

// Employee info Admin Routes
Route.get("/allEmp", isAuthenticated,isAdmin, getAllEmployee); // admin access only
Route.get("/laptopCountByStatus", isAuthenticated,isAdmin, getLaptopCountByStatus); 


// Route for assigning laptops 
Route.post("/assignLaptop", isAuthenticated, isAdmin, assignLaptop); // Only authenticated employees can assign laptops
Route.get("/assignments/:employeeId", isAuthenticated,fetchAssignedLaptops)
Route.post("/reportissue",isAuthenticated,reportIssue)


// Add a maintenance log
Route.post("/maintenance",isAuthenticated,isEmployee, addMaintenanceLog);

// View maintenance history
Route.get("/maintenance/:laptopId/history",isAuthenticated,isEmployee, maintenanceHistory);


// Auth Routes
Route.post("/login", login); // Public route for login
Route.post("/addEmp", addEmployee); 


module.exports = Route;
