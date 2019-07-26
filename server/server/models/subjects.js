var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var subjectSchema = new Schema({
	subjectcode: String ,
	subjectname: String ,
	subjectdescription: String 
});

//Export model
module.exports = mongoose.model('Subjects', subjectSchema);