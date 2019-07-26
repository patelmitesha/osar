var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var loginsSchema = new mongoose.Schema({
	username : {
    type: String,
    required: true
  },
	email : {
		type: String,
		unique: true,
		required: true
	},
  mobileno : {
    type: String,
    required: true
  },
	hash: String,
	salt: String,
	enabled : Boolean,
	resetuid : String,
	resetuidvalidupto : Date,
	logincreatedon : Date
});


loginsSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64,'sha512').toString('hex');
};

loginsSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64,'sha512').toString('hex');
  return this.hash === hash;
};

loginsSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    usernamename: this.username,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};


//Export model
module.exports = mongoose.model('Logins', loginsSchema);
