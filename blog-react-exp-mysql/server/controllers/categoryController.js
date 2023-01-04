const authMethod = require('../configs/authMethods')
const isEmpty = require('../configs/middleware')
const db = require('../models')
const categoryModel = db.category
const Op = db.Sequelize.Op

// Create and Save a new New
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send("Category name can not be empty!");
    }
    if (!req.body.slug) {
        return res.status(400).send("Slug can not be empty!");
    }

    const role = req.user.role || null

    if (!role && !(role === 'admin')) {
        return res.status(400).send('No permission access.');
    }

    // Create a New
    const newData = {
        name: req.body.name,
        slug: req.body.slug
    };

    // Save New in the database
    categoryModel.create(newData)
        .then(data => {
            if (!data)
                return res.status(400).send('Has error when create category!');

            return res.status(200).send(data);
        })
        .catch(err => {
            return res.status(400).send({
                message:
                    err.message || "Some error occurred while creating the category."
            });
        });
};

// Retrieve all News from the database.
exports.findAll = (req, res) => {
    categoryModel.findAll()
        .then(async datas => {
            if (!datas) {
                return res.status(400).send('No category');
            }

            return res.status(200).send(datas);
        })
        .catch(err => {
            return res.status(400).send({
                message:
                    err.message || "Some error occurred while retrieving category."
            });
        })
};

// Find a single New with an id
exports.findOne = (req, res) => {
    const id = parseInt(req.params.id);

    if (!(id > 0)) {
        return res.status(400).send("Category id can not be empty!");
    }

    categoryModel.findByPk(id)
        .then(datas => {
            if (!datas) {
                return res.status(400).send('No category');
            }

            return res.status(200).send(datas);
        })
        .catch(err => {
            return res.status(400).send({
                message: "Error retrieving category with id=" + id
            });
        });
};

// Update a New by the id in the request
exports.update = async (req, res) => {
    const id = parseInt(req.params.id);

    if (!(id > 0))
        return res.status(400).send('post not exist!');

    const role = req.user.role || null
    if (!role && !(role === 'admin')) {
        return res.status(400).send('No permission access.');
    }

    const dataUpdate = {}

    //update title
    if (req.body.name)
        dataUpdate.name = req.body.name
    //update content
    if (req.body.slug)
        dataUpdate.slug = req.body.slug

    if (isEmpty(dataUpdate))
        return res.status(400).send({
            message: "Update failed!"
        });

    categoryModel.update(dataUpdate, {
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                return res.status(200).send({
                    message: "Post was updated successfully."
                });
            } else {
                return res.status(400).send({
                    message: `Cannot update post with id=${id}. Maybe post was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            return res.status(400).send({
                message: "Error updating Post with id=" + id
            });
        });
};

// Delete a New with the specified id in the request
exports.delete = (req, res) => {
    const id = parseInt(req.params.id);

    if (!(id > 0))
        return res.status(400).send('category not exist!');

    const role = req.user.role || null
    if (!role && !(role === 'admin')) {
        return res.status(400).send('No permission access.');
    }

    categoryModel.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                return res.status(200).send({
                    message: "category was deleted successfully!"
                });
            } else {
                return res.status(400).send({
                    message: `Cannot delete category with id=${id}. Maybe New was not found!`
                });
            }
        })
        .catch(err => {
            return res.status(400).send({
                message: "Could not delete category with id=" + id
            });
        });
};
