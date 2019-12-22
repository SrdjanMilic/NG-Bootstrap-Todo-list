const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
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
    default: Date.now
  }
});

module.exports = mongoose.model('Todo', todoSchema);
