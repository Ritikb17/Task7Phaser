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

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [div2Tasks, setDiv2Tasks] = useState([]);
  const [div3Tasks, setDiv3Tasks] = useState([]);
  const [div4Tasks, setDiv4Tasks] = useState([]);
  const [div5Tasks, setDiv5Tasks] = useState([]);

  function findInAry(ary, value) {
    for (let i = 0; i < ary.length; i++) {
      if (ary[i].id === value) {
        return ary[i].content;
      }
    }
    return "";
  }

  function removeFromSource(source, index) {
    switch (source) {
      case "div1":
        setTasks((prevTasks) => {
          const newTasks = [...prevTasks];
          newTasks.splice(index, 1);
          return newTasks;
        });
        break;
      case "div2":
        setDiv2Tasks((prevTasks) => {
          const newTasks = [...prevTasks];
          newTasks.splice(index, 1);
          return newTasks;
        });
        break;
      case "div3":
        setDiv3Tasks((prevTasks) => {
          const newTasks = [...prevTasks];
          newTasks.splice(index, 1);
          return newTasks;
        });
        break;
      case "div4":
        setDiv4Tasks((prevTasks) => {
          const newTasks = [...prevTasks];
          newTasks.splice(index, 1);
          return newTasks;
        });
        break;
      case "div5":
        setDiv5Tasks((prevTasks) => {
          const newTasks = [...prevTasks];
          newTasks.splice(index, 1);
          return newTasks;
        });
        break;
      default:
        break;
    }
  }

  const insertToDestination = (index, draggableId, droppableId) => {
    let val = findInAry(tasks, draggableId);

    switch (droppableId) {
      case "div1":
        setTasks((prevTasks) => {
          const newTasks = [...prevTasks];
          newTasks.splice(index, 0, { id: draggableId, content: val });
          return newTasks;
        });
        break;
      case "div2":
        setDiv2Tasks((prevTasks) => {
          const newTasks = [...prevTasks];
          newTasks.splice(index, 0, { id: draggableId, content: val });
          return newTasks;
        });
        break;
      case "div3":
        setDiv3Tasks((prevTasks) => {
          const newTasks = [...prevTasks];
          newTasks.splice(index, 0, { id: draggableId, content: val });
          return newTasks;
        });
        break;
      case "div4":
        setDiv4Tasks((prevTasks) => {
          const newTasks = [...prevTasks];
          newTasks.splice(index, 0, { id: draggableId, content: val });
          return newTasks;
        });
        break;
      case "div5":
        setDiv5Tasks((prevTasks) => {
          const newTasks = [...prevTasks];
          newTasks.splice(index, 0, { id: draggableId, content: val });
          return newTasks;
        });
        break;
      default:
        break;
    }
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const targetTasks = getList(source.droppableId);

      const removed = targetTasks.splice(source.index, 1);
      targetTasks.splice(destination.index, 0, ...removed);

      switch (source.droppableId) {
        case "div1":
          setTasks(targetTasks);
          break;
        case "div2":
          setDiv2Tasks(targetTasks);
          break;
        case "div3":
          setDiv3Tasks(targetTasks);
          break;
        case "div4":
          setDiv4Tasks(targetTasks);
          break;
        case "div5":
          setDiv5Tasks(targetTasks);
          break;
        default:
          break;
      }
    } else {
      const sourceTasks = getList(source.droppableId);
      const destinationTasks = getList(destination.droppableId);

      const [removed] = sourceTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);

      switch (source.droppableId) {
        case "div1":
          setTasks(sourceTasks);
          break;
        case "div2":
          setDiv2Tasks(sourceTasks);
          break;
        case "div3":
          setDiv3Tasks(sourceTasks);
          break;
        case "div4":
          setDiv4Tasks(sourceTasks);
          break;
        case "div5":
          setDiv5Tasks(sourceTasks);
          break;
        default:
          break;
      }

      switch (destination.droppableId) {
        case "div1":
          setTasks(destinationTasks);
          break;
        case "div2":
          setDiv2Tasks(destinationTasks);
          break;
        case "div3":
          setDiv3Tasks(destinationTasks);
          break;
        case "div4":
          setDiv4Tasks(destinationTasks);
          break;
        case "div5":
          setDiv5Tasks(destinationTasks);
          break;
        default:
          break;
      }
    }
  };

  const getList = (id) => {
    switch (id) {
      case "div1":
        return tasks;
      case "div2":
        return div2Tasks;
      case "div3":
        return div3Tasks;
      case "div4":
        return div4Tasks;
      case "div5":
        return div5Tasks;
      default:
        return [];
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container">
        <div className="div">
          <h2>Unplanned</h2>
          <Droppable droppableId="div1">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        className="task"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {task.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        {[...Array(4)].map((_, i) => (
          <div className="div" key={`div${i + 2}`}>
            <h2>{name[i]}</h2>
            Drag task here
            <Droppable droppableId={`div${i + 2}`}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {getList(`div${i + 2}`).map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="task"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {task.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}

export default App;
