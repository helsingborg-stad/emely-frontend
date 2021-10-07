const express = require("express");
const router = express.Router();

// import controlles
const conversationController = require("../controllers/conversationController");

router.post("/init", conversationController.createInitConversation);


module.exports = router;
