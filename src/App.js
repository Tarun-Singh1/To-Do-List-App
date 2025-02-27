import React, { useState } from "react";
import Header from "./header";
import AddItems from "./addItem";
import AddedItems from "./addedItems";
import Advice from "./Advice";
import { useEffect } from "react";
import DateTime from "./DateTime";
import "./App.css";
import BackgroundImage from "./BackgroundImage";
import ClearTasksButton from "./ClearTasksButton";
import Timer from "./Timer";
const LOCAL_STORAGE_KEY = "tasks";

// const initialTasks = [
//   { id: 1, task: "task1", isDone: false },
//   { id: 2, task: "task2", isDone: false },
//   { id: 3, task: "task3", isDone: false },
// ];

function App() {
  // const [tasks, setTasks] = useState(initialTasks);
  const [tasks, setTasks] = useState(() => {
    // Load tasks from local storage
    const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Save tasks to local storage whenever `tasks` change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTask(newTask) {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  function handleDeleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  function handleMarkDone(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  }

  function handleEditTask(id, newTaskText) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, task: newTaskText } : task
      )
    );
  }
  function handleClearTasks() {
    setTasks([]);
  }

  return (
    <div className="App">
      <BackgroundImage />
      <Header />

      <DateTime />
      <div className="task-controls">
        <AddItems onAddTask={handleAddTask} />
        <ClearTasksButton onClearTasks={handleClearTasks} />
      </div>
      {/* <AddItems onAddTask={handleAddTask} /> */}
      <AddedItems
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        onMarkDone={handleMarkDone}
        onEditTask={handleEditTask}
      />
      {/* <ClearTasksButton onClearTasks={handleClearTasks} /> */}

      <Advice />
      <Timer />
    </div>
  );
}

export default App;
