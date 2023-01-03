module.exports = (dbSequelize, Sequelize) => {
    return dbSequelize.define("posts", {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        content: {
            type: Sequelize.TEXT('medium')
        },
        slug: {//post slug
            type: Sequelize.STRING
        },
        featureImage: {
            type: Sequelize.STRING
        },
        excerpt: {
            type: Sequelize.STRING
        },
        theme: {
            type: Sequelize.STRING
        },
        author: {
            type: Sequelize.INTEGER
        },
        category: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    });
};