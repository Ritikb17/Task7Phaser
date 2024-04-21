import React from "react";
import { useDrag } from "react-dnd";
// import "./app.css";

export const Unplanned = ({ tasks }) => {
  return (
    <div className="box1">
      <h3>
        <u>Unplanned</u>
      </h3>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

const Task = ({ task }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "Task",
    item: { id: task.id, name: task.name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div className="cards" ref={drag}>
      {task.name}
    </div>
  );
};
