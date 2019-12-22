const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  jobTitle: {
    type: String,
    required: true
  },
  jobDescription: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

const Todo = module.exports = mongoose.model('Todo', todoSchema );

module.exports.getAllTodo = (callback) => {
  Todo.find(callback);
}

//newTodo.save is used to insert the document into MongoDB
module.exports.addTodo = (newTodo, callback) => {
  newTodo.save(callback);
}

module.exports.deleteTodoById = (id, callback) => {
  let query = {_id: id};
  Todo.remove(query, callback);
}