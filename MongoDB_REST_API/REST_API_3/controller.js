// Import todo model
Todo = require('./model');

// Handle index actions
exports.index = (req, res) => {
  Todo.get((err, todos) => {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "Todos retrieved successfully",
      data: todos
    });
  });
};

// Handle create todo actions
exports.new = (req, res) => {
  const todo = new Todo();
  todo.jobTitle = req.body.jobTitle ? req.body.jobTitle : todo.jobTitle;
  todo.jobDescription = req.body.jobDescription;
// save the todo and check for errors
  todo.save((err) => {
    // Check for validation error
    if (err)
      res.json(err);
    else
      res.json({
        message: 'New todo created!',
        data: todo
      });
  });
};

// Handle view todo info
exports.view = (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err)
      res.send(err);
    res.json({
      message: 'Todo details loading..',
      data: todo
    });
  });
};

// Handle update todo info
exports.update = (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err)
      res.send(err);
    todo.jobTitle = req.body.jobTitle ? req.body.jobTitle : todo.jobTitle;
    todo.jobDescription = req.body.jobDescription;
// save the todo and check for errors
    todo.save((err) => {
      if (err)
        res.json(err);
      res.json({
        message: 'Todo Info updated',
        data: todo
      });
    });
  });
};

// Handle delete todo
exports.delete = (req, res) => {
  Todo.deleteOne({
    _id: req.params.id
  }, (err, todo) => {
    if (err)
      res.send(err);
    res.json({
      status: "success",
      message: 'Todo deleted'
    });
  });
};