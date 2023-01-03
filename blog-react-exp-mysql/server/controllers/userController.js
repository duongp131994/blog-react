const bcrypt = require('bcrypt');
const authMethod = require('../configs/authMethods');
const db = require("../models");
const usersModel = db.users;
const Op = db.Sequelize.Op;
require('dotenv').config();

exports.register = (req, res) => {
    console.log(req.body);
    if (!req.body.username) {
        res.status(400).send({message: "User name can not be empty!"});
        return;
    }

    if (!req.body.password) {
        res.status(400).send({message: "Password can not be empty!"});
        return;
    }

    const username = req.body.username.toLowerCase();
    const condition = username ? {username: `${username}`} : null;
    const hashPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    usersModel.findOrCreate({
        where: condition,
        defaults: {username: username, password: hashPassword}
    }).then(([user, created]) => {
        if (created) {
            res.status(200).send({username: username, id: user.id});
            return false;
        }
        res.status(500).send({
            message: "This account has already existed."
        });
    })
};
exports.login = async (req, res) => {
    const username = req.body.username.toLowerCase() || 'test';
    const password = req.body.password || '12345';

    const user = await usersModel.findOne({ where: { username: username } });
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
        return res
            .status(401)
            .send('Login failed, please try again.');
    }

    // tạo 1 refresh token ngẫu nhiên
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
            {where: { id: user.id }}
        );
    }

    return res.json({
        msg: 'Logged in successfully.',
        accessToken,
        refreshToken,
        user,
    });
};

// Find a single New with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    console.log(id);

    usersModel.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving usersModel with id=" + id
            });
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
    // Decode access token đó
    const decoded = await authMethod.decodeToken(
        accessTokenFromHeader,
        process.env.ACCESS_TOKEN_SECRET,
    );
    if (!decoded) {
        return res.status(400).send('Access token is invalid.');
    }

    const username = decoded.username; // Lấy username từ payload

    const user = await usersModel.findOne({ where: { username: username } });
    if (!user) {
        return res.status(401).send('Username does not exist.');
    }

    console.log(refreshTokenFromBody, user)
    if (refreshTokenFromBody !== user.refresh_token) {
        return res.status(400).send('Refresh token is invalid.');
    }

    // Tạo access token mới
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
    var condition = searchText ? { username: { [Op.like]: `%${searchText}%` } } : null;

    usersModel.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    const dataUpdate = {}

    //update title
    if (req.body.title) {
        dataUpdate.title = req.body.title
    }

    //update content
    if (req.body.content) {
        dataUpdate.content = req.body.content
    }

    //update comments list
    if (req.body.comment) {
        dataUpdate.comment = req.body.comment
    }

    if (!dataUpdate.title && !dataUpdate.content && !dataUpdate.comment) {
        res.status(200).send({
            message: "Update failed!"
        });
    }

    usersModel.update(dataUpdate, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "New was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update New with id=${id}. Maybe New was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating New with id=" + id
            });
        });
};

// Delete a New with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    console.log(req)
    New.destroy({
        where: { id: id }
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
            res.status(500).send({
                message: "Could not delete New with id=" + id
            });
        });
};
