const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  created: {
    type: String,
    required: true,
    default: () => new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
  }
});

module.exports = mongoose.model('Todo', todoSchema);
