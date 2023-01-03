module.exports = (dbSequelize, Sequelize) => {
    return dbSequelize.define("users",
        {
            username: {
                type: Sequelize.STRING,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            role: {
              type: Sequelize.STRING
            },
            refresh_token: {
                type: Sequelize.STRING
            }
        },
        {
            timestamps: false,
        });
};