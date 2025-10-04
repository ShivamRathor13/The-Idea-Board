const express = require("express");
const router = express.Router();
const {
  getIdeas,
  createIdea,
  upvoteIdea,
} = require("../controller/ideaController");

router.get("/", getIdeas);
router.post("/", createIdea);
router.post("/:id/upvote", upvoteIdea);

module.exports = router;
