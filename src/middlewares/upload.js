
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const path = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'contacts_photos', 
    allowedFormats: ['jpeg', 'png', 'jpg'],
    public_id: (req, file) => Date.now() + path.extname(file.originalname),
  },
});

const upload = multer({ storage });

const uploadPhoto = (req, res, next) => {
  
  upload.single('photo')(req, res, (err) => {
    
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({
        status: 400,
        message: 'Error uploading file.',
        error: err.message,
      });
    }
    
    next();
  });
};

module.exports = uploadPhoto;
