const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function addTask(authToken, task, userId, done) {
    const result = await fetch(backend_base + "/todos", {
        'method' : 'POST',
        'headers' : {
            'authorization' : 'Bearer ' + authToken,
            'Content-Type' : 'application/json'},
        'body' : JSON.stringify({
            task: task,
            userId: userId,
            done: done
        })
    });

    return await result.json();
}

export async function getTasks(authToken) {
    const result = await fetch(backend_base + "/todos", {
        'method' : 'GET',
        'headers' : {'authorization' : 'Bearer ' + authToken}
    });

    return await result.json();
}

export async function deleteTask(authToken, task) {
    const result = await fetch(backend_base + "/todos/" + task._id, {
        'method' : 'DELETE',
        'headers' : {'authorization' : 'Bearer ' + authToken}
    });

    return await result.json();
}

export async function updateTask(authToken, task) {
    const result = await fetch(backend_base + "/todos/" + task._id, {
        'method' : 'PATCH',
        'headers' : {'authorization' : 'Bearer ' + authToken,
        'Content-Type' : 'application/json'},
        'body' : JSON.stringify({
            task: task.name,
            done: task.done,
            _id: task._id,
            createdOn: task.createdOn
        })
    });
    
    return await result.json();
}
