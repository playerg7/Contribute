const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB (You need to have MongoDB installed and running)
mongoose.connect('mongodb://localhost/todo_list_db', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a Task schema
const taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  dueDate: Date,
  isCompleted: Boolean,
});

const Task = mongoose.model('Task', taskSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// API endpoints for CRUD operations
app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
  const { name, description, dueDate } = req.body;
  const task = new Task({ name, description, dueDate, isCompleted: false });
  await task.save();
  res.status(201).json(task);
});

app.put('/api/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  const { name, description, dueDate, isCompleted } = req.body;
  const updatedTask = await Task.findByIdAndUpdate(taskId, { name, description, dueDate, isCompleted }, { new: true });
  res.json(updatedTask);
});

app.delete('/api/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  await Task.findByIdAndRemove(taskId);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
