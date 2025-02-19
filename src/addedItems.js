import React, { useState } from "react";
import TaskOptions from "./TaskOptions";

function AddedItems({ tasks, onDeleteTask, onMarkDone, onEditTask }) {
  const [editMode, setEditMode] = useState(null);
  const [editText, setEditText] = useState("");

  function handleEditClick(id, task) {
    setEditMode(id);
    setEditText(task);
  }

  function handleSaveEdit(id) {
    onEditTask(id, editText);
    setEditMode(null);
  }

  return (
    <ul className="item-container">
      {tasks.map(({ id, task, isDone }) => (
        <li key={id} className={`added-task ${isDone ? "done" : ""}`}>
          {editMode === id ? (
            <>
              <input
                className="edit-input"
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button className="save-btn" onClick={() => handleSaveEdit(id)}>
                Save
              </button>
            </>
          ) : (
            <>
              {task}
              <TaskOptions
                onMarkDone={() => onMarkDone(id)}
                onDelete={() => onDeleteTask(id)}
                onEdit={() => handleEditClick(id, task)}
              />
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default AddedItems;
