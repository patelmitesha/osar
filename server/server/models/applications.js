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
		maxlength: 10,
		enum:['Shri.','Smt.','Ms.','Dr.'],
		/* in validate /i meant for ignore case */
		validate:[/^[a-zA-Z .]+$/i,"Only characters are allowed"]
	},
	firstname: {
		type: String,
		required: true,
		maxlength: 50,
		validate:[/^[a-zA-Z ]+$/i,"Only characters are allowed"]
	},
	fatherhusbandname: {
		type: String,
		required: true,
		maxlength:50,
		validate: [/^[a-zA-Z ]+$/i,"Invalid Father/Husband Name"]
	},
	gender: {
		type: String,
		required: true,
		maxlength: 20,
		enum:['Male','Female'],
		validate:[/^[a-zA-Z]+$/i,"Only characters are allowed"]
	},
	category: {
		type: String,
		required: true,
		maxlength: 5,
		enum:['GEN','SC','ST','OBC'],
		validate:[/^[a-zA-Z]+$/i,"Only characters are allowed"]
	},
	physicalhandicap: {
		type:Boolean ,
		required: true
	},
	handicaptype: {
		type:String,
		maxlength:50,
		required: false,
		enum:[null,'VISUAL','HEARING IMPAIRED','ORTHOPEDIC'],
		validate:[/^[a-zA-Z ]+$/i,"Only characters are allowed"]
	} ,
	handicapdetails: {
		type:String,
		maxlength:100,
		validate:[/^[0-9a-zA-Z .,-/%]+$/i,"Only characters are allowed"]
	},
	exserviceman: {
		type:Boolean ,
		required: true
	},
	exservicemanfrom: {
		type:String,
		maxlength:20,
		required: false,
		enum:[null,'ARMY','NAVY','AIR FORCE'],
		validate:[/^[0-9a-zA-Z -]+$/i,"Only characters are allowed"]
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
		maxlength:30,
		validate:[/^[a-zA-Z ]+$/i,"Only characters are allowed"]
	},
	nearestrlystn: {
		type:String,
		maxlength:30,
		validate:[/^[a-zA-Z -]+$/i,"Invalid Nearest Railway Station"]
	},
	ddno: {
		type:String,
		maxlength:30
	},
	dddate: Date ,
	ddbank: {
		type:String,
		maxlength:50,
		validate:[/^[0-9a-zA-Z .,-]+$/i,"Only characters are allowed"]
	},
	bankbranch: {
		type:String,
		maxlength:50,
		validate:[/^[0-9a-zA-Z .,-]+$/i,"Only characters are allowed"]
	},
	buildingno: {
		type: String,
		required: true,
		maxlength:100,
		validate:[/^[0-9a-zA-Z .,-/]+$/i,"Only characters are allowed"]
	},
	street: {
		type:String,
		maxlength:100,
		validate:[/^[0-9a-zA-Z .,-/]+$/i,"Only characters are allowed"]
	},
	area: {
		type:String,
		maxlength:100,
		validate:[/^[0-9a-zA-Z .,-/]+$/i,"Only characters are allowed"]
	},
	city: {
		type:String,
		maxlength:100,
		validate:[/^[a-zA-Z -]+$/i,"Only characters are allowed"]
	},
	state: {
		type:String,
		maxlength:50,
		validate:[/^[a-zA-Z -]+$/i,"Only characters are allowed"]
	},
	country: {
		type:String,
		maxlength:20,
		validate:[/^[a-zA-Z ]+$/i,"Only characters are allowed"]
	},
	pincode: {
		type: String,
		required: true,
		max:10,
		validate:[/[0-9]/,"Invalid pincode"]
	},
	telno: {
		type:String,
		maxlength:20,
		validate:[/[0-9]/,"Only numbers allowed"]
	},
	mobno: {
		type: String,
		required: true,
		maxlength:12,
		validate:[/[0-9+-]/,"Only numbers allowed"]
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
		maxlength:200,
		validate:[/^[0-9a-zA-Z .,-/]+$/i,"Only characters are allowed"]
	},
	ip: {
		type : String,
		maxlength:30,
		validate:[/[0-9.]/,"Invalid IP"]
	} ,
	screeningstatus: {
		type:String,
		maxlength:100,
		validate:[/^[0-9a-zA-Z .,-/]+$/i,"Only characters and digits are allowed"]
	},
	correctionmade: {
		type : String,
		maxlength:100,
		validate:[/^[0-9a-zA-Z .,-/]+$/i,"Only characters and digits are allowed"]
	},
	screeningresult: {
		type : String,
		maxlength:100,
		validate:[/^[0-9a-zA-Z .,-/]+$/i,"Only characters and digits are allowed"]
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
		maxlength:100,
		validate:[/^[0-9a-zA-Z .,-/]+$/i,"Only characters are allowed"]
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
		maxlength:1000,
		validate:[/^[0-9a-zA-Z .,-/]+$/i,"Only characters are allowed"]
	} ,
	answer: {
		type:String,
		maxlength:1000,
		validate:[/^[0-9a-zA-Z .,-/]+$/i,"Only characters are allowed"]
	} ,
	qualifications : [{
			nameofexam : {
			type: String,
			required: true,
			maxlength:200,
			validate:[/^[a-zA-Z .,-/]+$/i,"Only characters are allowed"]
		},
		course : {
			type: String,
			maxlength:200,
			validate:[/^[a-zA-Z .,-/]+$/i,"Only characters are allowed"]
		},
		subject : {
			type: String,
			maxlength:200,
			validate:[/^[0-9a-zA-Z .,-/]+$/i,"Only characters are allowed"]
		},
		yearofpassing : String,
		universityboard : {
			type: String,
			maxlength:500,
			validate:[/^[a-zA-Z .,-/]+$/i,"Only characters are allowed"]
		},
		resultawaited: Boolean,
		boardstate : {
			type: String,
			maxlength:100,
			validate:[/^[a-zA-Z .,-/]+$/i,"Only characters are allowed"]
		},
		aggregate : Number,
		examclass : {
			type: String,
			maxlength:50,
			validate:[/^[a-zA-Z .]+$/i,"Only characters are allowed"]
		},
		correctionmade : {
			type:String,
			maxlength:50,
			validate:[/^[0-9a-zA-Z .,-/]+$/i,"Only characters are allowed"]
		} ,
		examtype : {
			type:String,
			maxlength:100,
			validate:[/^[0-9a-zA-Z .,-/]+$/i,"Only characters are allowed"]
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
				maxlength : 100,
				required:true,
				validate:[/^[a-zA-Z0-9 .,-/]+$/i,"Only characters and digits are allowed"]
			},
			marks : {
				type : Number,
				max : 10000,
				required:true,
				validate:[/^[0-9./]+$/i,"Only digits are allowed"]
			},
			grade : {
				type : String,
				maxlength : 50,
				required:true,
				validate:[/^[0-9a-zA-Z .,-/]+$/i,"Only characters and digits are allowed"]
			}

		}]
	}],
	experiences : [{
		postheld : {
			type: String,
			required:true,
			maxlength:200,
			validate:[/^[0-9a-zA-Z .,-/]+$/i,"Only characters are allowed"]
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
		nameoforganization: {
			type: String,
			required:true,
			maxlength:200,
			validate:[/^[0-9a-zA-Z .,-/]+$/i,"Only characters are allowed"]
		},
		natureofduty : {
			type: String,
			required:true,
			maxlength:200,
			validate:[/^[0-9a-zA-Z .,-/]+$/i,"Only characters are allowed"]
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