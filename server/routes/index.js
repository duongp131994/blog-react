module.exports = app => {
    var router = require("express").Router();
    const newRoutes = require('./newRoutes');

    app.use('/api/news', newRoutes);
}
