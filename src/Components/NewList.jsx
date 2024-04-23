import { React, useState, useEffect } from "react";
import { useGlobalState } from "./GlobalState";
import Guid from "./Signup";
import Lists from "./Lists";
const NewList = ({ CancelIt }) => {
  const [name, changeName] = useState([]);
  //   const { globalVariable, setGlobalVariable } = useGlobalState();
  const { globalVariable, addToGlobalArray, removeFromGlobalArray } =
    useGlobalState();
  function handleChange(event) {
    changeName(event.target.value);
  }
  function createNewList() {
    // setGlobalVariable([[{ Name: name }]]);
    // console.log(globalVariable);
    if (name == []) {
      alert("Give it a name");
    } else {
      addToGlobalArray([
        [{ Name: name, CreationTime: new Date().toLocaleTimeString() }],
      ]);
      // console.log(
      //   "taskList ",
      //   globalVariable[0][0][0].TaskList.push({
      //     Name: name,
      //     CreationTime: new Date().toLocaleTimeString(),
      //   })
      // );
      console.log(globalVariable);
      <Lists />;

      CancelIt();
    }
  }
  useEffect(() => {
    // CancelIt();
    changeName([]);
    console.log(globalVariable);
  }, [globalVariable]);

  return (
    <div id="one" className="shadow-lg p-3 mb-5 bg-body-tertiary rounded">
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon2">
          List name
        </span>

        <input
          type="text"
          className="form-control"
          placeholder="Enter Name "
          aria-label="Username"
          value={name}
          onChange={handleChange}
        />
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={createNewList}
        >
          Create it!
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={CancelIt}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
export default NewList;
