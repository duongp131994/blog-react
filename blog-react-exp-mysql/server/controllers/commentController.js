const authMethod = require('../configs/authMethods')
const isEmpty = require('../configs/middleware')
const db = require('../models')
const commentModel = db.comment
const Op = db.Sequelize.Op

// Create and Save a new New
exports.create = (req, res) => {
    let newData = {}
    if (!req.body.content)
        return res.status(400).send("Content can not be empty!")
    else
        newData.content = req.body.content

    if (!req.body.parent && !(parseInt(req.body.parent) > 0))
        return res.status(400).send("Category can not be empty!")
    else
        newData.parent = req.body.parent

    if (!req.body.postId && !(parseInt(req.body.postId) > 0))
        return res.status(400).send("Post id can not be empty!")
    else
        newData.postId = req.body.postId

    if (!req.body.author && !(parseInt(req.body.author) > 0))
        newData.author = 2//anonymous
    else
        newData.author = req.body.author

    if (!req.body.position && !(parseInt(req.body.position) > 0))
        return res.status(400).send("Has error when saving comment!")
    else
        newData.position = req.body.position

    if (!req.body.published)
        newData.published = 1
    else
        newData.published = req.body.published

    // Save comment in the database
    commentModel.create(newData)
        .then(data => {
            if (!data)
                return res.status(400).send('Has error when create comment!');

            return res.status(200).send(data);
        })
        .catch(err => {
            return res.status(400).send({
                message:
                    err.message || "Some error occurred while creating the New."
            });
        });
};

// Retrieve all News from the database.
exports.findAll = (req, res) => {
    commentModel.findAll()
        .then(async datas => {
            if (!datas) {
                return res.status(400).send('No post');
            }

            return res.status(200).send(datas);
        })
        .catch(err => {
            return res.status(400).send({
                message:
                    err.message || "Some error occurred while retrieving post."
            });
        })
};

// find all published New
exports.findByPost = (req, res) => {
    const postId = parseInt(req.params.id)

    if (!(postId > 0)) {
        return res.status(400).send("Post can not be empty!");
    }
    const published = req.query.published || 1;
    let where = parseInt(published) > 0 ? {published: published, postId} : {postId}

    commentModel.findAll({where: where})
        .then(datas => {
            if (!datas || datas.length < 1) {
                return res.status(400).send('No comment');
            }

            return res.status(200).send(datas);
        })
        .catch(err => {
            return res.status(400).send({
                message:
                    err.message || "Some error occurred while retrieving comment."
            });
        });
};

// Find a single New with an id
exports.findOne = (req, res) => {
    const id = parseInt(req.params.id);

    if (!(id > 0)) {
        return res.status(400).send("Comment id can not be empty!");
    }

    commentModel.findByPk(id)
        .then(datas => {
            if (!datas) {
                return res.status(400).send('No comment');
            }

            return res.status(200).send(datas);
        })
        .catch(err => {
            return res.status(400).send({
                message: "Error retrieving comment with id=" + id
            });
        });
};

// Delete a New with the specified id in the request
exports.delete = (req, res) => {
    const id = parseInt(req.params.id);

    if (!(id > 0))
        return res.status(400).send('Comment not exist!');

    const role = req.user.role || null
    if (!role && !(role === 'admin')) {
        return res.status(400).send('No permission access.');
    }

    commentModel.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                return res.status(200).send({
                    message: "Comment was deleted successfully!"
                });
            } else {
                return res.status(400).send({
                    message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`
                });
            }
        })
        .catch(err => {
            return res.status(400).send({
                message: "Could not delete Comment with id=" + id
            });
        });
};
