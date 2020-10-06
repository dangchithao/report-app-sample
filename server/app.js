const ect = require('ect');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();
const viewDir = path.resolve(__dirname, 'views');

app.set('views', viewDir);
app.set('view engine', 'ect');
app.engine('ect', ect({
  watch: true,
  root: viewDir,
  ext: '.ect'
}).render);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

module.exports = app;
