require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

app.use(express.json());

//Middleware for CORS
app.use(cors());

const todosRouter = require('./controler');
app.use('/api/v1/todoDB', todosRouter);

app.listen(3000, () => console.log('server is up at port: 3000'));
