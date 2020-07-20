require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const db = mongoose.connection;
const todosRouter = require('./controller');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true  });
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

app.use(express.json());

//Middleware for CORS
app.use(cors());

app.use('/api/v1/todoListDB', todosRouter);

app.listen(process.env.PORT, () => console.log('server running at port: ' + process.env.PORT));
