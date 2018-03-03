import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

/* mongoose model stuff */
import { User } from './models/models';
import mongoose from 'mongoose';
// mongoose.Promise = global.Promise;

let app = express();

/* set up session with mongo */
// import session from 'express-session';
// import connectMongo from 'connect-mongo';
// const MongoStore = connectMongo(session);
//
// app.use(session({
//   secret: process.env.SECRET,
//   store: new MongoStore({mongooseConnection: mongoose.connection})
// }));
//
// /* set up passport */
// import passport from 'passport';
// import LocalStrategy from 'passport-local';
// import models from './models/models';
// app.use(passport.initialize());
// app.use(passport.session());
//
// passport.serializeUser((user,cb) => cb(null, user._id));
//
// passport.deserializeUser((id, cb) => {
//   models.User.findById(id, (err, user) => cb(err, user) );
// })
//
// passport.use(new LocalStrategy((username, password, cb) => {
//   models.User.findOne({username: username}, (err, user) => {
//     if(err){
//       console.log('error in authenticating: ', err);
//       return cb(err);
//     }
//
//     if(!user){
//       console.log('user invalid: ', user);
//       return cb(null, false);
//     }
//
//     if(user.password !== password){
//       console.log('password invalid');
//       return cb(null, false);
//     }
//
//     return cb(null, user);
//   })
// }))
//
//
// /* request handlers */
// import auth from './routes/auth';
import index from './routes/index';
import users from './routes/users';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
