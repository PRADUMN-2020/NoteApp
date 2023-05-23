import React, { useState } from "react";

function Edit(props) {
  const [editedNote, setEditedNote] = useState({
    title: props.title,
    content: props.content,
  });
  const [warning, setWarning] = useState({
    title: false,
    content: false,
  });

  const [sameTitle, setSameTitle] = useState(false);

  function handleChange(event) {
    const { value, name } = event.target;
    setEditedNote((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }
  function handleSubmit(event) {
    if (!editedNote.title) {
      setWarning({ ...warning, title: true });
    } else {
      if (props.checkTitle(editedNote.title, props.id, true)) {
        setSameTitle(true);
      } else {
        setSameTitle(false);
        if (warning.title) {
          setWarning((prevWarning) => ({
            ...prevWarning,
            title: false,
          }));
        }
        if (editedNote.content.length === 0 && editedNote.title.length < 10) {
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

          props.confirmEdit(editedNote, props.id);
          setEditedNote({
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
          value={editedNote.title}
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
          value={editedNote.content}
        />
        {warning.content && (
          <p className="warning">This field cant be empty.</p>
        )}
        <button onClick={handleSubmit}>Save</button>
      </form>
    </div>
  );
}

export default Edit;
