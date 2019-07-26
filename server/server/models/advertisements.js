var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var advertisementSchema = new Schema({
	advertisementno: String ,
	sartingdate: Date ,
	endingdate: Date ,
	extradays: Number,
	uploadstatus: Boolean,
	dataentryby: String ,
	dataentrydate: Date,
	isauthorised: Boolean,
	authorisedby: String ,
	authoriseddate: Date,
	advertisementdescription: String,
	advertisementdetails:[{
		advtdetailsid: String ,
		postcode: String, 
		subjectcode: String,
		formatofapplication: String, 
		totalposts: Number, 
		postsforsc: Number,
		postsforst: Number, 
		postsforgen: Number,
		postsforobc: Number,
		dddetailsrequired: Boolean,
		maximumageallowed: Number,
		scagerelaxation: Number,
		stagerelaxation: Number,
		obcagerelaxation: Number,
		pwdagerelaxation: Number,
		essentialqualification: String,
		minexp: Number,
	}]
});

//Export model
module.exports = mongoose.model('Advertisements', advertisementSchema);