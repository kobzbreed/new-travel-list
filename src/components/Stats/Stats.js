import React from "react";
import ErrorHandler from "../error_handler"; // Import the ErrorHandler component

// Check if the window object is defined (browser environment)
if (typeof window !== "undefined") {
  require("./Stats.css");
}

export default function Stats({ items }) {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    // Wrap your component with ErrorHandler
    <ErrorHandler>
      {numItems === 0 ? (
        <p className="stats">
          <em>Start adding some items to your list 🚀</em>
        </p>
      ) : (
        <footer className="stats">
          <em>
            {percentage === 100
              ? "You got everything! Ready to go ✈"
              : `💼 You have ${numItems} items on your list, 
              and you already packed ${numPacked} (${percentage}%)`}
          </em>
        </footer>
      )}
    </ErrorHandler>
  );
}
