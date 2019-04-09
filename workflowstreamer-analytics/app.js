const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const eventsRouter = require('./routes/events');
const usersRouter = require('./routes/users');
const mongodb = require('mongodb');

const app = express();

const MongoClient = mongodb.MongoClient;
const uri = 'mongodb+srv://app:app123@analytics-cluster-v4gp0.gcp.mongodb.net/analytics?retryWrites=true';
const mongoClient = new MongoClient(uri, { useNewUrlParser: true });

mongoClient.connect((err) => {
  if (err) {
    console.log('ERR: Not Connected...')
  } else {
    const db = mongoClient.db('analytics')
    console.log('DB Connected...')
    app.set('db', db);
  }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/events', eventsRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.end();
});

module.exports = app;
