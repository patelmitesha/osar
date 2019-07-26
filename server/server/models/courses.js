var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var coursesSchema = new Schema({
	nameofexam : String,
	courseconfigid : Number,
	courses : [
		{
			course : String,
			subjects : [
				{
					subject : String
				}
			]
		}
	]
});

//Export model
module.exports = mongoose.model('Courses', coursesSchema);