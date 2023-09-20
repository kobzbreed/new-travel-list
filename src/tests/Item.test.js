import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'chai';
import sinon from 'sinon';
import Item from '../components/Item/Item';

// Configure the virtual DOM environment
require('jsdom-global')();

describe('Item Component', () => {
  const item = {
    id: 1,
    description: 'Test Item',
    quantity: 2,
    packed: false,
  };

  it('renders the item with correct details', () => {
    const { getByText } = render(<Item item={item} />);
    expect(getByText('2 Test Item')).to.exist;
  });

  it('calls onDeleteItem when delete button is clicked', () => {
    const onDeleteItem = sinon.spy();
    const { getByText } = render(<Item item={item} onDeleteItem={onDeleteItem} />);
    const deleteButton = getByText('❌');
    fireEvent.click(deleteButton);
    expect(onDeleteItem.calledWith(1)).to.be.true;
  });

  it('calls onToggleItem when checkbox is clicked', () => {
    const onToggleItem = sinon.spy();
    const { getByRole } = render(<Item item={item} onToggleItem={onToggleItem} />);
    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(onToggleItem.calledWith(1)).to.be.true;
  });

  it('crosses out the text when item is packed', () => {
    const packedItem = { ...item, packed: true };
    const { getByText } = render(<Item item={packedItem} />);
    const itemText = getByText('2 Test Item');
    const style = window.getComputedStyle(itemText);
    expect(style.textDecoration).to.equal('line-through');
  });

  it('does not cross out the text when item is not packed', () => {
    const { getByText } = render(<Item item={item} />);
    const itemText = getByText('2 Test Item');
    const style = window.getComputedStyle(itemText);
    expect(style.textDecoration).to.not.equal('line-through');
  });
});
