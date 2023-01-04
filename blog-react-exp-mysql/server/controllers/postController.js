const authMethod = require('../configs/authMethods')
const db = require('../models')
const postModel = db.post
const Op = db.Sequelize.Op

// Create and Save a new New
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        return res.status(400).send("Title can not be empty!");
    }
    if (!req.body.content) {
        return res.status(400).send("Content can not be empty!");
    }
    if (req.body.content.length < 30) {
        return res.status(400).send("Content too short!");
    }
    if (!req.body.category && parseInt(req.body.category) < 1) {
        return res.status(400).send("Category can not be empty!");
    }
    if (!req.body.theme) {
        return res.status(400).send("Theme can not be empty!");
    }
    if (!req.body.author && parseInt(req.body.author) < 1) {
        return res.status(400).send("Author can not be empty!");
    }

    // Create a New
    const newData = {
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        theme: req.body.theme,
        author: req.body.author,
        slug: !req.body.slug ? req.body.title.replaceAll(' ', '-') : req.body.slug,
        excerpt: !req.body.excerpt ? req.body.content.slice(0, 20) : req.body.excerpt,
        featureImage: !req.body.featureImage ? null : req.body.featureImage,
        published: req.body.published ? req.body.published : false
    };

    // Save New in the database
    postModel.create(newData)
        .then(data => {
            return res.status(200).send(data);
        })
        .catch(err => {
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the New."
            });
        });
};

// Retrieve all News from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    postModel.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving News."
            });
        });
};

// Find a single New with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    postModel.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving New with id=" + id
            });
        });
};

// Update a New by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;

    const dataUpdate = {}

    //update title
    if (req.body.title) {
        dataUpdate.title = req.body.title
    }

    //update content
    if (req.body.content) {
        dataUpdate.content = req.body.content
    }

    //update comments list
    if (req.body.comment) {
        dataUpdate.comment = req.body.comment
    }

    if (!dataUpdate.title && !dataUpdate.content && !dataUpdate.comment) {
        res.status(200).send({
            message: "Update failed!"
        });
    }

    postModel.update(dataUpdate, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "New was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update New with id=${id}. Maybe New was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating New with id=" + id
            });
        });
};

// Delete a New with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    postModel.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "New was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete New with id=${id}. Maybe New was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete New with id=" + id
            });
        });
};

// Delete all News from the database.
exports.deleteAll = (req, res) => {
    postModel.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} News were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all News."
            });
        });
};

// find all published New
exports.findAllPublished = (req, res) => {
    postModel.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving News."
            });
        });
};
