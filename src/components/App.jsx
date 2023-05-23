import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreatArea";
import Edit from "./Edit";
function App() {
  const [notes, setNotes] = useState([]);
  const [editNote, setEditNote] = useState(false);
  const [editText, setEditText] = useState({});
  function addNote(noteText) {
    setNotes((prevNotes) => {
      return [...prevNotes, noteText];
    });
  }
  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((note, index) => {
        return index !== id;
      });
    });
  }
  function editFun(editText) {
    setEditNote(true);
    setEditText(editText);
  }
  function confirmEdit(editText, id) {
    var arr = notes;
    console.log(arr);
    arr[id] = editText;
    setNotes(arr);
    setEditNote(false);
  }
  function checkTitle(title, id = null, edit = false) {
    console.log(id, edit);
    var ans = false;
    var arr = notes;
    if (!edit) {
      arr.forEach((note, index) => {
        if (note.title === title) {
          ans = true;
        }
      });
    } else {
      arr.forEach((note, index) => {
        if (note.title === title) {
          if (index !== id) ans = true;
        }
      });
    }

    return ans;
  }
  return (
    <div>
      <Header />
      {editNote ? (
        <Edit
          title={editText.title}
          content={editText.content}
          confirmEdit={confirmEdit}
          id={editText.id}
          checkTitle={checkTitle}
        />
      ) : (
        <div>
          <CreateArea onAdd={addNote} checkTitle={checkTitle} />
          {notes.map((currNote, index) => {
            return (
              <Note
                key={index}
                title={currNote.title}
                content={currNote.content}
                id={index}
                onDelete={deleteNote}
                onEdit={editFun}
                checkTitle={checkTitle}
              />
            );
          })}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
