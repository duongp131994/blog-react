module.exports = {
    host: "localhost",
    username: "root",
    password: "password",
    database: "blog_react_express_4",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};