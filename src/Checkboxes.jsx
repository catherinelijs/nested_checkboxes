import React from "react";
import "./styles.css";
import { STATUS } from "./App";
function Checkboxes({ data, handleChange }) {
  function displayData(checkboxData) {
    return checkboxData.map((item) => {
      if (item.hasOwnProperty("children")) {
        return (
          <li key={item.id}>
            {item.name}
            <input
              type="checkbox"
              //   className="indeterminate"
              checked={item.checked === STATUS.checked}
              onChange={() => handleChange(item.id)}
            ></input>
            <ul>{displayData(item.children)}</ul>
          </li>
        );
      } else {
        return (
          <li key={item.id}>
            {item.name}
            <input
              checked={item.checked === STATUS.checked}
              type="checkbox"
              onChange={() => handleChange(item.id)}
            ></input>
          </li>
        );
      }
    });
  }
  return <div>{displayData(data)}</div>;
}

export default Checkboxes;
