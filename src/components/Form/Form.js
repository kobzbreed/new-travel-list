import React, { useState } from "react";
import ErrorHandler from "../error_handler"; // Import the ErrorHandler component

// Check if the window object is defined (browser environment)
if (typeof window !== "undefined") {
  require("./Form.css"); // Import CSS only in a browser environment
}

export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  function handleQuantityChange(newValue) {
    setQuantity(newValue);
  }

  function handleKeyDown(e) {
    if (e.key === "Delete" || e.key === "Backspace") {
      setQuantity(1);
    }
  }

  return (
    // Wrap your component with ErrorHandler
    <ErrorHandler>
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need for your trip 😉?</h3>
        <div className="horizontal-container">
          <input
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
            onKeyDown={handleKeyDown}
            min="1"
          />
          <input
            type="text"
            placeholder="Item..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit" className="add-button">
            Add
          </button>
        </div>
      </form>
    </ErrorHandler>
  );
}

