const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require('bcrypt');

require('dotenv').config();

const authMethod = require('./configs/authMethods');

const app = express();
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// parse requests of content-type - application/json
app.use(express.json());

require("./routes/index.js")(app);

const db = require("./models");
const initDB = async (db) => {
    try {
        await db.dbSequelize.authenticate();
        await db.dbSequelize.sync();

        const hashPassword = bcrypt.hashSync('password', bcrypt.genSaltSync(10));

        const dataForAccessToken = {
            username: 'admin',
        };

        // create refresh token
        let refreshToken = await authMethod.generateToken(
            dataForAccessToken,
            process.env.REFRESH_TOKEN_SECRET,
            process.env.REFRESH_TOKEN_LIFE,
        );

        // console.log(refreshToken, await authMethod.generateToken(
        //     dataForAccessToken,
        //     process.env.ACCESS_TOKEN_SECRET,
        //     process.env.ACCESS_TOKEN_LIFE,
        // ))

        await db.users.findOrCreate({
            where: {email: "admin@example.com"},
            defaults: {username: "admin", role: 'admin', email: "admin@example.com", password: hashPassword, refresh_token: refreshToken},
        });
        await db.users.findOrCreate({
            where: {email: "anonymous@example.com"},
            defaults: {username: "anonymous", role: null, email: "anonymous@example.com", password: hashPassword, refresh_token: refreshToken},
        });
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
initDB(db)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});