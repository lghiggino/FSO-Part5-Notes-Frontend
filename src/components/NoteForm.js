import { useState } from "react";
import { PropTypes } from "prop-types";

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState("");

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const addNote = (event) => {
    event.preventDefault();
    createNote({
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    });

    setNewNote("");
  };

  return (
    <>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} id="input-note" />
        <button type="submit">save</button>
      </form>
    </>
  );
};

NoteForm.propTypes = {
  createNote: PropTypes.func.isRequired,
};

export default NoteForm;
