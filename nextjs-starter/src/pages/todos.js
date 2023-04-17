import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import AddTask from '@/components/AddTask';
import TaskList from '@/components/TaskList';
import { useAuth } from '@clerk/nextjs';
import { getTasks } from '@/modules/Data';

export default function Todos() {
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function process() {
          if (userId) {
            const token = await getToken({ template: "codehooks" });
            const retrieved_tasks = await getTasks(token);
            console.log(retrieved_tasks);
            const newTasks = [];
            retrieved_tasks.map( (task) => {
                newTasks.push({
                    name: task.task,
                    done: task.done,
                    _id: task._id,
                    createdOn: task.createdOn
                });
            });
            setTasks(newTasks);
          }
        }
        process();
      }, [isLoaded]);

    return (
        <>
            <Head>
                <title>Todos</title>
            </Head>
            <main>
                <h1>Todo List</h1>
                <TaskList {...{tasks}} {...{setTasks}}></TaskList>
                <AddTask {...{tasks}} {...{setTasks}}></AddTask>
            </main>
        </>
    )
}