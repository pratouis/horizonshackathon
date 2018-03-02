var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    foo: {
      type: String
    }
});

module.exports = mongoose.model('User',UserSchema);
