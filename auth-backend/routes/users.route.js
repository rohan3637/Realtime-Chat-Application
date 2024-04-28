const express = require("express");
const getUsers = require("../controllers/users.controller.js");
const verifyToken = require("../middleware/verifyToken.js");

const router = express.Router();

router.get("/", verifyToken, getUsers);

module.exports = router;
