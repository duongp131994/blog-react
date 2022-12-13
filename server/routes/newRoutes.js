const express = require('express');
const router = express.Router();
const news = require("../controllers/newController.js");

// Create a new Tutorial
router.post("/", news.create);

// Retrieve all news
router.get("/", news.findAll);

// Retrieve all published news
router.get("/published", news.findAllPublished);

// Retrieve a single Tutorial with id
router.get("/:id", news.findOne);

// Update a Tutorial with id
router.put("/:id", news.update);

// Delete a Tutorial with id
router.delete("/:id", news.delete);

// Delete all news
router.delete("/", news.deleteAll);

// express().use('/api/news', router);

module.exports = router;
