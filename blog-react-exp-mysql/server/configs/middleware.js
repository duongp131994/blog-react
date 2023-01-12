const authMethod = require('./authMethods');

const db = require("../models");
const usersModel = db.users;

exports.isAuth = async (req, res, next) => {
    const accessTokenFromHeader = req.headers.x_authorization;

    if (!accessTokenFromHeader) {
        return res.status(401).send('Access token not found.');
    }

    const decodeToken = await authMethod.decodeToken(accessTokenFromHeader, process.env.ACCESS_TOKEN_SECRET)
    const verified = await authMethod.verifyToken(accessTokenFromHeader, process.env.ACCESS_TOKEN_SECRET)
    if (!decodeToken ) {
        return res.status(403).send('No permission access.');
    }
    if (!verified) {
        return res.status(401).send({
            refreshtoken: true
        });
    }

    let user = await usersModel.findOne({where: {username: verified.username}});

    req.user = user
    return next();
};

exports.isEmpty = (obj) => {
    for(let prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}