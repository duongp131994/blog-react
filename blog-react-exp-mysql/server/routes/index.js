module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const userRoutes = require('./userRoutes');
    // const newRoutes = require('./newRoutes');
    // const fileUploader = require('../configs/cloudinaryConfig');

    const userControllers = require('../controllers/userController');

    //user, auth
    app.use('/api/auth', userRoutes);

    // app.post("/user/register", userControllers.register);
    // app.post('/user/login', userControllers.login);
    // app.post('/auth/refresh', userControllers.refreshToken);
    //update user
    // router.post('/user', middleware.isAuth, userControllers.update);

    //search user
    // router.get('/search/user', middleware.isAuth, userControllers.getUsers);
    // router.get('/search/user', userControllers.getUsers);

    //url post
    // app.use('/api/news', newRoutes);

    //upload image
    // app.post('/api/file-upload', fileUploader.single('file'), (req, res, next) => {
    //     if (!req.file) {
    //         next(new Error('No file uploaded!'));
    //         return;
    //     }
    //
    //     res.json({ link: req.file.path });
    // });
}
