import express from 'express';
let router = express.Router();
import mongoose from 'mongoose';
import { User, Shortcut } from '../models/models';
let shortcuts = require('../models/basic_excel_shortcuts.json');
/* GET home page. */
router.get('/', (req, res, next) => {
  // User.findById(req.user._id)
  //     .then((user) => res.status(200).json(user))
  //     .catch((err) => {
  //       console.log('error in getting user info: ',err);
  //       res.status(500).json({error: err});
  //     });
  // return;
  // res.render('index', { title: 'Express' });
  res.json('you did it')
});

router.get('/:email', (req, res, next) => {
  User.findOne({email: req.params.email})
  .then(user => res.status(200).json(
   { shortcuts: shortcuts, used: user.used, potential: user.potential } ) )
  .catch(err => res.status(500).send('error in finding user: '+err));
})

module.exports = router;
