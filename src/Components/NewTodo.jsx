import React, { useState } from "react";
import { useGlobalState } from "./GlobalState";

export const NewTodo = ({ CancelIt, name }) => {
  const [listName, changeListName] = useState("");
  const [listDescription, changeListDescription] = useState("");
  const [listDate, changeListDate] = useState("");
  const [listPriority, changeListPriority] = useState("");
  const { globalVariable, setGlobalVariable } = useGlobalState();
  const reff = [...globalVariable];

  function handleListChange(event) {
    changeListName(event.target.value);
  }

  function handleListChangeDis(event) {
    changeListDescription(event.target.value);
  }

  function handleListChangeDate(event) {
    changeListDate(event.target.value);
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
        <input
          type="text"
          className="form-control"
          placeholder="Enter Date "
          aria-label="Username"
          value={listDate}
          onChange={handleListChangeDate}
        />
        <span className="input-group-text" id="basic-addon2">
          Priority
        </span>
        <input
          type="number"
          className="form-control"
          placeholder="Enter Priority"
          aria-label="Priority"
          value={listPriority}
          onChange={handleListChangePriority}
        />
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
