var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var statesSchema = new Schema({
	statecode: String ,
	statename: String 
});

//Export model
module.exports = mongoose.model('States', statesSchema);