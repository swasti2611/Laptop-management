const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure 'uploads' directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log('Uploads directory created');
}

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure the uploads directory exists
    cb(null, uploadsDir); // Save files in 'uploads' directory
  },
  filename: (req, file, cb) => {
    // Use a unique filename with a timestamp to avoid collisions
    const uniqueSuffix = Date.now() + path.extname(file.originalname); // e.g. 1733476910505.jpg
    cb(null, uniqueSuffix);
  }
});

// File filter to allow only specific image types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, JPEG, and PNG are allowed'), false);
  }
};

// Initialize multer with storage and fileFilter
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = { upload };
