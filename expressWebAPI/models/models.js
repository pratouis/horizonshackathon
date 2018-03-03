/* describing relations in collections of database */
import mongoose from 'mongoose';
// var mongoose = require('mongoose');
// Ensure that there is a MONGODB_URI environment variable (source env.sh)

if (! process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
}

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function(err) {
  console.log('Error connecting to MongoDb: ' + err);
  process.exit(1);
});

let UserSchema = mongoose.Schema({
  email: String,
  password: String,
  used: [mongoose.Schema.Types.Mixed],
  potential: [Number]
});

let User = mongoose.model('User', UserSchema);

module.exports = {
  User: User,
};
