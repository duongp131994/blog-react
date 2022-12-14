const bcrypt = require('bcrypt');
const authMethod = require('../configs/authMethods');
const db = require("../models");
const usersModel = db.users;
const Op = db.Sequelize.Op;
require('dotenv').config();

exports.register = (req, res) => {
    if (!req.body.username) {
        res.status(400).send({message: "User name can not be empty!"});
        return;
    }

    if (!req.body.email) {
        res.status(400).send({message: "Email can not be empty!"});
        return;
    }

    if (!req.body.password) {
        res.status(400).send({message: "Password can not be empty!"});
        return;
    }

    const username = req.body.username.toLowerCase();
    const email = req.body.email;
    const condition = username ? {email: `${email}`} : null;
    const hashPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    usersModel.findOrCreate({
        where: condition,
        defaults: {username: username, password: hashPassword, email: email}
    }).then(([user, created]) => {
        if (created) {
            return res.status(200).send({username: username, id: user.id, email: email});
        }
        return res.status(400).send({
            message: "This account has already existed."
        });
    })
};
exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await usersModel.findOne({where: {email: email}});
    if (!user) {
        return res.status(401).send({
            message: 'Username does not exist.'
        });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send({
            message: 'Password not invalid.'
        });
    }

    const dataForAccessToken = {
        username: user.username,
    };
    const accessToken = await authMethod.generateToken(
        dataForAccessToken,
        process.env.ACCESS_TOKEN_SECRET,
        process.env.ACCESS_TOKEN_LIFE,
    );

    if (!accessToken) {
        return res.status(401).send({
            message: 'Login failed, please try again.'
        });
    }

    // t???o 1 refresh token ng???u nhi??n
    let refreshToken = await authMethod.generateToken(
        dataForAccessToken,
        process.env.REFRESH_TOKEN_SECRET,
        process.env.REFRESH_TOKEN_LIFE,
    );

    //update refresh_token when this is expired or first login
    let updateRefreshToken = true;
    if (!!user.refresh_token) {
        const verified = await authMethod.verifyToken(user.refresh_token, process.env.REFRESH_TOKEN_SECRET)
        if (verified) {
            refreshToken = user.refresh_token
            updateRefreshToken = false
        }
    }
    if (updateRefreshToken) {
        const updatedRows = await usersModel.update(
            {refresh_token: refreshToken},
            {where: {id: user.id}}
        );
    }

    const userData = {username: user.username, id: user.id, email: user.email, role: user.role}

    return res.json({
        msg: 'Logged in successfully.',
        accessToken,
        refreshToken,
        userData,
    });
};

exports.logout = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await usersModel.findOne({where: {email: email}});
    if (!user) {
        return res.status(401).send('Username does not exist.');
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send('Password not invalid.');
    }

    const dataForAccessToken = {
        username: user.username,
    };
    const accessToken = await authMethod.generateToken(
        dataForAccessToken,
        process.env.ACCESS_TOKEN_SECRET,
        process.env.ACCESS_TOKEN_LIFE,
    );

    if (!accessToken) {
        return res.status(401).send('Login failed, please try again.');
    }

    // t???o 1 refresh token ng???u nhi??n
    let refreshToken = await authMethod.generateToken(
        dataForAccessToken,
        process.env.REFRESH_TOKEN_SECRET,
        process.env.REFRESH_TOKEN_LIFE,
    );

    //update refresh_token when this is expired or first login
    let updateRefreshToken = true;
    if (!!user.refresh_token) {
        const verified = await authMethod.verifyToken(user.refresh_token, process.env.REFRESH_TOKEN_SECRET)
        if (verified) {
            refreshToken = user.refresh_token
            updateRefreshToken = false
        }
    }
    if (updateRefreshToken) {
        const updatedRows = await usersModel.update(
            {refresh_token: refreshToken},
            {where: {id: user.id}}
        );
    }

    const userData = {username: user.username, id: user.id, email: user.email, role: user.role}

    return res.json({
        msg: 'Logged in successfully.',
        accessToken,
        refreshToken,
        userData,
    });
};

