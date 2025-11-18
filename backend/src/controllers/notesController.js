import Note from "../models/Note.js";
// get all notes
export const getAllNotes = async (_, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // got all the notes using find()
    res.status(200).json(notes); // setting the status
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// create note
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body; // requesting body for title and content user has put.
    const note = new Note({ title, content }); // creates a new note
    const savedNote = await note.save(); // saves the note to the mongodb

    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body; // requesting for title and content
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    ); // findbyidupdate is use to find id and update req.params.id gets id from the url ,after that it updates the title and content
    if (!updatedNote) {
      return res.status(404).json({ message: "note not found" }); // if id is wrong
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in UpdateNote controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted Successfully" });
  } catch (error) {
    console.error("Error in deleteNote controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id); // got all the notes using find()
    if (!note) return res.status(404).json({ message: "Note not found" });

    res.status(200).json(note); // setting the status
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
