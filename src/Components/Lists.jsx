import React, { useState } from "react"; // Changed import statement to include React
import { useGlobalState } from "./GlobalState";
import DisplayCards from "./DisplayCards";
import NewTodo from "./NewTodo";

const Lists = () => {
  const [isEnable, changeIsEnable] = useState(false);
  const { globalVariable } = useGlobalState();

  // function addTask() {
  //   changeIsEnable(!isEnable);
  // }

  // const handleCancelRendering = () => {
  //   changeIsEnable(false);
  // };

  // const [lists, changeLists] = useState([]); // Added state declaration

  return (
    <div>
      {globalVariable.map((mainitem, mainindex) =>
        mainitem.map((subitem, subindex) => (
          <DisplayCards key={subindex} v={subitem} />
        ))
      )}
    </div>
  );
};

export default Lists;
