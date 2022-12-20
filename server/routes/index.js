module.exports = app => {
    var router = require("express").Router();
    const newRoutes = require('./newRoutes');
    const fileUploader = require('../configs/cloudinaryConfig');

    //url auth

    //url post
    app.use('/api/news', newRoutes);

    app.post('/api/file-upload', fileUploader.single('file'), (req, res, next) => {
        console.log(req, res)
        if (!req.file) {
            next(new Error('No file uploaded!'));
            return;
        }

        res.json({ link: req.file.path });
    });
}
