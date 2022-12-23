const db = require("../models");
const New = db.news;
const Op = db.Sequelize.Op;

// Create and Save a new New
exports.create = (req, res) => {
    // Validate request
    console.log(req.body)
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a New
    const newData = {
        title: req.body.title,
        content: req.body.content,
        comment: '',
        published: req.body.published ? req.body.published : false
    };

    // Save New in the database
    New.create(newData)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the New."
            });
        });
};

// Retrieve all News from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    New.findAll({ where: condition })
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

    New.findByPk(id)
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

    const oldData = await New.findByPk(id)
    if (oldData === null) {
        res.status(400).send({
            message: "The news doesn't exist."
        });
    }

    //dang lam
    if (req.body.comment) {
        oldData.comment = JSON.parse(oldData.comment)
        oldData.comment.push(req.body.comment)
    }

    const dataUpdate = {
        title: req.body.title,
        comment: req.body.comment,
        content: req.body.content
    }

    New.update(dataUpdate, {
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

    New.destroy({
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
    New.destroy({
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
    New.findAll({ where: { published: true } })
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