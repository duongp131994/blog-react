const authMethod = require('./authMethods');

const db = require("../models");
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

    let user = await usersModel.findOne({where: {username: verified.username}});
    // if () {
    //
    // }

    req.user = user
    return next();
};

checkRole = (req) => {

    return true;
}
