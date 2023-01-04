module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const userRoutes = require('./userRoutes');
    const postRoutes = require('./postRoutes');
    const commentRoutes = require('./commentRoutes');
    const fileUploader = require('../configs/cloudinaryConfig');

    const db = require('../models')
    const mediaModel = db.media

    const userControllers = require('../controllers/userController');

    //user, auth
    app.use('/api/auth', userRoutes);

    //url post
    app.use('/api/post', postRoutes);

    //upload image
    app.post('/api/file-upload', fileUploader.single('file'), async (req, res, next) => {
        if (!req.file) {
            next(new Error('No file uploaded!'));
            return;
        }

        let file
        await mediaModel.create({
            'originalname': req.file.originalname,
            'name': req.file.filename,
            'type': req.file.mimetype,
            'path': req.file.path
        })
            .then(data => {
                if (!data)
                    return res.status(400).send('Has error when insert file!');

                file = data
            })
            .catch(err => {
                return res.status(400).send({
                    message:
                        err.message || "Some error occurred while insert file!"
                });
            });

        return res.status(200).json(file);
    });

    //comment
    app.use('/api/comment', commentRoutes);
}
