const express = require("express");
const { getMsgsForConversation } = require("../controllers/msg.controller.js");

const router = express.Router();

router.get("/", getMsgsForConversation);

module.exports = router;
