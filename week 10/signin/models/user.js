var mongoose = require('./db.js');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String},
    password: {type: String},
    studentId: {type: String},
    tel: {type: String},
    mailBox: {type: String}
});

var User = mongoose.model('User', UserSchema);

module.exports = User;