import React, { useState } from "react";
import { useDrop } from "react-dnd";
// import "./app.css";

export const Tomorrow = ({ onDrop }) => {
  const [droppedItems, setDroppedItems] = useState([]);

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: "Task",
      drop: (item, monitor) => {
        onDrop(item); // Callback to handle dropped item
        setDroppedItems((prevItems) => [...prevItems, item]);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [onDrop]
  );

  const isActive = canDrop && isOver;
  let backgroundColor = "#FFFFFF";

  return (
    <div className="Tomorrow" ref={drop} style={{ backgroundColor }}>
      <h3>
        <u>Tomorrow</u>
      </h3>
      you can drag items here
      {droppedItems.map((item, index) => (
        <div className="cards" key={index}>
          {item.name}
        </div>
      ))}
    </div>
  );
};
