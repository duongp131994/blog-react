module.exports = (sequelize, Sequelize) => {
    return sequelize.define("users",
        {
            username: {
                type: Sequelize.STRING,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            refresh_token: {
                type: Sequelize.STRING
            },
            post_list: {
                type: Sequelize.STRING
            }
        },
        {
            timestamps: false,
        });
};