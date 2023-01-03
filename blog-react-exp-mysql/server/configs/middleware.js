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

    req.user = user
    return next();
};

exports.isRole = async (req, res, next) => {
    // console.log(req.params, req.query, req.baseUrl, req.originalUrl, req.route)
    console.log(req.params, req.query, req.baseUrl, req.originalUrl, req.route)

    const role = req.user.role || null

    switch(role) {
        case 'admin':
            // code block
            break;
        case 'edit':
            // code block
            break;
        case null:
            // code block
            break;
        default:
        // code block
    }

    console.log(role)
    return next();
};
