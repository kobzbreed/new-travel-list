import { render, fireEvent } from "@testing-library/react";
import { expect } from "chai";
import React from "react";
import PackingList from "../components/PackingList/PackingList";

// Configure the virtual DOM environment
require('jsdom-global')();

describe("<PackingList />", () => {
  it("should render a list of items sorted by input order by default", () => {
    const items = [
      { id: 1, description: "Item 1", packed: false },
      { id: 2, description: "Item 2", packed: true },
    ];

    const { container } = render(
      <PackingList items={items} onDeleteItem={() => {}} onToggleItem={() => {}} onClearList={() => {}} />
    );

    // Check if the items are displayed in input order (default)
    const itemElements = container.querySelectorAll(".list ul li");
    expect(itemElements.length).to.equal(items.length);
    expect(itemElements[0].textContent).to.include("Item 1");
    expect(itemElements[1].textContent).to.include("Item 2");
  });

  it("should sort items by description when 'Sort by description' is selected", () => {
    const items = [
      { id: 1, description: "B Item", packed: false },
      { id: 2, description: "A Item", packed: false },
    ];

    const { container, getByText } = render(
      <PackingList items={items} onDeleteItem={() => {}} onToggleItem={() => {}} onClearList={() => {}} />
    );

    // Select 'Sort by description' from the dropdown
    const select = container.querySelector("select");
    fireEvent.change(select, { target: { value: "description" } });

    // Check if the items are sorted by description
    const itemElements = container.querySelectorAll(".list ul li");
    expect(itemElements.length).to.equal(items.length);
    expect(itemElements[0].textContent).to.include("A Item");
    expect(itemElements[1].textContent).to.include("B Item");
  });

  it("should sort items by packed status when 'Sort by packed status' is selected", () => {
    const items = [
      { id: 1, description: "Item 1", packed: false },
      { id: 2, description: "Item 2", packed: true },
    ];

    const { container, getByText } = render(
      <PackingList items={items} onDeleteItem={() => {}} onToggleItem={() => {}} onClearList={() => {}} />
    );

    // Select 'Sort by packed status' from the dropdown
    const select = container.querySelector("select");
    fireEvent.change(select, { target: { value: "packed" } });

    // Check if the items are sorted by packed status
    const itemElements = container.querySelectorAll(".list ul li");
    expect(itemElements.length).to.equal(items.length);
    expect(itemElements[0].textContent).to.include("Item 1");
    expect(itemElements[1].textContent).to.include("Item 2");
  });

  it("should clear the list when 'Clear list' button is clicked", () => {
    const items = [
      { id: 1, description: "Item 1", packed: false },
      { id: 2, description: "Item 2", packed: true },
    ];

    let cleared = false;
    const handleClearList = () => {
      cleared = true;
    };

    const { getByText } = render(
      <PackingList items={items} onDeleteItem={() => {}} onToggleItem={() => {}} onClearList={handleClearList} />
    );

    // Click the 'Clear list' button
    const clearListButton = getByText("Clear list");
    fireEvent.click(clearListButton);

    // Check if the onClearList callback was called
    expect(cleared).to.equal(true);
  });
});
