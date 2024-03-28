import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Unplanned } from "./Unplanned";
import { Today } from "./Today";
import { Tomorrow } from "./Tomorrow";
import { NextWeek } from "./NextWeek";
import { ThisWeek } from "./ThisWeek";

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Task 1" },
    { id: 2, name: "Task 2" },
    { id: 3, name: "Task 3" },
    { id: 4, name: "Task 4" },
    { id: 5, name: "Task 5" },
    { id: 6, name: "Task 6" },
    { id: 7, name: "Task 7" },
    { id: 8, name: "Task 8" },
    { id: 9, name: "Task 9" },
    { id: 10, name: "Task 10" },
  ]);

  const handleDropToToday = (item) => {
    const updatedTasks = tasks.filter((task) => task.id !== item.id);
    setTasks(updatedTasks);
  };

  const handleDragStart = (source) => {
    // Implement your logic here if needed
    console.log(`Drag started from: ${source}`);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Unplanned tasks={tasks} />
      <div className="container">
        <br></br>
        <Today onDrop={handleDropToToday} onDragStart={handleDragStart} />
        <Tomorrow onDrop={handleDropToToday} />
        <ThisWeek onDrop={handleDropToToday} />
        <NextWeek onDrop={handleDropToToday} />
      </div>
    </DndProvider>
  );
};

export default App;
