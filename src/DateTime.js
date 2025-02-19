// filepath: /d:/REACT NOTES/ultimate-react-course-main/my-to-do-list/src/DateTime.js
import { useState, useEffect } from "react";
import React from "react";
import "./App.css"; // Ensure this path is correct

function DateTime() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second for real-time clock

    return () => clearInterval(timer);
  }, []);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDateTime.toLocaleDateString(undefined, options);
  const formattedTime = currentDateTime.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit", // Show seconds for real-time updates
  });

  return (
    <div className="date-time">
      <div className="date">{formattedDate}</div>
      <div className="time">{formattedTime}</div>
    </div>
  );
}

export default DateTime;
