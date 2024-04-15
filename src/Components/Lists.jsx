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
    if (!destination) return;
    console.log("Null destination", destination.droppableId);
    let grabb;
    let parts = destination.droppableId.split("-");
    let parts2 = source.droppableId.split("-");
    let destinationList = parts[0];
    let destinationPriority = parts[1];
    let sourceList = parts2[0];
    let sourcePriority = parts2[1];
    console.log("Source", source);

    // for (let a = 0; a < reff.length; a++) {
    //   if (reff[a][0][0].Name === source.droppableId) {
    //     console.log("found", reff[a][0][0].Name);
    //     // reff[a][0][0].add(r);
    //     r = reff[a][0][source.index];
    //     reff[a][0].splice(source.index, 1);

    //     console.log("R is  ", r);
    //   }
    // }

    // const newName = destination.droppableId;
    // for (let a = 0; a < reff.length; a++) {
    //   if (reff[a][0][0].Name === newName) {
    //     // console.log("found", reff[a][0][0].Name);
    //     // reff[a][0][0].add(r);
    //     reff[a][0].push(r);
    //     // console.log("done  ", reff);
    //   }
    // }

    // console.log(newName);
    console.log("destination List", destinationList);
    console.log("destination Pariority", destinationPriority);
    console.log("source List ", sourceList);
    console.log("source Priority ", sourcePriority);
    // REMOVING THE ELEMENT FROM THE SOURCE
    for (let a = 0; a < reff.length; a++) {
      if (reff[a][0][0].Name === sourceList) {
        console.log("found", reff[a][0][source.index + 1]);
        grabb = reff[a][0][source.index + 1];
        reff[a][0].splice(source.index + 1, 1);
      }
    }

    for (let a = 0; a < reff.length; a++) {
      if (reff[a][0][0].Name === destinationList) {
        grabb.ListPriority = destinationPriority;
        console.log("pushing ", grabb);
        reff[a][0].push(grabb);
      }
    }
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
      onDragStart={(DS) => {
        console.log("dragging is started", DS);
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
