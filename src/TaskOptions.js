import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function TaskOptions({ onMarkDone, onDelete, onEdit }) {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);

  const toggleOptions = () => setShowOptions(!showOptions);

  const handleClickOutside = (event) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    if (showOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);

  return (
    <div className="task-options" ref={optionsRef}>
      <button className="options-btn" onClick={toggleOptions}>
        ⋮
      </button>
      {showOptions && (
        <div className="options-menu">
          <button className="option-btn" onClick={onMarkDone}>
            ✅
          </button>
          <button className="option-btn" onClick={onDelete}>
            ❌
          </button>
          <button className="option-btn" onClick={onEdit}>
            ✏️
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskOptions;
