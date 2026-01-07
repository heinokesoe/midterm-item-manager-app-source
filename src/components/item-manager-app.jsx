import "./item-manager-app.css"

import { useState, useRef } from "react";

import deleteLogo from '../assets/delete.svg';
import stationaryLogo from '../assets/ink_pen.svg';
import kitchenwareLogo from "../assets/flatware.svg";
import applianceLogo from "../assets/electrical_services.svg";

function ItemManager () {

  /*
   * !!! IMPORTANT !!!
   * - You MUST use the given states and refs in your code.
   * - You MAY add additional state, refs, and variables if needed.
   */

  const [items, setItems] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  // You must use this ref for the item name input
  const itemName = useRef(null);

  //TODO: Your code goes here
  // Additional refs for category and price
  const categoryRef = useRef(null);
  const priceRef = useRef(null);

  // State for next ID (auto-incrementing)
  const [nextId, setNextId] = useState(1);

  // Helper function to get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Stationary':
        return stationaryLogo;
      case 'Kitchenware':
        return kitchenwareLogo;
      case 'Appliance':
        return applianceLogo;
      default:
        return null;
    }
  };

  // Validation function
  const validateItem = (name, category, price) => {
    // Check if name is empty
    if (!name || name.trim() === '') {
      return 'Item name must not be empty';
    }

    // Check if item name is duplicated (case insensitive)
    const isDuplicate = items.some(
      item => item.name.toLowerCase() === name.trim().toLowerCase()
    );
    if (isDuplicate) {
      return 'Item must not be duplicated';
    }

    // Check if category is selected
    if (!category || category === '') {
      return 'Please select a category';
    }

    // Check if price is less than 0
    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue < 0) {
      return 'Price must not be less than 0';
    }

    return ''; // No errors
  };

  // Handle Add Item
  const handleAddItem = () => {
    const name = itemName.current.value;
    const category = categoryRef.current.value;
    const price = priceRef.current.value;

    // Validate
    const error = validateItem(name, category, price);
    if (error) {
      setErrorMsg(error);
      return;
    }

    // Add item to list
    const newItem = {
      id: nextId,
      name: name.trim(),
      category: category,
      price: parseFloat(price).toFixed(2)
    };

    setItems([...items, newItem]);
    setNextId(nextId + 1);
    setErrorMsg('');

    // Clear form
    itemName.current.value = '';
    categoryRef.current.value = '';
    priceRef.current.value = '';
  };

  // Handle Delete Item
  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  /*
   * !!! IMPORTANT !!!
   * - Implement your output based on the given sample layout.
   * - The id and className attributes below MUST be preserved.
   * - Your CSS MUST use the existing id and className selectors.
   */
  return (
    <>
      <div id="h1">
        Item Management
      </div>
      <div id="data-area">
        <table id="item-table" className="item-table">
          <thead>
            <tr>
              <th id="col-item-id">ID</th>
              <th id="col-item-name">Name</th>
              <th id="col-item-category">Category</th>
              <th id="col-item-price">Price</th>
              <th id="col-item-action">Action</th>
            </tr>
          </thead>
          <tbody>
            {/*
              * TODO: Your code goes here
              * !!! IMPORTANT !!!
              * - All items must be listed here (above the form row).
              * - Your input form must be implemented as the LAST row in this table.
              */}
            {/* Render existing items */}
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <img
                    src={getCategoryIcon(item.category)}
                    alt={item.category}
                    className="category-icon"
                  />
                </td>
                <td>{item.price}</td>
                <td>
                  <img
                    src={deleteLogo}
                    alt="Delete"
                    className="delete-icon"
                    onClick={() => handleDeleteItem(item.id)}
                  />
                </td>
              </tr>
            ))}

            {/* Input form row */}
            <tr>
              <td></td>
              <td>
                <input
                  type="text"
                  ref={itemName}
                  placeholder="Item name"
                />
              </td>
              <td>
                <select ref={categoryRef} defaultValue="">
                  <option value="" disabled></option>
                  <option value="Stationary">Stationary</option>
                  <option value="Kitchenware">Kitchenware</option>
                  <option value="Appliance">Appliance</option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  ref={priceRef}
                  placeholder="0"
                />
              </td>
              <td>
                <button onClick={handleAddItem}>Add Item</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="error-message">
         {/* You MUST display the errorMsg state here. */}
        {errorMsg}
      </div>
    </>
  );
}

export default ItemManager
