import express from 'express';
var router = express.Router();
import { User } from '../models/models';
let shortcuts = require('../models/basic_excel_shortcuts.json');

// export default function(passport) {
//   router.get('/signup', (req, res, next) => {
//
//   });
// }
/* GET users listing. */

router.post('/login', (req, res, next) => {
  User.findOne( { "email": req.body.email, "password": req.body.password } )
  .then( foundUser => {
    res.json( req.body.email );
  })
  .catch( error => {
    console.log( "Error while logging in.\n" + error );
    res.status( 500 ).json({ error: error });
  });
});

router.post('/register', (req, res, next) => {
  let count = shortcuts.length;
  let newUser = new User({
    email: req.body.email,
    password: req.body.password,
    used: Array(count).fill([]),
    potential: Array(count).fill(1),
  });
  newUser.save()
  .catch(err => res.status(500).send('error in saving new user: '+err) )
  .then(newUser => res.json({ "Success": true }))
});

module.exports = router;
