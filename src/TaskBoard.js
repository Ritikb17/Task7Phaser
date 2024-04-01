// TaskBoard.js
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const tasksData = {
  todo: [
    { id: "task1", content: "Task 1" },
    { id: "task2", content: "Task 2" },
    { id: "task3", content: "Task 3" },
  ],
  inProgress: [
    { id: "task4", content: "Task 4" },
    { id: "task5", content: "Task 5" },
  ],
  done: [{ id: "task6", content: "Task 6" }],
};

const TaskList = ({ tasks, listId }) => {
  return (
    <div className="task-list">
      <h2>{listId}</h2>
      <Droppable droppableId={listId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="task"
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
  );
};

const TaskBoard = () => {
  const [tasks, setTasks] = useState(tasksData);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const sourceTasks = [...tasks[source.droppableId]];
    const destinationTasks = [...tasks[destination.droppableId]];
    const [movedTask] = sourceTasks.splice(source.index, 1);

    destinationTasks.splice(destination.index, 0, movedTask);

    setTasks({
      ...tasks,
      [source.droppableId]: sourceTasks,
      [destination.droppableId]: destinationTasks,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="task-board">
        {Object.entries(tasks).map(([listId, taskList]) => (
          <TaskList key={listId} tasks={taskList} listId={listId} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
