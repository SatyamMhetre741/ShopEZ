// Assigned to: Rajiv
const multer = require('multer');

// TODO: Configure storage (local disk or cloud like S3/Cloudinary)
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = { upload };
