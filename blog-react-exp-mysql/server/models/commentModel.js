module.exports = (dbSequelize, Sequelize) => {
    return dbSequelize.define("comment", {
        content: {
            type: Sequelize.TEXT('medium')
        },
        parent: {//not has parent, this is new feature
            type: Sequelize.INTEGER
        },
        postId: {
            type: Sequelize.INTEGER
        },
        author: {
            type: Sequelize.INTEGER
        },
        position: {
            type: Sequelize.INTEGER
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    });
};