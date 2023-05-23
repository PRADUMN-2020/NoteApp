import React from "react";

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }
  function handleEdit() {
    props.onEdit({
      title: props.title,
      content: props.content,
      id: props.id,
    });
  }
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>Delete</button>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
}

export default Note;
