import { useState, useEffect, useRef } from "react";
import Note from "./components/Note";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import Togglable from "./components/Togglable";
import noteService from "./services/notes";
import LoginForm from "./components/LoginForm";
import NoteForm from "./components/NoteForm";
import TestPage from "./pages/testPage";
import LogButtonClicks from "./pages/counterPage";

const App = () => {
  const [notes, setNotes] = useState([]);
  // const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const logout = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    setUser(null);
  };

  const addNote = async (noteObject) => {
    try {
      const createdNote = await noteService.create({
        ...noteObject,
        userId: noteService.setUserId(user.token),
      });
      setNotes(notes.concat(createdNote));
      noteFormRef.current.toggleVisibility();
    } catch (error) {
      setErrorMessage("Unable to create a new note");
    }
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const noteFormRef = useRef();

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={errorMessage} />

      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} />
        </Togglable>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <p>{user.name} logged-in</p>
            <button onClick={logout}>Logout</button>
          </div>

          <Togglable buttonLabel="create new note" ref={noteFormRef}>
            <NoteForm createNote={addNote} />
          </Togglable>
        </div>
      )}

      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important notes" : "all notes"}
        </button>
      </div>

      <Togglable buttonLabel={"show TestPage"}>
        <TestPage />
      </Togglable>

      <Togglable buttonLabel={"show CounterPage"}>
        <LogButtonClicks />
      </Togglable>

      <Footer />
    </div>
  );
};
export default App;
