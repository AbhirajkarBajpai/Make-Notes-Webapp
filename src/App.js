import React, { useState } from "react";
import "./App.css";
import NewNote from "./Components/NewNote/NewNote";
import Note from "./Components/Note/Note";
import Modal from "./Components/UI/Modal";

const DUMMY_NOTES = [];

function App() {
  const [notes, setNotes] = useState(DUMMY_NOTES);
  const [isUpdating, setIsUpdating] = useState(false);
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredText, setEnteredText] = useState("");
  const[editItem,setEditItem]=useState(null);
  var editNote;

  function addNoteHandler(note) {
    setNotes((prevNote) => {
      return [note, ...prevNote];
    });
  }

  function removeNoteHandler(completedNoteId) {
    const updatedNote = notes.filter((note) => {
      return note.id !== completedNoteId;
    });
    setNotes(updatedNote);
  }
  function updateNoteHandler(noteId) {
    editNote = notes.find((elem) => {
      return (elem.id = noteId);
    });
    setEnteredTitle(editNote.title);
    setEnteredText(editNote.Text);
    setEditItem(editNote.id);
    setIsUpdating(true);
  }
  function updateNote() {
    setNotes(
      notes.map((note) => {
        if (note.id === editItem) {
          return { ...note, title: enteredTitle, Text: enteredText };
        }
        return note;
      })
    );
    setIsUpdating(false);
  }

  function titleChangeHandler(event) {
    setEnteredTitle(event.target.value);
  }
  function textChangeHandler(event) {
    setEnteredText(event.target.value);
  }
  return (
    <div className="App">
      {isUpdating && (
        <Modal>
          <form onSubmit={updateNote}>
            <div className="new-note__controls">
              <div className="new-note__control">
                <lable>Title</lable>
                <br />
                <input
                  type="text"
                  placeholder="Enter Title"
                  value={enteredTitle}
                  onChange={titleChangeHandler}
                />
              </div>
              <div className="new-note__control">
                <lable>Your Note</lable>
                <br />
                <textarea
                  rows="7"
                  className="main-note"
                  placeholder="Write Your Note Here..."
                  value={enteredText}
                  onChange={textChangeHandler}
                />
              </div>
              <div className="new-note__actions">
                <button type="Submit" className="custom-btn btn-5">update Note</button>
              </div>
            </div>
          </form>
        </Modal>
      )}
      <h1 style={{ color: "lightyellow" }}>Welcome To Notes</h1>
      <NewNote onAddNote={addNoteHandler} />
      <Note
        items={notes}
        onUpdateNote={updateNoteHandler}
        onRemoveNote={removeNoteHandler}
      />
    </div>
  );
}

export default App;
