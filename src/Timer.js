import React, { useState, useEffect, useCallback } from "react";
import "./Timer.css";
import oldTimerSound from "./old_timer.mp3";

function Timer() {
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [streak, setStreak] = useState(0);
  const [weeklyProgress, setWeeklyProgress] = useState({});
  const [showWeeklyProgress, setShowWeeklyProgress] = useState(false);

  const updateStreak = useCallback(() => {
    const today = new Date().toLocaleDateString();
    const newStreak = streak + 1;
    setStreak(newStreak);

    const updatedProgress = { ...weeklyProgress, [today]: newStreak };
    setWeeklyProgress(updatedProgress);
    localStorage.setItem("weeklyProgress", JSON.stringify(updatedProgress));
  }, [streak, weeklyProgress]);

  useEffect(() => {
    let timer;

    if (isRunning && totalTime > 0) {
      timer = setInterval(() => {
        setTotalTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (totalTime === 0 && isRunning) {
      triggerNotification(); // Show notification
      resetTimer(); // Reset the timer when time runs out
      updateStreak(); // Update the streak
    }

    return () => clearInterval(timer);
  }, [isRunning, totalTime, updateStreak]);

  const startTimer = () => {
    const totalSeconds = parseInt(minutes) * 60;
    if (totalSeconds > 0) {
      setTotalTime(totalSeconds);
      setSeconds(totalSeconds);
      setIsRunning(true);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTotalTime(0);
    setMinutes("");
    setSeconds(0);
  };

  const displayTime = () => {
    const mins = Math.floor(totalTime / 60);
    const secs = totalTime % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const progress = totalTime > 0 ? (totalTime / seconds) * 100 : 0;

  const triggerNotification = () => {
    if (Notification.permission === "granted") {
      new Notification("Time is Over!", {
        body: "Your timer has finished.",
        icon: "https://cdn-icons-png.flaticon.com/512/2942/2942871.png", // You can replace this with any timer icon URL
      });

      // Vibration (for devices that support it)
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
      }

      // Play the imported sound
      const audio = new Audio(oldTimerSound);
      audio.play();
    } else {
      alert("Time is over!"); // Fallback for browsers that don’t support notifications
    }
  };

  useEffect(() => {
    // Request notification permission when the app loads
    if (
      Notification.permission !== "granted" &&
      Notification.permission !== "denied"
    ) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
        } else {
          console.log("Notification permission denied.");
        }
      });
    }

    // Load weekly progress from localStorage
    const storedProgress =
      JSON.parse(localStorage.getItem("weeklyProgress")) || {};
    setWeeklyProgress(storedProgress);

    // Reset streak if the date has changed
    const today = new Date().toLocaleDateString();
    if (storedProgress[today]) {
      setStreak(storedProgress[today]);
    } else {
      setStreak(0);
    }
  }, []);

  const toggleWeeklyProgress = () => {
    setShowWeeklyProgress(!showWeeklyProgress);
  };

  return (
    <div className="timer-app">
      <h1>Timer</h1>
      <div className="timer-circle">
        <svg>
          <circle className="background" cx="50" cy="50" r="45"></circle>
          <circle
            className="progress"
            cx="50"
            cy="50"
            r="45"
            style={{ strokeDashoffset: `${282.6 - (282.6 * progress) / 100}` }}
          ></circle>
        </svg>
        <div className="timer-display">{displayTime()}</div>
      </div>
      <div className="controls">
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          placeholder="Enter min..."
          disabled={isRunning}
        />
        <div className="buttons">
          <button onClick={startTimer} disabled={isRunning || totalTime > 0}>
            Start
          </button>
          <button onClick={resetTimer}>Reset</button>
        </div>
      </div>
      <div className="streak">
        <p>Today's Streak: {streak}🔥</p>
        <button onClick={toggleWeeklyProgress}>
          {showWeeklyProgress ? "Hide Weekly Progress" : "Show Weekly Progress"}
        </button>
        {showWeeklyProgress && (
          <div className="weekly-progress">
            <h2>Weekly Progress</h2>
            <ul>
              {Object.entries(weeklyProgress).map(([date, count]) => (
                <li key={date}>
                  {date}: {count} timers
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Timer;
