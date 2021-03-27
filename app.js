const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');

const app = express();

// app.use(bodyParser.urlencoded());
app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose 
  .connect(
    'mongodb://Ritesh:rrajr123@cluster0-shard-00-00.jq1ke.mongodb.net:27017,cluster0-shard-00-01.jq1ke.mongodb.net:27017,cluster0-shard-00-02.jq1ke.mongodb.net:27017/message?ssl=true&replicaSet=atlas-kkf4fd-shard-0&authSource=admin&retryWrites=true&w=majority'
  )
  .then(result => {
    app.listen(8080);
  })
  .catch(err => console.log(err));
