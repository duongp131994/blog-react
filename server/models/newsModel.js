module.exports = (sequelize, Sequelize) => {
    const News = sequelize.define("news", {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        content: {
            type: Sequelize.STRING
        },
        comment: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    });
    return News;
};