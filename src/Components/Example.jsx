import { useGlobalState } from "./GlobalState";
import { React, useState } from "react";
const Example = () => {
  //   const { globalVariable, setGlobalVariable } = useGlobalState();
  const { globalVariable, setGlobalVariable } = useGlobalState();
  function showData() {
    console.log(globalVariable);
  }
  function handle(event) {
    setGlobalVariable(event.target.value);
  }
  return (
    <div>
      <input type="text" value={globalVariable} onChange={handle} />
      <button onClick={showData}>Clickit </button>
    </div>
  );
};
export default Example;
