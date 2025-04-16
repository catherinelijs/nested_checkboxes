import { useState } from "react";

import "./App.css";
import Checkboxes from "./Checkboxes";

export const STATUS = {
  checked: true,
  unchecked: false,
  indeterminate: "indeterminate",
};
const data = [
  {
    id: 1,
    name: "Electronics",
    checked: false,
    children: [
      {
        id: 2,
        name: "Mobile phones",
        checked: false,
        children: [
          {
            id: 3,
            name: "iPhone",
            checked: false,
          },
          {
            id: 4,
            name: "Android",
            checked: false,
          },
        ],
      },
      {
        id: 5,
        name: "Laptops",
        checked: false,
        children: [
          {
            id: 6,
            name: "MacBook",
            checked: false,
          },
          {
            id: 7,
            name: "Surface Pro",
            checked: false,
          },
        ],
      },
    ],
  },
  {
    id: 8,
    name: "Books",
    checked: false,
    children: [
      {
        id: 9,
        name: "Fiction",
        checked: false,
      },
      {
        id: 10,
        name: "Non-fiction",
        checked: false,
      },
    ],
  },
  {
    id: 11,
    name: "Toys",
    checked: false,
  },
];
function App() {
  const [checkboxData, setCheckboxData] = useState(data);
  const handleChange = (id) => {
    const copy = structuredClone(checkboxData);

    updateChecked(id, copy);

    setCheckboxData(copy);
  };

  function updateChecked(id, data) {
    data.forEach((item) => {
      if (item.id === id) {
        item.checked = !item.checked;
        console.log(item.checked);
        if (item.hasOwnProperty("children"))
          updateChildren(item.children, item.checked);
      } else {
        if (item.hasOwnProperty("children")) {
          updateChecked(id, item.children);
        }
      }
    });
  }

  function updateParent(data) {
    data.forEach((item) => {
      if (item.hasOwnProperty("children")) {
        let count = 0;
        item.children.forEach((childItem) => {
          if (childItem.checked) count++;
        });
        if (count === 1) {
          item.checked = "indeterminate";
        } else if (count === 0) {
          item.checked = false;
        }
        updateParent(data);
      }
    });
  }
  function updateChildren(arr, newStatus) {
    arr.forEach((item) => {
      item.checked = newStatus;
      if (item.hasOwnProperty("children")) {
        updateChildren(item.children, newStatus);
      }
    });
  }
  return (
    <>
      <Checkboxes data={checkboxData} handleChange={handleChange}></Checkboxes>
    </>
  );
}

export default App;
