import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";

export const Today = ({ onDrop, onDragStart }) => {
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
  let backgroundColor = isActive ? "#A9E2F3" : "#FFFFFF";

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "Task",
      item: { id: "today", name: "Today" },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    []
  );

  return (
    <div className="Today" ref={drop} style={{ backgroundColor }}>
      <h3>
        <u>Today</u>
      </h3>
      you can drag items here
      {droppedItems.map((item, index) => (
        <div key={index} className="cards">
          {item.name}
        </div>
      ))}
      <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}></div>
    </div>
  );
};
