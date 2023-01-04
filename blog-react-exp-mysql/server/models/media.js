module.exports = (dbSequelize, Sequelize) => {
    return dbSequelize.define("media",
        {
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            originalname: {
                type: Sequelize.STRING,
            },
            path: {
                type: Sequelize.STRING,
            },
            type: {
                type: Sequelize.STRING,
            }
        },
        {
            timestamps: false,
        });
};