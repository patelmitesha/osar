var mongoose = require('mongoose');
var moment = require('moment');
var Applications = mongoose.model('Applications');
var Advertisement = mongoose.model('Advertisements');
var OSARError = require('../validators/OSARError')

var methods = {
	validateApplication: function(application){
		return new Promise(
			function (resolve,reject){

				console.log('Inside validations');

				var errorList=JSON.parse('{"errors":{}}');
/*
				var error='errors';
				errorList[error]=[];*/

				var advt={};
				if(!application){
					console.log('application no not found');
					var tmpError={
						message : 'Please provide application number',
						error:'001'
					};
					

					// errorList[error].push(tmpError);
					errorList.errors.tmpError = tmpError;
				}


				if(!application.advertisementno){
					console.log('Advt no not found');
					var tmpError={
						message : 'Please provide advertisementno number',
						error:'002'
					};
					// errorList[error].push(tmpError);
					errorList.errors.advertisementno = tmpError;
				}


				if(!application.postcode){
					console.log('Post Code not found');
					var tmpError={
						message : 'Please provide post code',
						error:'002'
					};
					// errorList[error].push(tmpError);
					errorList.errors.postcode = tmpError;
				}

				if(!application.subjectcode){
					console.log('Subject Code not found');
					var tmpError={
						message : 'Please provide subject code',
						error:'002'
					};
					// errorList[error].push(tmpError);
					errorList.errors.subjectcode = tmpError;
				}


				//	DISABILITY VALIDATION STARTS HERE
				if(application.physicalhandicap==true){
					if(!(application.handicaptype.trim().toUpperCase() == 'VISUAL' ||
						application.handicaptype.trim().toUpperCase() == 'HEARING IMPAIRED' || 
						application.handicaptype.trim().toUpperCase() == 'ORTHOPEDIC')){
						console.log('Handicap type not found');
						var tmpError={
							message : 'Please provide disability type',
							error:'003'
						};

						//errorList[error].push(tmpError);
						errorList.errors.handicaptype = tmpError;



					}
					if(application.handicapdetails.trim().length<=0){
						console.log('Handicap details not found');
						var tmpError={
							message : 'Please provide handicap details',
							error:'004'
						};
						errorList.errors.handicapdetails = tmpError;
						// reject(new OSARError(errorList));
					}
				}
				//	DISABILITY VALIDATION ENDS HERE

				//	EX SERVICEMAN VALIDATION STARTS HERE
				if(application.exserviceman==true){
					if(!application.exservicemanfrom){
						console.log('Ex-serviceman from not found');
						var tmpError={
							message : 'Please provide Ex-serviceman from',
							error:'004'
						};
						// errorList[error].push(tmpError);
						errorList.errors.exservicemanfrom = tmpError;
					}else{
						if(!(application.exservicemanfrom.trim().toUpperCase() == 'ARMY' ||
							application.exservicemanfrom.trim().toUpperCase() == 'NAVY' || 
							application.exservicemanfrom.trim().toUpperCase() == 'AIR FORCE')){
							console.log('Ex-serviceman from not found');
							var tmpError={
								message : 'Please provide Ex-serviceman from',
								error:'003'
							};
							// errorList[error].push(tmpError);
							errorList.errors.exservicemanfrom = tmpError;
						}
					}


					if(!application.dateofreleived){
						console.log('Dateofreleived not found');
						var tmpError={
							message : 'Please provide date of releived',
							error:'004'
						};
						// errorList[error].push(tmpError);
						errorList.errors.dateofreleived = tmpError;
					}
					else{
						if(application.dateofreleived.trim().length<=0){
							console.log('Dateofreleived not found');
							var tmpError={
								message : 'Please provide date of releived',
								error:'004'
							};
							// errorList[error].push(tmpError);
							errorList.errors.dateofreleived = tmpError;
						}
					}
					
				}
				//	EX SERVICEMAN VALIDATION ENDS HERE
				console.log(errorList);
				console.log('hi');
				console.log('error length : '+Object.keys(errorList.errors).length);
				if(Object.keys(errorList.errors).length>0){
					reject(new OSARError(errorList));
				}

				console.log('Search param : '+application.advertisementno+ ' - ' + application.postcode + ' - ' + application.subjectcode)




				Advertisement.find({
						'advertisementno':application.advertisementno, 
						'advertisementdetails.postcode':application.postcode, 
						'advertisementdetails.subjectcode':application.subjectcode
					},function(err,advertisement) {
					if(err){
						console.log('Error occured');
						errors.add(err);
					}else{
						if(!advertisement){
							var tmpError={
								message : 'No such advertisement found',
								error:'003'
							};
							// errorList[error].push(tmpError);
							errorList.errors.advertisementno = tmpError;
							reject(new OSARError(errorList));
						}else{
							if(!advertisement[0]){
								var tmpError={
									message : 'No such advertisement found',
									error:'003'
								};
								// errorList[error].push(tmpError);
								errorList.errors.advertisementno = tmpError;
								reject(new OSARError(errorList));
							}else{
								console.log('Found');
								for(var i=0;i<advertisement[0].advertisementdetails.length;i++){
									if(advertisement[0].advertisementdetails[i].postcode == application.postcode && advertisement[0].advertisementdetails[i].subjectcode == application.subjectcode){
										console.log('Advt Details Found : ' + advertisement[0].advertisementdetails[i]);
										var advtDetails = advertisement[0].advertisementdetails[i];



							            var ageRelaxation = advtDetails.maximumageallowed;
							            if(!application.category){
											var tmpError={
												message : 'Please provide category',
												error:'003'
											};
											// errorList[error].push(tmpError);
											errorList.errors.category = tmpError;
											reject(new OSARError(errorList));
										}else{
								            if(application.category.trim().toUpperCase() == 'SC'){
												if(advtDetails.postsforsc){
													ageRelaxation += advtDetails.scagerelaxation;
												}
								            }
											if(application.category.trim().toUpperCase() == 'ST'){
												if(advtDetails.postsforst){
													ageRelaxation += advtDetails.stagerelaxation;
												}
											}
											if(application.category.trim().toUpperCase() == 'OBC'){
												if(advtDetails.postsforobc){
													ageRelaxation += advtDetails.obcagerelaxation;
												}
											}
							            }


										//PWD Age relaxation
										ageRelaxation += advtDetails.pwdagerelaxation;

										//Govt 2 Govt Age relaxation
										if(application.govtserv == true){
											ageRelaxation = 60;							
										}

										var tmpDate = new Date();
										var lastdate = moment(advertisement[0].endingdate);
										var relaxedDate = moment(advertisement[0].endingdate);
										relaxedDate.subtract(ageRelaxation,'years');
										var birthdate = moment(application.dateofbirth);

										//calculate age
										application.age= moment.duration(lastdate-birthdate).years();

										console.log("age allowed : "+ ageRelaxation);
										console.log('Last Date Raw : '+ advertisement[0].endingdate);
										console.log('Last Date : '+ lastdate.format());
										console.log('Relaxation Date : '+ relaxedDate.format());
										console.log('Birth Date : '+birthdate.format());
										console.log(moment(birthdate).isBetween(relaxedDate, lastdate,null,[]));
										var isValidDOB = moment(birthdate).isBetween(relaxedDate, lastdate,null,[]);
										if(!isValidDOB){
											console.log('Age criteria does not match');
											var tmpError={
												message : 'Age criteria does not match',
												error:'003'
											};
											errorList.errors.dateofbirth = tmpError;
											// errorList[error].push(tmpError);
										}

										console.log('showing error');
										console.log(JSON.stringify(errorList));
										console.log('Throwing error');
										console.log('error length : '+Object.keys(errorList.errors).length);
										if(Object.keys(errorList.errors).length>0){
											reject(new OSARError(errorList));
										}else{
											resolve(application);
										}
										// return true;
										
									}
								}
							}
							
						}
					}
				});






			});




	}
};

module.exports=methods;