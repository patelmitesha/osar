var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseconfigSchema = new Schema({
	courseconfigid :  Number,
	advertisementno :  String,
	postcode :  String,
	subjectcode :  String,
	showcourse :  Boolean,
	showsubject :  Boolean,
	showresultawaited :  Boolean,
	showyearofpassing :  Boolean,
	showuniversity :  Boolean,
	showclass :  Boolean,
	showstate :  Boolean,
	showtypeofexam :  Boolean,
	showpercentage :  Boolean,
	minpercentagerequired :  Number,
	mincgparequired : Number,
	showsemesterwisemarks : Boolean,
	iscompulsory :  Boolean,
	showotheroption :  Boolean
});

//Export model
module.exports = mongoose.model('Courseconfigs', courseconfigSchema);