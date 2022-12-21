const bcrypt = require('bcrypt');
const db = require("../models");
const usersModel = db.users;
const Op = db.Sequelize.Op;
require('dotenv').config();

exports.register = (req, res) => {
    console.log(req.body.username);
    if (!req.body.username) {
        res.status(400).send({message: "User name can not be empty!"});
        return;
    }

    if (!req.body.password) {
        res.status(400).send({message: "Password can not be empty!"});
        return;
    }

    const username = req.body.username.toLowerCase();
    var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

    usersModel.findAll({ where: condition })
        .then(data => {
            res.status(409).send('Tên tài khoản đã tồn tại.');
        })
        .catch(err => {
            const hashPassword = bcrypt.hashSync(req.body.password, process.env.SALT_ROUNDS);
            const newUser = {
                username: username,
                password: hashPassword,
            };
            usersModel.create(newUser)
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại."
                    });
                });
        });
};
