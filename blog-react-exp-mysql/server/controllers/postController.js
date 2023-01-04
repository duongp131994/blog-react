const authMethod = require('../configs/authMethods')
const isEmpty = require('../configs/middleware')
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
    if (req.body.content.length < 40) {
        return res.status(400).send("Content too short!");
    }
    if (!req.body.category && !(parseInt(req.body.category) > 0)) {
        return res.status(400).send("Category can not be empty!");
    }
    if (!req.body.theme) {
        return res.status(400).send("Theme can not be empty!");
    }
    if (!req.body.author && !(parseInt(req.body.author) > 0)) {
        return res.status(400).send("Author can not be empty!");
    }

    const role = req.user.role || null

    if (!role && !(role === 'admin' || role === 'edit')) {
        return res.status(400).send('No permission access.');
    }

    // Create a New
    const newData = {
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        theme: req.body.theme,
        author: req.body.author,
        slug: !req.body.slug ? req.body.title.replaceAll(' ', '-') : req.body.slug,
        excerpt: !req.body.excerpt ? req.body.content.slice(0, 30) + '...' : req.body.excerpt + '...',
        featureImage: !req.body.featureImage ? null : req.body.featureImage,
        published: req.body.published ? req.body.published : false
    };

    console.log(req.body, newData)

    // Save New in the database
    postModel.create(newData)
        .then(data => {
            if (!data)
                return res.status(400).send('Has error when create post!');

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
    const searchText = req.query.searchText;
    let condition = searchText ? {
        [Op.or]: [
            {title: {[Op.like]: `%${searchText}%`}},
            {excerpt: {[Op.like]: `%${searchText}%`}}
        ]
    } : null;
    const searchAll = req.query.searchAll || 0;
    let where = parseInt(searchAll) === 1 ? {where: null} : {where: condition}

    console.log(searchAll, parseInt(searchAll) === 1, where)

    postModel.findAll(where)
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
exports.findByCategory = (req, res) => {
    const category = parseInt(req.params.id)

    if (!(category > 0)) {
        return res.status(400).send("Category can not be empty!");
    }
    const published = req.query.published || 1;
    let where = parseInt(published) > 0 ? {published: published, category} : {category}

    postModel.findAll({where: where})
        .then(datas => {
            if (!datas || datas.length < 1) {
                return res.status(400).send('No post');
            }

            return res.status(200).send(datas);
        })
        .catch(err => {
            return res.status(400).send({
                message:
                    err.message || "Some error occurred while retrieving post."
            });
        });
};

// find all published New
exports.findAllPublished = (req, res) => {
    postModel.findAll({where: {published: 1}})
        .then(datas => {
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
        });
};

// Find a single New with an id
exports.findOne = (req, res) => {
    const id = parseInt(req.params.id);

    if (!(id > 0)) {
        return res.status(400).send("Post id can not be empty!");
    }

    postModel.findByPk(id)
        .then(datas => {
            if (!datas) {
                return res.status(400).send('No post');
            }

            return res.status(200).send(datas);
        })
        .catch(err => {
            return res.status(400).send({
                message: "Error retrieving New with id=" + id
            });
        });
};

// Update a New by the id in the request
exports.update = async (req, res) => {
    const id = parseInt(req.params.id);

    if (!(id > 0))
        return res.status(400).send('post not exist!');

    const role = req.user.role || null
    if (!role && !(role === 'admin' || role === 'edit')) {
        return res.status(400).send('No permission access.');
    }

    const dataUpdate = {}

    //update title
    if (req.body.title)
        dataUpdate.title = req.body.title
    //update content
    if (req.body.content)
        dataUpdate.content = req.body.content
    //update slug
    if (req.body.slug)
        dataUpdate.slug = req.body.slug
    //update slug
    if (req.body.featureImage)
        dataUpdate.featureImage = req.body.featureImage
    //update content
    if (req.body.excerpt)
        dataUpdate.excerpt = req.body.excerpt + '...'
    //update slug
    if (req.body.theme)
        dataUpdate.theme = req.body.theme
    //update slug
    if (req.body.category)
        dataUpdate.category = req.body.category
    //update slug
    if (req.body.published)
        dataUpdate.published = req.body.published

    if (isEmpty(dataUpdate))
        return res.status(400).send({
            message: "Update failed!"
        });

    postModel.update(dataUpdate, {
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
        return res.status(400).send('post not exist!');

    const role = req.user.role || null
    if (!role && !(role === 'admin' || role === 'edit')) {
        return res.status(400).send('No permission access.');
    }

    postModel.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                return res.status(200).send({
                    message: "New was deleted successfully!"
                });
            } else {
                return res.status(400).send({
                    message: `Cannot delete New with id=${id}. Maybe New was not found!`
                });
            }
        })
        .catch(err => {
            return res.status(400).send({
                message: "Could not delete New with id=" + id
            });
        });
};
