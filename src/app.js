require('dotenv').config()
const express = require('express');
const productRouter = require('./routes/productRouter');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3017;

mongoose
.connect(process.env.MONGO_DB_CONNECTION_STRING)
.then(() => console.log('Connected to mongo db successfully'))
.catch(() => console.error('Unable to connect to mongo db successfully'));

mongoose.set('debug', true);

// Parsing cookies
app.use((req, res, next) => {
  console.log('parsing all of your cookies from their native format to a developer friendly format so that we can work on it on express');
  next();
});

// CORS POLICY
app.use(cors());

// Parsing JSON
app.use((req, res, next) => {
  console.log('parses request into json so that we can work with them');
  next();
});

// Authorization
app.use((req, res, next) => {
  console.log('userAuthization middleware');
  next();
});

app.use(productRouter);



app.listen(port, () => {
  console.log(`My Music Store API is listening on port ${port}`)
});