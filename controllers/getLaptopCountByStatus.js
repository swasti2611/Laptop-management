const Laptop = require("../Model/laptops") // Assuming the model path

const getLaptopCountByStatus = async (req, res) => {
  try {
    // Aggregate query to count laptops based on their status
    const laptopCount = await Laptop.aggregate([
      {
        $group: {
          _id: "$status", // Group by the 'status' field
          count: { $sum: 1 } // Count the number of documents for each status
        }
      }
    ]);

    // Find the count of available laptops
    const availableLaptops = laptopCount.find(item => item._id === 'available')?.count || 0;
    const assignedLaptops = laptopCount.find(item => item._id === 'assigned')?.count || 0;
    const maintenanceLaptops = laptopCount.find(item => item._id === 'maintenance')?.count || 0;

    // Send the response with the count of laptops by status
    res.status(200).json({
      availableLaptops,
      assignedLaptops,
      maintenanceLaptops,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching laptop counts", error: error.message });
  }
};

module.exports = { getLaptopCountByStatus };
