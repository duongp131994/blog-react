module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const newRoutes = require('./newRoutes');
    const fileUploader = require('../configs/cloudinaryConfig');

    const userControllers = require('../controllers/userControllers.js');

    //user
    router.post('user/register', userControllers.register);

    //url post
    app.use('/api/news', newRoutes);

    //upload image
    app.post('/api/file-upload', fileUploader.single('file'), (req, res, next) => {
        console.log(req, res)
        if (!req.file) {
            next(new Error('No file uploaded!'));
            return;
        }

        res.json({ link: req.file.path });
    });
}
