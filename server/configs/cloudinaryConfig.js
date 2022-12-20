const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: 'doabizt2t',
    api_key: '622265576563462',
    api_secret: 'wJmMFXnmJpe3RJUEnhqnw79rHsE'
});

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png', 'mp4'],
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;