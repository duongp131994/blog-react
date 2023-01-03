const dbConfig = require("../configs/db.config.js");
const Sequelize = require("sequelize");
const dbSequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
const db = {};
db.Sequelize = Sequelize;
db.dbSequelize = dbSequelize;
db.users= require("./usersModel.js")(dbSequelize, Sequelize);
db.post= require("./postModel.js")(dbSequelize, Sequelize);
db.category= require("./categoryModel.js")(dbSequelize, Sequelize);
db.comment= require("./commentModel.js")(dbSequelize, Sequelize);

module.exports = db;
