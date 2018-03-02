var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShortcutSchema = new Schema({
  name: {
    type: String
  },
  keys: {
    type: String
  }
});

module.exports = mongoose.model('Shortcut', ShortcutSchema)
