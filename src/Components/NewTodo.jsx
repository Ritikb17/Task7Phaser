import React, { useState } from "react";
import { useGlobalState } from "./GlobalState";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const NewTodo = ({ CancelIt, name }) => {
  const [listName, changeListName] = useState("");
  const [listDescription, changeListDescription] = useState("");
  const [listDate, changeListDate] = useState(null);
  const [listPriority, changeListPriority] = useState("");
  const { globalVariable, setGlobalVariable } = useGlobalState();
  const reff = [...globalVariable];

  function handleListChange(event) {
    changeListName(event.target.value);
  }

  function handleListChangeDis(event) {
    changeListDescription(event.target.value);
  }

  function handleListChangeDate(date) {
    // setListDate(selectedDate);
    const dateOnly = date.toISOString().split("T")[0];

    console.log(dateOnly);
    changeListDate(String(dateOnly));
  }

  function handleListChangePriority(event) {
    changeListPriority(event.target.value);
  }

  function reset() {
    changeListName("");
    changeListDescription("");
    changeListDate("");
    changeListPriority("");
  }

  function pushToCloud() {
    let r = {
      ListName: listName,
      ListDiscription: listDescription,
      ListDate: listDate,
      ListPriority: listPriority,
    };
    if (
      listName === "" &&
      listDescription === "" &&
      listDate === "" &&
      listPriority === ""
    ) {
      alert("fill all the fields !!!");
    } else {
      for (let a = 0; a < reff.length; a++) {
        if (reff[a][0][0].Name === name) {
          console.log("found", reff[a][0][0].Name);
          // reff[a][0][0].add(r);
          reff[a][0].push(r);
          console.log("working ", reff);
        }
      }
    }
    CancelIt();
  }

  return (
    <div>
      <form className="shadow-lg p-3 mb-5 bg-body-tertiary rounded" id="one">
        <span className="input-group-text" id="basic-addon2">
          List name
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Name "
          aria-label="Username"
          value={listName}
          onChange={handleListChange}
        />
        <span className="input-group-text" id="basic-addon2">
          listDescription
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Description "
          aria-label="Username"
          value={listDescription}
          onChange={handleListChangeDis}
        />
        <span className="input-group-text" id="basic-addon2">
          list Date
        </span>
        <div>
          <DatePicker
            selected={listDate}
            onChange={handleListChangeDate}
            className="form-control"
            placeholderText="Enter Date"
            aria-label="Username"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        </div>
        <span className="input-group-text" id="basic-addon2">
          Priority
        </span>
        <select
          className="form-control"
          aria-label="Priority"
          value={listPriority}
          onChange={handleListChangePriority}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={pushToCloud}
        >
          Make it!
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={reset}
        >
          Reset
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={CancelIt}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default NewTodo;
