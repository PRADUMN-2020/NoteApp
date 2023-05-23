import React, { useState } from "react";

function CreateArea(props) {
  const [noteText, setNoteText] = useState({
    title: "",
    content: "",
  });
  const [warning, setWarning] = useState({
    title: false,
    content: false,
  });
  const [sameTitle, setSameTitle] = useState(false);

  function handleChange(event) {
    const { value, name } = event.target;
    setNoteText((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }
  function handleSubmit(event) {
    if (!noteText.title) {
      setWarning({ ...warning, title: true });
    } else {
      if (props.checkTitle(noteText.title)) {
        setSameTitle(true);
      } else {
        setSameTitle(false);
        if (warning.title) {
          setWarning((prevWarning) => ({
            ...prevWarning,
            title: false,
          }));
        }
        if (noteText.content.length === 0 && noteText.title.length < 10) {
          setWarning((prevWarning) => ({
            ...prevWarning,
            content: true,
          }));
        } else {
          if (warning.content) {
            setWarning((prevWarning) => ({
              ...prevWarning,
              content: false,
            }));
          }
          props.onAdd(noteText);
          setNoteText({
            title: "",
            content: "",
          });
        }
      }
    }
    event.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          name="title"
          placeholder="Title"
          value={noteText.title}
        />
        {warning.title && <p className="warning">This field cant be empty.</p>}
        {sameTitle && (
          <p className="warning">
            This title already exits please try another one.
          </p>
        )}
        <textarea
          onChange={handleChange}
          name="content"
          placeholder="Description...."
          rows="3"
          value={noteText.content}
        />
        {warning.content && (
          <p className="warning">This field cant be empty.</p>
        )}
        <button onClick={handleSubmit}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
