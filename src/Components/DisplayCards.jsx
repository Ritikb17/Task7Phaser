import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import NewTodo from "./NewTodo";
import "../css/LoginSignin.css";

function DisplayCards({ v, uniqueId }) {
  const [isVisible, setIsVisible] = useState(false);

  function createNewList() {
    setIsVisible(!isVisible);
  }

  if (!Array.isArray(v)) {
    return null;
  }

  const droppableId = `droppable-${uniqueId}`;

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;
    console.log(source, destination);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={droppableId}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              id={`card-${uniqueId}`}
            >
              {v.map((item, index) => (
                <Draggable
                  key={index}
                  draggableId={`item-${index}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      id={`item-${index}`}
                    >
                      <ul>
                        <div
                          id={`card-container-${uniqueId}`}
                          className="card-container"
                        >
                          {Object.entries(item).map(([key, value], i) => (
                            <li key={key}>
                              {i === 0 ? <strong>{value}</strong> : value}
                            </li>
                          ))}
                        </div>
                      </ul>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div>
        {isVisible && <NewTodo CancelIt={createNewList} name={v[0].Name} />}
      </div>

      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={createNewList}
      >
        Add list
      </button>
    </div>
  );
}

export default DisplayCards;
