import React from "react";
import { render } from "@testing-library/react";
import Logo from "../components/Logo/Logo"; // Update the path to the Logo component
import { expect } from 'chai';

// Configure the virtual DOM environment
require('jsdom-global')();

describe("Logo Component", () => {
  it("renders the Logo component", () => {
    const { getByText } = render(<Logo />);
    const logoText = getByText("🌴 Far Away 🎒");
    expect(logoText).to.exist;
  });
});
