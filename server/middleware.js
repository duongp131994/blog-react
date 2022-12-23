const authMethod = require('./configs/authMethods');
require('dotenv').config();

const db = require("./models");
const usersModel = db.users;

exports.isAuth = async (req, res, next) => {
    const accessTokenFromHeader = req.headers.x_authorization;
    if (!accessTokenFromHeader) {
        return res.status(400).send('Access token not found.');
    }

    const verified = await authMethod.verifyToken(accessTokenFromHeader, process.env.ACCESS_TOKEN_SECRET)
    if (!verified) {
        return res.status(400).send('No permission access.');
    }

    req.user = await usersModel.findOne({where: {username: verified.username}});
    return next();
};