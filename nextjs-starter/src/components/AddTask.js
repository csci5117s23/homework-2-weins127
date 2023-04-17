import React, { useState, useEffect } from 'react';
import { addTask } from '@/modules/Data';
import { useAuth } from '@clerk/nextjs';

export default function AddTask( {tasks, setTasks} ) {
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = e.target.task.value;
    getToken({ template: "codehooks" }).then( (token) => {
      addTask(token, newTask, userId, false);
    });
    setTasks([...tasks, { name: newTask, done: false }]);
    e.target.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="task" placeholder="Add task" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}


