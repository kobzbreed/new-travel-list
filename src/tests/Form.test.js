import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect } from "chai"; // Import expect from Chai
import sinon from "sinon";
import React from "react";
import Form from "../components/Form/Form";

// Configure the virtual DOM environment
require("jsdom-global")();

describe("Form Component", () => {
  it("should call onAddItems when the form is submitted", () => {
    const onAddItems = sinon.spy();
    const { getByPlaceholderText, getByText } = render(<Form onAddItems={onAddItems} />);
  
    const input = getByPlaceholderText("Item...");
  
    userEvent.type(input, "Test Item");
    
    // Simulate form submission
    fireEvent.submit(getByText("Add"));
  
    expect(onAddItems.calledOnce).to.be.true;
    expect(onAddItems.args[0][0].description).to.equal("Test Item");
  });

  it("should update quantity when the quantity input changes", () => {
    const { getByDisplayValue } = render(<Form onAddItems={() => {}} />);
    const quantityInput = getByDisplayValue("1");

    userEvent.clear(quantityInput);
    userEvent.type(quantityInput, "5");

    // Update this assertion
    expect(quantityInput).to.have.property("value", "5");
  });

  it("should reset quantity to an empty string on Backspace or Delete key press", () => {
    const { getByDisplayValue } = render(<Form onAddItems={() => {}} />);
    const quantityInput = getByDisplayValue("1");

    userEvent.clear(quantityInput);

    // Simulate Backspace key press
    userEvent.type(quantityInput, "{backspace}");
    expect(quantityInput).to.have.property("value", "");

    // Simulate Delete key press
    userEvent.type(quantityInput, "{del}");
    expect(quantityInput).to.have.property("value", "");
  });

  it("should not call onAddItems when the form is submitted with an empty description", () => {
    const onAddItems = sinon.spy();
    const { getByText } = render(<Form onAddItems={onAddItems} />);

    const addButton = getByText("Add");

    fireEvent.click(addButton);

    expect(onAddItems.called).to.be.false;
  });
});