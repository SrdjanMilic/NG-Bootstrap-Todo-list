const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const todo = require('./controler');

//Initialize our app variable
const app = express();

//Declaring Port
const port = 3000;

// Connect mongoose to our database
const config = require('./database');
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });

//Middleware for CORS
app.use(cors());

//Middleware for bodyparsing using both json and urlencoding
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/', (req,res) => {
  res.send("Invalid page");
})

//Listen to port 3000
app.listen(port, () => {
  console.log(`Starting the server at port ${port}`);
});

app.use('/api/v1/todoDB',todo);


