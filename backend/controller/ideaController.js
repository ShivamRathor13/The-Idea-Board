const Idea = require("../models/ideaModel");

async function getIdeas(req, res, next) {
  try {
    const ideas = await Idea.getAllIdeas();
    res.json(ideas);
  } catch (err) {
    next(err);
  }
}

async function createIdea(req, res, next) {
  try {
    const text = req.body.text;
    if (!text) return res.status(400).json({ error: "Text required" });
    const newIdea = await Idea.addIdea(text);
    res.status(201).json(newIdea);
  } catch (err) {
    next(err);
  }
}

async function upvoteIdea(req, res, next) {
  try {
    const updatedIdea = await Idea.upvoteIdea(req.params.id);
    if (!updatedIdea) return res.status(404).json({ error: "Not found" });
    res.json(updatedIdea);
  } catch (err) {
    next(err);
  }
}

module.exports = { getIdeas, createIdea, upvoteIdea };
