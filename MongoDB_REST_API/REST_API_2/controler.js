//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();

const todo = require('./model');

//GET HTTP method to /todo
router.get('/',(req,res) => {
  todo.getAllTodo((err, todos)=> {
    if(err) {
      res.json({success:false, message: `Failed to load all lists. Error: ${err}`});
    }
    else {
      res.write(JSON.stringify({success: true, todos:todos},null,2));
      res.end();
    }
  });
});

//POST HTTP method to /todo

router.post('/', (req,res,next) => {
  let newTodo = new todo({
    jobTitle: req.body.jobTitle,
    jobDescription: req.body.jobDescription,
    created: req.body.created
  });
  todo.addTodo(newTodo,(err, todos) => {
    if(err) {
      res.json({success: false, message: `Failed to create a new todo. Error: ${err}`});
    }
    else
      res.json({success:true, message: "Added successfully."});
  });
})

router.patch('/:id', (req,res,next) => {
  let newTodo = new todo({
    jobTitle: req.body.jobTitle,
    jobDescription: req.body.jobDescription,
    created: req.body.created
  });
  todo.addTodo(newTodo,(err, todos) => {
    if(err) {
      res.json({success: false, message: `Failed to update todo. Error: ${err}`});

    }
    else
      res.json({success:true, message: "Updated successfully."});
  });
});

//DELETE HTTP method to /todo. Here, we pass in a param which is the object id.

router.delete('/:id', (req,res,next)=> {
  //access the parameter which is the id of the item to be deleted
  let id = req.params.id;
  //Call the model method deleteListById
  todo.deleteTodoById(id,(err,todos) => {
    if(err) {
      res.json({success:false, message: `Failed to delete the todo. Error: ${err}`});
    }
    else if(todos) {
      res.json({success:true, message: "Deleted successfully"});
    }
    else
      res.json({success:false});
  })
});


module.exports = router;

