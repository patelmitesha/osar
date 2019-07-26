var Applicationsequence = require('./applicationsequence');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var applicationsSchema = new Schema({
	applicationno: {
		type: String,
		unique: true,
		required: true
	},
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
	dateofapplication: {
		type : Date,
		default: Date.now,
		required : true
	} ,
	advertisementno: {
		type: String,
		required: true
	},
	salutation: {
		type: String,
		required: true,
		enum:['Shri.','Smt.','Ms.','Dr.']
	},
	firstname: {
		type: String,
		required: true,
		maxlength:50,
		validate:/[a-zA-z ]/
	},
	fatherhusbandname: {
		type: String,
		required: true,
		maxlength:50,
		validate:/[a-zA-z ]/
	},
	gender: {
		type: String,
		required: true,
		enum:['Male','Female']
	},
	category: {
		type: String,
		required: true,
		enum:['GEN','SC','ST','OBC']
	},
	physicalhandicap: {
		type:Boolean ,
		required: true
	},
	handicaptype: {
		type:String,
		maxlength:50,
		required: false,
		enum:[null,'VISUAL','HEARING IMPAIRED','ORTHOPEDIC']	
	} ,
	handicapdetails: {
		type:String,
		maxlength:100
	},
	exserviceman: {
		type:Boolean ,
		required: true
	},
	exservicemanfrom: {
		type:String,
		maxlength:20,
		required: false,
		enum:[null,'ARMY','NAVY','AIR FORCE']	
	},
	dateofreleived: Date ,
	dateofbirth: {
		type:Date ,
		required: true
	},
	age: {
		type : Number,
		required: true,
		min:[18,'You are too young to apply'],
		max:[80,'Age criterian does not match']
	},
	nationality: {
		type: String,
		required: true,
		maxlength:30
	},
	nearestrlystn: {
		type:String,
		maxlength:30,
		validate:/[a-zA-z ]/
	},
	ddno: {
		type:String,
		maxlength:30
	},
	dddate: Date ,
	ddbank: {
		type:String,
		maxlength:50
	},
	bankbranch: {
		type:String,
		maxlength:50
	},
	buildingno: {
		type: String,
		required: true,
		maxlength:100
	},
	street: {
		type:String,
		maxlength:100
	},
	area: {
		type:String,
		maxlength:100
	},
	city: {
		type:String,
		maxlength:100
	},
	state: {
		type:String,
		maxlength:50,
		validate:/[a-zA-z ]/
	},
	country: {
		type:String,
		maxlength:20,
		validate:/[a-zA-z ]/
	},
	pincode: {
		type: String,
		required: true,
		max:10,
		validate:/[0-9]/
	},
	telno: {
		type:String,
		maxlength:20,
		validate:/[0-9]/
	},
	mobno: {
		type: String,
		required: true,
		maxlength:12,
		validate:/[0-9]/
	},
	email: {
		type: String,
		required: true,
		maxlength:100,
		match: /\S+@\S+\.\S+/
	},
	expinmonths: Number ,
	reference: {
		type:String,
		maxlength:200
	},
	ip: {
		type : String,
		maxlength:30
	} ,
	screeningstatus: {
		type:String,
		maxlength:100
	},
	correctionmade: {
		type : String,
		maxlength:100 
	},
	screeningresult: {
		type : String,
		maxlength:100 
	},
	registerdate: {
		type : Date
	} ,
	govtserv: {
		type: Boolean ,
		required: true
	},
	dateofinterview: Date ,
	meritnumber: {
		type:String,
		maxlength:100 
	} ,
	signature: {
		type:String,
		maxlength:500 
	} ,
	publickey: {
		type:String,
		maxlength:500 
	} ,
	islocked: Boolean ,
	question : {
		type:String,
		maxlength:1000 
	} ,
	answer: {
		type:String,
		maxlength:1000 
	} ,
	qualifications : [{
			nameofexam : {
			type: String,
			required: true,
			maxlength:200
		},
		course : {
			type: String,
			maxlength:200
		},
		subject : {
			type: String,
			maxlength:200
		},
		yearofpassing : String,
		universityboard : {
			type: String,
			maxlength:500
		},
		resultawaited: Boolean,
		boardstate : {
			type: String,
			maxlength:100
		},
		aggregate : Number,
		examclass : {
			type: String,
			maxlength:50
		},
		correctionmade : {
			type:String,
			maxlength:50
		} ,
		examtype : {
			type:String,
			maxlength:100
		} ,
		resultawaited : Boolean,
		isdeleted : Boolean,
		courseconfigid : {
			type : String,
			required:true
		},
		semesterwisemarks : [{
			semester : {
				type : String,
				required:true
			},
			marks : {
				type : Number,
				required:false
			},
			grade : {
				type : String,
				required:false
			}

		}]
	}],
	experiences : [{
		postheld : {
			type: String,
			required:true,
			maxlength:200
		},
		fromdate : {
			type: Date,
			required:true
		},
		todate : {
			type: Date,
			required:true
		},
		months : Number,
		salarydrawn : Number,
		nameoforganization : {
			type: Date,
			required:true
		},
		natureofduty : {
			type: String,
			required:true,
			maxlength:200
		}
	}]
});

