const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const usuariosRouter = require('./routes/usuariosRouter');
const permisosRouter = require('./routes/permisosRouter');
const rolesRouter = require('./routes/rolesRouter');
const modulosRouter = require('./routes/modulosRouter');
const submenusRouter = require('./routes/submenusRouter');
const formulariosRouter = require('./routes/formulariosRouter');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1/usuarios', usuariosRouter);
app.use('/api/v1/permisos', permisosRouter);
app.use('/api/v1/roles', rolesRouter);
app.use('/api/v1/modulos', modulosRouter);
app.use('/api/v1/submenus', submenusRouter);
app.use('/api/v1/formularios', formulariosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
