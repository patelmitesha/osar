var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var applicationhistorySchema = new Schema({
	applicationno: String ,
	updatedon: Date ,
	operationtype: String ,
	application: Object
});

//Export model
module.exports = mongoose.model('ApplicationHistory', applicationhistorySchema);