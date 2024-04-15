import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import NewTodo from "./NewTodo";
import "../css/LoginSignin.css";

function DisplayCards({ v }) {
  const [isVisible, setIsVisible] = useState(false);

  function createNewList() {
    setIsVisible(!isVisible);
  }

  if (!Array.isArray(v)) {
    // If `v` is not an array, render null or handle the case appropriately
    return null;
  }
  const uniqueId = v[0].Name;
  const droppableId = `${uniqueId}`;

  const onDragEnd = (result) => {
    const { source, destination } = result;
    console.log("res", result);
    if (destination.droppableId === "dsf-medium") if (!destination) return;
    console.log(source, destination);
  };

  return (
    <div className="card">
      <h3>{v[0].Name}</h3>

      {/* <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            id={`card-${uniqueId}`}
          >
            {v.map(
              (item, index) =>
                index !== 0 && (
                  <Draggable
                    key={index}
                    draggableId={`item-${uniqueId}-${index}`}
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
                )
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable> */}

      {/* New droppable divs */}
      <div className="droppable-column">
        <h6>Low Priority</h6>
        <Droppable droppableId={`${droppableId}-low`}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              id={`card-${uniqueId}-low`}
            >
              {/* Draggable items for "Low Priority" */}
              {v
                .filter((task) => task.ListPriority === "low")
                .map((task, index) => (
                  <Draggable
                    key={`low-${index}`}
                    draggableId={`low-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        id={`item-low-${index}`}
                      >
                        <ul>
                          <div
                            id={`card-container-low-${uniqueId}`}
                            className="card-container"
                          >
                            {Object.entries(task).map(([key, value], i) => (
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
      </div>

      <div className="droppable-column">
        <h6>Medium Priority</h6>
        <Droppable droppableId={`${droppableId}-medium`}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              id={`card-${uniqueId}-medium`}
            >
              {/* Draggable items for "Low Priority" */}
              {v
                .filter((task) => task.ListPriority === "medium")
                .map((task, index) => (
                  <Draggable
                    key={`medium-${index}`}
                    draggableId={`medium-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        id={`item-medium-${index}`}
                      >
                        <ul>
                          <div
                            id={`card-container-medium-${uniqueId}`}
                            className="card-container"
                          >
                            {Object.entries(task).map(([key, value], i) => (
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
      </div>

      <div className="droppable-column">
        <h6>High Priority</h6>
        <Droppable droppableId={`${droppableId}-high`}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              id={`card-${uniqueId}-high`}
            >
              {/* Draggable items for "Low Priority" */}
              {v
                .filter((task) => task.ListPriority === "high")
                .map((task, index) => (
                  <Draggable
                    key={`high-${index}`}
                    draggableId={`high-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        id={`item-high-${index}`}
                      >
                        <ul>
                          <div
                            id={`card-container-high-${uniqueId}`}
                            className="card-container"
                          >
                            {Object.entries(task).map(([key, value], i) => (
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
      </div>

      {/* Render NewTodo component */}
      <div>
        {isVisible && <NewTodo CancelIt={createNewList} name={v[0].Name} />}
      </div>

      {/* Button to add list */}
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
