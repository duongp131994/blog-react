module.exports = (dbSequelize, Sequelize) => {
    return dbSequelize.define("category", {
        name: {
            type: Sequelize.STRING
        },
        slug: {
            type: Sequelize.STRING
        }
    });
};