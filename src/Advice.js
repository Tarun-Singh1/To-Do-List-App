import React, { useState, useEffect } from "react";
import "./App.css";

function Advice() {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAdvice() {
      setLoading(true);
      const res = await fetch("https://api.adviceslip.com/advice");
      const data = await res.json();
      setAdvice(data.slip.advice);
      setLoading(false);
    }

    getAdvice();
  }, []);

  return (
    <div className="advice">
      {loading ? <div className="spinner"></div> : <p>"{advice}"</p>}
    </div>
  );
}

export default Advice;
