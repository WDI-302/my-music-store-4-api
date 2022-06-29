require('dotenv').config()
const express = require('express');
var cookieParser = require('cookie-parser');
const productRouter = require('./routes/productRouter');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRouter');
const AuthorizationService = require('./Services/AuthorizationService');
const logger = require('./logger');

const app = express();
const port = 3017;

mongoose
.connect(process.env.MONGO_DB_CONNECTION_STRING)
.then(() => console.log('Connected to mongo db successfully'))
.catch(() => console.error('Unable to connect to mongo db successfully'));

mongoose.set('debug', true);

// Parsing cookies
app.use(cookieParser());

// CORS POLICY
// allows every domain to access this server by default
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));

// Parsing JSON
app.use(bodyParser.json());

// Authorization
app.use(AuthorizationService.checkAuth);

app.use(userRouter);
app.use(productRouter);

logger.log({
  level: 'info',
  message: 'Hello distributed log files!'
});




app.listen(port, () => {
  console.log(`My Music Store API is listening on port ${port}`)
});