const express = require('express');
const router = express.Router();
const categoryController = require("../controllers/categoryController.js");
const middleware = require('../configs/middleware');

// Retrieve a single Tutorial with id
router.get("/:id", categoryController.findOne);

// Retrieve all post
router.get("/", categoryController.findAll);

// Create a new Tutorial
router.post("/", middleware.isAuth, categoryController.create);

// Update a Tutorial with id
router.put("/:id", middleware.isAuth, categoryController.update);

// Delete a Tutorial with id
router.delete("/:id", middleware.isAuth, categoryController.delete);

module.exports = router;
