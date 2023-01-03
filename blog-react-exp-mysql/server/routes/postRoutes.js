const express = require('express');
const router = express.Router();
const post = require("../controllers/postController.js");
const middleware = require('../middleware');

// Create a new Tutorial
router.post("/", middleware.isAuth, post.create);

// Retrieve all post
router.get("/", post.findAll);

// Retrieve all published post
router.get("/published", post.findAllPublished);

// Retrieve post by category
router.get("/category/:id", post.findByCategory);

// Retrieve a single Tutorial with id
router.get("/:id", post.findOne);

// Update a Tutorial with id
router.put("/:id", middleware.isAuth, post.update);

// Delete a Tutorial with id
router.delete("/:id", middleware.isAuth, post.delete);

module.exports = router;
