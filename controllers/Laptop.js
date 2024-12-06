const Laptop = require("../Model/laptops");
const {upload}=require(".././controllers/upload")
const getAllLaptops = async (req, res) => {
  try {
    let allLaptops = await Laptop.find({}); // Fetch all laptops from the database
    res.status(200).json({ message: "All laptops fetched", allLaptops });
  } catch (error) { // Corrected: directly handle the error object
    res.status(500).json({ message: "Error fetching laptops", error: error.message }); // Send the error message
  }
};



const addLaptop = async (req, res) => {
  try {
    // Extract laptop details from request body
    const { brand, model, serialNumber, status, purchaseDate } = req.body;
    const image = req.file; // The uploaded image file from multer

    // Validate required fields
    if (!brand || !model || !serialNumber || !status || !purchaseDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if an image file was uploaded
    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Create new laptop entry in the database
    const newLaptop = await Laptop.create({
      brand,
      model,
      serialNumber,
      status,
      purchaseDate,
      image: image ? image.path : null, // Store the image path in the database
    });

    // Respond with success message and the new laptop details
    res.status(201).json({
      success: true,
      message: "Laptop added successfully!",
      newLaptop,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding laptop", error });
  }
};

const deleteLaptop = async (req,res) => {
  const { id } = req.params;

  try {
    let deleteLaptop = await Laptop.findByIdAndDelete(id);
    if (!deleteLaptop) {
      return res.status(401).json({ message: "Laptop not found" });
    }
    
     res.status(200).json({ message: "Laptop Found Succsessfully", deleteLaptop });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting laptop", error });
  }
};

const updateLaptop = async (req, res) => {
  try {
    const { id } = req.params; // Get laptop ID from the URL parameters
    const updates = req.body; // Get the updated data from the request body

    // Validate required fields
    const { brand, model, serialNumber, status, purchaseDate } = updates;
    if (!brand || !model || !serialNumber || !status || !purchaseDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Update the laptop document in the database
    const updatedLaptop = await Laptop.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    // If laptop not found, return a 404 error
    if (!updatedLaptop) {
      return res.status(404).json({
        message: 'Laptop not found',
      });
    }

    // Respond with the updated laptop data
    res.status(200).json({
      message: 'Laptop updated successfully',
      updatedLaptop,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error updating laptop',
    });
  }
};

module.exports = { getAllLaptops, addLaptop,deleteLaptop,updateLaptop};
