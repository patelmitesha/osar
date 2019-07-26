var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var postSchema = new Schema({
	postcode: String ,
	postname: String ,
	postdescription: String 
});

//Export model
module.exports = mongoose.model('Posts', postSchema);