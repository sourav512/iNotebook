const express = require("express");
const router = express.Router();
const Note = require("../models/Notes");
const fetchUser = require("../middleware/FetchUser");
const { body, validationResult } = require("express-validator");

//fetch all notes
router.get("/fetchnotes", fetchUser, async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
});

//create notes
router.post(
  "/createnote",
  fetchUser,
  [body("title", "enter valid email").isLength({ min: 3 })],
  async (req, res) => {
      try{
    const { title, description, tag } = req.body;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    const note = new Note({
      title,
      description,
      tag,
      user: req.user.id,
    });
    const savedNote = await note.save();
    res.status(200).send({savedNote,msg:"data saved on db"})
}catch(err){
    res.status(401).send("auth failed")
}
  }
);

module.exports = router;
