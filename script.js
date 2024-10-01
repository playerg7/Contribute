// script.js
const taskList = document.getElementById('task-list');

function refreshTaskList() {
  fetch('/api/tasks')
    .then((response) => response.json())
    .then((tasks) => {
      taskList.innerHTML = '';
      tasks.forEach((task) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${task.name}</strong><br>
          ${task.description}<br>
          Due Date: ${task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not specified'}<br>
          <button onclick="deleteTask('${task._id}')">Delete</button>
          <button onclick="updateTask('${task._id}')">Update</button>
        `;
        if (task.isCompleted) {
          li.style.backgroundColor = '#c0f0c0';
        }
        taskList.appendChild(li);
      });
    });
}

function addTask() {
  const taskName = document.getElementById('task-name').value;
  const taskDescription = document.getElementById('task-description').value;
  const taskDueDate = document.getElementById('task-due-date').value;

  fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: taskName, description: taskDescription, dueDate: taskDueDate }),
  })
    .then(() => {
      refreshTaskList();
      document.getElementById('task-name').value = '';
      document.getElementById('task-description').value = '';
      document.getElementById('task-due-date').value = '';
    });
}

function deleteTask(taskId) {
  fetch(`/api/tasks/${taskId}`, {
    method: 'DELETE',
  })
    .then(() => {
      refreshTaskList();
    });
}

function updateTask(taskId) {
  const newName = prompt('Enter new task name:');
  if (newName !== null) {
    const newDescription = prompt('Enter new task description:');
    const newDueDate = prompt('Enter new due date (YYYY-MM-DD):');

    fetch(`/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newName,
        description: newDescription,
        dueDate: newDueDate,
      }),
    })
      .then(() => {
        refreshTaskList();
      });
  }
}

refreshTaskList();
