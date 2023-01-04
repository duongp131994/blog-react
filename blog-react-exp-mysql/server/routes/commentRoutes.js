const express = require('express');
const router = express.Router();
const comment = require("../controllers/commentController.js");
const middleware = require('../configs/middleware');

// Retrieve post by category
router.get("/post/:id", comment.findByPost);

// Retrieve a single Tutorial with id
router.get("/:id", comment.findOne);

// Retrieve all post
router.get("/", comment.findAll);

// Create a new Tutorial
router.post("/", comment.create);

// Delete a Tutorial with id
router.delete("/:id", middleware.isAuth, comment.delete);

module.exports = router;
