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
            message: "Tên tài khoản đã tồn tại."
        });
    })
};
exports.login = async (req, res) => {
    const username = req.body.username.toLowerCase() || 'test';
    const password = req.body.password || '12345';

    const user = await usersModel.findOne({ where: { username: username } });
    if (!user) {
        return res.status(401).send('Tên đăng nhập không tồn tại.');
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send('Mật khẩu không chính xác.');
    }

    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

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
            .send('Đăng nhập không thành công, vui lòng thử lại.');
    }

    // tạo 1 refresh token ngẫu nhiên
    let refreshToken = await authMethod.generateToken(
        dataForAccessToken,
        process.env.REFRESH_TOKEN_SECRET,
        null,
    );
    if (!user.refreshToken) {
        // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
        const updatedRows = await usersModel.update(
            {
                refresh_token: refreshToken,
            },
            {
                where: { id: user.id },
            }
        );
    } else {
        // Nếu user này đã có refresh token thì lấy refresh token đó từ database
        refreshToken = user.refreshToken;
    }

    return res.json({
        msg: 'Đăng nhập thành công.',
        accessToken,
        refreshToken,
        user,
    });
};
