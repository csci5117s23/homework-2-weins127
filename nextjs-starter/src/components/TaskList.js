import { deleteTask, updateTask } from '@/modules/Data';
import React from 'react';
import Task from './Task'
import { useAuth } from '@clerk/nextjs';

export default function TaskList({tasks, setTasks}) {
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  const handleDone = (index) => {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
    getToken({ template: "codehooks" }).then( (token) => {
      updateTask(token, newTasks[index]);
    });
  };
  
  const handleDelete = (index) => {
    const newTasks = [...tasks];
    const deletedTasks = newTasks.splice(index, 1);
    setTasks(newTasks);
    getToken({ template: "codehooks" }).then( (token) => {
      deletedTasks.map((task) => {
        console.log(task);
        deleteTask(token, task);
      });
    });
  };

  return (
    <ul>
      {tasks.map((task, index) => (
        <Task {...{task, index, handleDelete, handleDone}}></Task>
      ))}
    </ul>
  )
}

