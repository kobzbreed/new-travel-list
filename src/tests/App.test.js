import React from "react";
import { render } from "@testing-library/react";
import { expect } from "chai";
import App from "../components/App/App";

// Configure the virtual DOM environment
require('jsdom-global')();

describe("<App />", () => {
  it("should render the App component with initial state", () => {
    const { getByText } = render(<App />);
    
    // Check if the App component renders the expected elements
    expect(getByText("🌴 Far Away 🎒")).to.exist;
    expect(getByText("What do you need for your trip 😉?")).to.exist;
    expect(getByText("Add")).to.exist;
    expect(getByText("Clear list")).to.exist;
    expect(getByText("Start adding some items to your list 🚀")).to.exist;
  });
});