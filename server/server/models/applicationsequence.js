var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var applicationsequenceSchema = new Schema({
	advertisementno: {
		type: String,
		required: true
	},
	postcode: {
		type: String,
		required: true
	},
	subjectcode: {
		type: String,
		required: true
	},
	seq: {
		type: Number,
		required: true
	}
});

//Export model
module.exports = mongoose.model('Applicationsequence', applicationsequenceSchema);