exports.refreshToken = async (req, res) => {
    const accessTokenFromHeader = req.headers.x_authorization;
    if (!accessTokenFromHeader) {
        return res.status(400).send('Access token not found.');
    }

    const refreshTokenFromBody = req.body.refreshToken;
    if (!refreshTokenFromBody) {
        return res.status(400).send('Refresh token not found.');
    }
    // Decode access token ????
    const decoded = await authMethod.decodeToken(
        accessTokenFromHeader,
        process.env.ACCESS_TOKEN_SECRET,
    );
    if (!decoded) {
        return res.status(400).send('Access token is invalid.');
    }

    const username = decoded.username; // L???y username t??? payload

    const user = await usersModel.findOne({where: {username: username}});
    if (!user) {
        return res.status(401).send('Username does not exist.');
    }

    console.log(refreshTokenFromBody, user)
    if (refreshTokenFromBody !== user.refresh_token) {
        return res.status(400).send('Refresh token is invalid.');
    }

    // T???o access token m???i
    const dataForAccessToken = {
        username,
    };

    const accessToken = await authMethod.generateToken(
        dataForAccessToken,
        process.env.ACCESS_TOKEN_SECRET,
        process.env.ACCESS_TOKEN_LIFE,
    );
    console.log(accessToken)
    if (!accessToken) {
        return res
            .status(400)
            .send('Access token generation failed, please try again.');
    }
    return res.json({
        accessToken,
    });
};

exports.findAll = (req, res) => {
    const searchText = req.query.searchText;
    let condition = searchText ? {username: {[Op.like]: `%${searchText}%`}} : null;
    const searchAll = req.query.searchAll || 0;
    let where = parseInt(searchAll) === 1 ? {where: null} : {where: condition}

    usersModel.findAll(where)
        .then(async datas => {
            if (!datas) {
                return res.status(400).send('No user');
            }

            let returnData = []
            for (const data of datas) {
                await returnData.push({username: data.username, id: data.id, email: data.email, role: data.role});
            }
            return res.status(200).send(returnData);
        })
        .catch(err => {
            return res.status(400).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        })
};

// Find a single New with an id
exports.findOne = (req, res) => {
    const id = req.params.id
    const role = req.user.role || null

    if (!(parseInt(id) > 0))
        return res.status(400).send('user not exist!');

    if (!role && !(role === 'admin' || req.user.id === id)) {
        return res.status(400).send('No permission access.');
    }

    usersModel.findByPk(id)
        .then(data => {
            if (!data) {
                return res.status(400).send({
                    message: "user not exist!"
                });
            } else {
                return res.status(200).send(data);
            }
        })
        .catch(err => {
            return res.status(400).send({
                message: "Error retrieving usersModel with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    if (!(parseInt(id) > 0))
        return res.status(400).send('user not exist!');

    const role = req.user.role || null
    if (!role && !(role === 'admin' || req.user.id === id)) {
        return res.status(400).send('No permission access.');
    }

    const dataUpdate = {}

    //update title
    if (req.body.username) {
        dataUpdate.username = req.body.username
    }

    //update content
    if (req.body.password) {
        dataUpdate.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    }

    //update comments list
    if (req.body.email) {
        dataUpdate.email = req.body.email
    }

    //role
    if (role === 'admin' && req.body.role)
        dataUpdate.role = req.body.role

    if (!dataUpdate.username && !dataUpdate.password && !dataUpdate.email && !dataUpdate.role) {
        res.status(400).send({
            message: "Update failed!"
        });
    }

    usersModel.update(dataUpdate, {
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "New was updated successfully."
                });
            } else {
                res.status(400).send({
                    message: `Cannot update New with id=${id}. Maybe New was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(400).send({
                message: "Error updating New with id=" + id
            });
        });
};

// Delete a New with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    if (!(parseInt(id) > 0))
        return res.status(400).send('user not exist!');

    const role = req.user.role || null
    if (!role && !(role === 'admin' || req.user.id === id)) {
        return res.status(400).send('No permission access.');
    }

    console.log(req)
    usersModel.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "New was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete New with id=${id}. Maybe New was not found!`
                });
            }
        })
        .catch(err => {
            res.status(400).send({
                message: "Could not delete New with id=" + id
            });
        });
};
