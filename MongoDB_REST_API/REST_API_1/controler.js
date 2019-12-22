const express = require('express');
const router = express.Router();
const Todo = require('./model');

// Getting all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

// Creating one todo
router.post('/', async (req, res) => {
  const todo = new Todo({
    jobTitle: req.body.jobTitle,
    jobDescription: req.body.jobDescription
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

// Getting one todo
router.get('/:id', getTodo, (req, res) => {
  res.json(res.todo)
});

// Updating one todo
router.patch('/:id', getTodo, async (req, res) => {
  if (req.body.jobTitle != null) {
    res.todo.jobTitle= req.body.jobTitle
  }

  if (req.body.jobDescription != null) {
    res.todo.jobDescription = req.body.jobDescription
  }

  try {
    const updatedTodo = await res.todo.save();
    res.json(updatedTodo)
  } catch {
    res.status(400).json({ message: err.message })
  }
});

// Deleting one todo
router.delete('/:id', getTodo, async (req, res) => {
  try {
    await res.todo.remove();
    res.json({ message: 'Deleted This Todo' })
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
});

// Middleware function for getting todo object by ID
async function getTodo(req, res, next) {
  try {
    todo = await Todo.findById(req.params.id);
    if (todo == null) {
      return res.status(404).json({ message: 'Cant find todo'})
    }
  } catch(err){
    return res.status(500).json({ message: err.message })
  }
  
  res.todo = todo;
  next()
}

module.exports = router ;
