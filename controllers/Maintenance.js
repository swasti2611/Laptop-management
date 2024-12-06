const Maintenance = require("../Model/Maintenance");

const addMaintenanceLog = async (req, res) => {
  const { laptopId, description, status, cost } = req.body;

  try {
    if (!laptopId || !description) {
      return res.status(400).json({
        success: false,
        message: "Laptop ID and description are required",
      });
    }

    const maintenanceLog = await Maintenance.create({ laptopId, description, status, cost });

    res.status(201).json({
      success: true,
      message: "Maintenance log added successfully",
      data: maintenanceLog,
    });
  } catch (error) {
    console.error("Error adding maintenance log:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the maintenance log",
    });
  }
};


const maintenanceHistory = async (req, res) => {
    const { laptopId } = req.params;
  
    try {
      if (!laptopId) {
        return res.status(400).json({
          success: false,
          message: "Laptop ID is required",
        });
      }
  
      const history = await Maintenance.find({ laptopId }).sort({ loggedAt: -1 });
  
      if (!history.length) {
        return res.status(404).json({
          success: false,
          message: "No maintenance history found for this laptop",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Maintenance history fetched successfully",
        data: history,
      });
    } catch (error) {
      console.error("Error fetching maintenance history:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching maintenance history",
      });
    }
  };
  
  module.exports={addMaintenanceLog,maintenanceHistory}