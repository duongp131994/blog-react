module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const newRoutes = require('./newRoutes');
    const fileUploader = require('../configs/cloudinaryConfig');

    const userControllers = require('../controllers/userControllers.js');

    //user
    app.post("/user/register", userControllers.register);
    app.post('/user/login', userControllers.login);
    // app.use('/user', router);

    //url post
    app.use('/api/news', newRoutes);

    //upload image
    app.post('/api/file-upload', fileUploader.single('file'), (req, res, next) => {
        if (!req.file) {
            next(new Error('No file uploaded!'));
            return;
        }

        res.json({ link: req.file.path });
    });
}
