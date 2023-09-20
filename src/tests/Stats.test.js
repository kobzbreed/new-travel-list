import { render } from "@testing-library/react";
import { expect } from "chai";
import React from "react";
import Stats from "../components/Stats/Stats";

// Configure the virtual DOM environment
require('jsdom-global')();

describe("<Stats />", () => {
  it("should display 'Start adding some items' message when items are empty", () => {
    const { container } = render(<Stats items={[]} />);
    const message = container.querySelector(".stats em").textContent.trim();
    expect(message).to.equal("Start adding some items to your list 🚀");
  });

  it("should display correct stats message when there are items", () => {
    const items = [
      { name: "Item 1", packed: true },
      { name: "Item 2", packed: false },
      { name: "Item 3", packed: true },
    ];

    const numItems = items.length;
    const numPacked = items.filter((item) => item.packed).length;
    const percentage = Math.round((numPacked / numItems) * 100);

    const { container } = render(<Stats items={items} />);
    const message = container.querySelector(".stats em").textContent.trim();
    
    const expectedMessageParts = [
      "💼 You have",
      numItems.toString(),
      "items on your list,",
      "and",
      "you",
      "already",
      "packed",
      numPacked.toString(),
      `(${percentage}%)`,
    ];
    
    // Check if all expected message parts are present in the actual message
    expectedMessageParts.forEach(part => {
      expect(message).to.include(part);
    });
  });

  it("should display 'You got everything! Ready to go' message when all items are packed", () => {
    const items = [
      { name: "Item 1", packed: true },
      { name: "Item 2", packed: true },
    ];

    const { container } = render(<Stats items={items} />);
    const expectedMessage = "You got everything! Ready to go ✈";
    const message = container.querySelector(".stats em").textContent.trim();
    
    expect(message).to.equal(expectedMessage);
  });
});
