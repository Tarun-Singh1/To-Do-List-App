import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function BackgroundImage() {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    async function fetchImage() {
      try {
        const response = await axios.get(
          "https://api.unsplash.com/photos/random",
          {
            params: { query: "landscape", orientation: "landscape" },
            headers: {
              Authorization: `Client-ID DaQC6PdAZMvQXT7qhIYuT6n4hEWXhvzhlcdgaEid4vU`,
            },
          }
        );
        setImageUrl(response.data.urls.full);
      } catch (error) {
        console.error("Error fetching the image", error);
      }
    }

    fetchImage();
  }, []);

  return (
    <>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>{" "}
      <div className="background-overlay"></div>
    </>
  );
}

export default BackgroundImage;
