const express = require('express');
const router = express.Router();
const user = require("../controllers/userController.js");
const middleware = require('../configs/middleware');

// Create a new user
router.post("/signup", user.register);

// Retrieve all user
router.post("/signin", user.login);

// Retrieve accessToken
router.post("/refresh", user.refreshToken);

// Retrieve all published user
router.get("/search", user.findAll);

// Retrieve a single user with id
router.get("/:id", middleware.isAuth, user.findOne); // check user role theo user token

// Update a user with id
router.put("/:id", middleware.isAuth, user.update);

// Delete a user with id
router.delete("/:id", middleware.isAuth, user.delete);

module.exports = router;