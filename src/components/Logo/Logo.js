import React from "react";
import ErrorHandler from "../error_handler"; // Import the ErrorHandler component

// Check if the window object is defined (browser environment)
if (typeof window !== "undefined") {
  require("./Logo.css");
}

export default function Logo() {
  return (
    // Wrap your component with ErrorHandler
    <ErrorHandler>
      <h1>🌴 Far Away 🎒</h1>
    </ErrorHandler>
  );
}