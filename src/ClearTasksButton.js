import React from "react";

function ClearTasksButton({ onClearTasks }) {
  return (
    <button onClick={onClearTasks} className="clear-tasks-button">
      Clear All
    </button>
  );
}

export default ClearTasksButton;
