// Import express
const express = require('express');
// Import Body parser
const bodyParser = require('body-parser');
// Import Mongoose
const mongoose = require('mongoose');
// Initialize the app
const app = express();

const cors = require('cors');

require('dotenv').config();

// Import routes
const apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());

const db = mongoose.connection;

// Added check for DB connection

if(!db)
  console.log("Error connecting db")
else
  console.log("Db connected successfully")

// Setup server port
let port = process.env.PORT || 3000;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api/v1/todoDB', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running Server on port " + port);
});