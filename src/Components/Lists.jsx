import React, { useState } from "react"; // Changed import statement to include React
import { useGlobalState } from "./GlobalState";
import DisplayCards from "./DisplayCards";
import { DragDropContext } from "react-beautiful-dnd";
import NewTodo from "./NewTodo";

import Guid from "./Signup";
const Lists = () => {
  const [isEnable, changeIsEnable] = useState(false);
  const { globalVariable } = useGlobalState();

  const onDragEnd = (result) => {
    const reff = [...globalVariable];
    const { destination, source } = result;
    let r;
    console.log("Source", source.index);
    for (let a = 0; a < reff.length; a++) {
      if (reff[a][0][0].Name === source.droppableId) {
        console.log("found", reff[a][0][0].Name);
        // reff[a][0][0].add(r);
        r = reff[a][0][source.index];
        reff[a][0].splice(source.index, 1);

        console.log("R is  ", r);
      }
    }

    const newName = destination.droppableId;
    for (let a = 0; a < reff.length; a++) {
      if (reff[a][0][0].Name === newName) {
        // console.log("found", reff[a][0][0].Name);
        // reff[a][0][0].add(r);
        reff[a][0].push(r);
        // console.log("done  ", reff);
      }
    }

    console.log(newName);
  };

  // function addTask() {
  //   changeIsEnable(!isEnable);
  // }

  // const handleCancelRendering = () => {
  //   changeIsEnable(false);
  // };

  // const [lists, changeLists] = useState([]); // Added state declaration

  if (globalVariable === [{ id: Guid }, []]) {
    return <div></div>;
  }
  return (
    <DragDropContext
      onDragStart={() => {
        console.log("dragging is started");
      }}
      onDragUpdate={() => {
        console.log("dragging is update");
      }}
      onDragEnd={onDragEnd}
    >
      <div>
        {globalVariable.map((mainitem, mainindex) =>
          mainitem.map((subitem, subindex) => (
            <DisplayCards key={subindex} v={subitem} />
          ))
        )}
      </div>
    </DragDropContext>
  );
};

export default Lists;
