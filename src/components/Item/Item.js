import React from "react";
import ErrorHandler from "../error_handler"; // Import the ErrorHandler component

// Check if the window object is defined (browser environment)
if (typeof window !== "undefined") {
  require("./Item.css"); // Import CSS only in a browser environment
}

export default function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    // Wrap your component with ErrorHandler
    <ErrorHandler>
      <li>
        <input
          type="checkbox"
          value={item.packed}
          onChange={() => onToggleItem(item.id)}
        />
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.description}
        </span>
        <button onClick={() => onDeleteItem(item.id)}>❌</button>
      </li>
    </ErrorHandler>
  );
}
