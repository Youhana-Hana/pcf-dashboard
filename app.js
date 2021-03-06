'use strict';

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const index = require('./routes/index');
const metrics = require('./routes/metrics');

const app = express();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(index);
app.use(metrics);

// Ensure required ENV vars are set
if(process.env.NODE_ENV=="production"){
  let requiredEnv = [
    'QA_T3_URL'
  ];
  let unsetEnv = requiredEnv.filter((env) => !(typeof process.env[env] !== 'undefined'));

  if (unsetEnv.length > 0) {
    console.error("WARNING - Required env variables are not set: [" + unsetEnv.join(', ') + "]");
  }
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found for ' + req.originalUrl);
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
