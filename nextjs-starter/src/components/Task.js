import React from 'react'

const Task = ({ task, index, handleDone, handleDelete}) => {
  return (
    <li key={index} style={{ textDecoration: task.done ? "line-through" : "none" }}>
      {task.name}
      <button onClick={() => handleDone(index)}>
        {task.done ? "Undo" : "Done"}
      </button>
      <button onClick={() => handleDelete(index)}>Delete</button>
    </li>
  )
}

export default Task
