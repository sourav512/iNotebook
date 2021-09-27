const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
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
    try {
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
      res.status(200).send({ savedNote, msg: "data saved on db" });
    } catch (err) {
      res.status(500).send("internal server error");
    }
  }
);

router.put("/updatenote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    console.log(note);
    if (!note) {
      // console.log(note.user.toString(), "!==" ,req.user.id)
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      // console.log(note.user.toString(), "!==" ,req.user.id)
      return res.status(401).json({ note, msg: "not athorised" });
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/deletenote/:id", fetchUser,async(req,res)=>{
    let note = await Note.findById(req.params.id);
    console.log(note);
    if (!note) {
      // console.log(note.user.toString(), "!==" ,req.user.id)
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      // console.log(note.user.toString(), "!==" ,req.user.id)
      return res.status(401).json({ note, msg: "not athorised" });
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ "success":"note deleted" });
});


module.exports = router;
