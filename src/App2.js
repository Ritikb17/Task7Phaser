import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";

const initialTasks = [
  { id: "task1", content: "Task 1" },
  { id: "task2", content: "Task 2" },
  { id: "task3", content: "Task 3" },
  { id: "task4", content: "Task 4" },
  { id: "task5", content: "Task 5" },
  { id: "task6", content: "Task 6" },
  { id: "task7", content: "Task 7" },
];
const name = ["Today", "Tomorrow", "This week", "Next Week"];
function App2() {
  const [tasks, setTasks] = useState(initialTasks);
  const [div2Tasks, setDiv2Tasks] = useState([]);
  const [div3Tasks, setDiv3Tasks] = useState([]);
  const [div4Tasks, setDiv4Tasks] = useState([]);
  const [div5Tasks, setDiv5Tasks] = useState([]);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container">
        <div className="Unplanned"></div>
        <div className="Today"></div>
      </div>
    </DragDropContext>
  );
}