applicationsSchema.pre('save',function(next){
	console.log('pre save');
	var doc=this;
	console.log(doc);
	console.log('before finding sequence');
	Applicationsequence.find({
        advertisementno:doc.advertisementno,postcode:doc.postcode,subjectcode:doc.subjectcode
    }).count({},function(err,countResult){
    	console.log("Count : "+countResult);
    	console.log('Inside find');
    	if(err){
			console.log('error while retriving count');    		
			next(error);
    	}else{
    		console.log('executing pre save');
		     if(countResult<=0){
		        Applicationsequence.create({
		            advertisementno:doc.advertisementno,
		            postcode:doc.postcode,
		            subjectcode:doc.subjectcode,
		            seq:0
		        },function(error,applicationsequence){
		        	console.log('insert for less than 0');

		        	if(error)
		        	{
		        		console.log(error)
		        		next(error);
		        	}else{
				    	Applicationsequence.findOneAndUpdate(
				    	{advertisementno:doc.advertisementno,postcode:doc.postcode,subjectcode:doc.subjectcode},
				        {$inc:{seq:1}},
				        {new:true}
				    	,function(error,counter){
				    		console.log('update action sequence done');

					    	if(error){
					    		console.log('Error while finding');
					    		return next(error);
					    	}
					    	console.log('Found sequence');
						    var tmpSeqNo = counter.seq;
						    var padZero="";
						    for(i = 0; i<(6-tmpSeqNo.toString().length); i++){
						        padZero+="0";
						    }
						    tmpSeqNo = padZero + tmpSeqNo.toString();
						    
						    var applicationno = doc.advertisementno+doc.postcode+doc.subjectcode+tmpSeqNo;
						    //applicationsSchema.applicationno=applicationno;

						    doc.applicationno = applicationno;
						    console.log('Applicaiton No : '+applicationno);

						    next();
						    	
					    });

		        	}
				        	

		        }); 
		    }else{
				    	Applicationsequence.findOneAndUpdate(
				    	{advertisementno:doc.advertisementno,postcode:doc.postcode,subjectcode:doc.subjectcode},
				        {$inc:{seq:1}},
				        {new:true}
				    	,function(error,counter){
				    		console.log('update action sequence done');

					    	if(error){
					    		console.log('Error while finding');
					    		return next(error);
					    	}
					    	console.log('Found sequence');
						    var tmpSeqNo = counter.seq;
						    var padZero="";
						    for(i = 0; i<(6-tmpSeqNo.toString().length); i++){
						        padZero+="0";
						    }
						    tmpSeqNo = padZero + tmpSeqNo.toString();
						    
						    var applicationno = doc.advertisementno+doc.postcode+doc.subjectcode+tmpSeqNo;
						    //applicationsSchema.applicationno=applicationno;

						    doc.applicationno = applicationno;
						    console.log('Applicaiton No : '+applicationno);

						    next();
						    	
					    });

		        	}

    	}
    });

	
    
});

//Export model
module.exports = mongoose.model('Applications', applicationsSchema);