import React from "react";
import "./App.css";
import { useState } from "react";

function AddItems({ onAddTask }) {
  const [task, setTask] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!task) return;

    const newTask = { id: crypto.randomUUID(), task };
    onAddTask(newTask);
    setTask(""); // Reset input field
    console.log(newTask);
  }
  return (
    <form className="addItems" onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a new task"
      />
      <button className="add-btn" type="submit">
        Add
      </button>
    </form>
  );
}

export default AddItems;
