const express = require("express");
const router = express.Router();

// import controlles
const conversationController = require("../controllers/conversationController");

router.post("/init", conversationController.createInitConversation);
router.post('/intervju', conversationController.continueСonversation)
router.get("/joblist", conversationController.getAllOccupationalButtons)

module.exports = router;
