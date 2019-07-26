var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var univeristySchema = new Schema({
	universitycode: String ,
	universityname: String 
});

//Export model
module.exports = mongoose.model('Universities', univeristySchema);