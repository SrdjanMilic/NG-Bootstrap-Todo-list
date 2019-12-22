const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
  jobTitle: {
    type: String,
    required: true
  },
  jobDescription: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now()
  }
})

// Export Contact model
const Todo = module.exports = mongoose.model('Todo', todoSchema);

module.exports.get = (callback, limit) => {
  Todo.find(callback).limit(limit);
}
