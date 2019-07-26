var mongoose = require('mongoose');
var Courses = mongoose.model('Courses');
var Courseconfigs = mongoose.model('Courseconfigs');
var Applications = mongoose.model('Applications');

module.exports.courseconfig = function(req, res) {

  console.log('inside Courseconfigs');

  var courseconfigs=new Courseconfigs();

	var advertisementno = req.query.advertisementno;
  var postcode = req.query.postcode;
  var subjectcode = req.query.subjectcode;
  var isValidInput =true;

  //  VALIDATING USER INPUT //
  if(!advertisementno)
  {
     isValidInput =false;
     res.status(404);
     res.json({success:false, msg:'Please provide advertisement number'});
  }

  if(!postcode){
    isValidInput =false;
    res.status(404);
    res.json({success:false, msg:'Please provide post code'});
  }

  if(!subjectcode){
    isValidInput =false;
    res.status(404);
    res.json({success:false, msg:'Please provide subjectcode code'});
  }

  //  FETCHING FOURSE CONFIG 
  if(isValidInput){
    Courseconfigs.find({'advertisementno':advertisementno,'postcode':postcode,'subjectcode':subjectcode},function(err,courseconfigs) {
      if(err){
         res.status(404).json(err);
      }else{
        res.status(200);
        res.send(courseconfigs);
      }
    });
  }

};


module.exports.getcourseconfigbyid = function(req, res) {

  console.log('inside Courseconfigs');

  var courseconfigs=new Courseconfigs();

  var courseconfigid = req.query.courseconfigid;
  var isValidInput =true;

  //  VALIDATING USER INPUT //
  if(!courseconfigid)
  {
     isValidInput =false;
     res.status(404);
     res.json({success:false, msg:'Please provide courseconfig ID'});
  }


  //  FETCHING FOURSE CONFIG 
  if(isValidInput){
    Courseconfigs.findOne({'courseconfigid':courseconfigid},function(err,courseconfigs) {
      if(err){
         res.status(404).json(err);
      }else{
        res.status(200);
        res.send(courseconfigs);
      }
    });
  }

};


/// search remaining course from applicationno ///
module.exports.searchremainingcourses = function(req, res) {

  console.log('inside searchremainingcourses');
  var applicationno = req.query._id;
  var isValidInput =true;

  //  VALIDATING USER INPUT //
  if(!applicationno)
  {
    console.log('step 1 false');
    isValidInput =false;
    res.status(404);
    res.json({success:false, msg:'Please provide Application Number'});
  }
  else{
  //  SEARCH APPLICATION    //
    var application;

    Applications.findOne(({"_id":req.query._id , "email":req.decoded.email}),function(err,application) {
    if(err){
      this.application=null;
      res.status(404).json(err);
    }else{
      if(!application){
        this.application=null;
        res.status(404).json({success:false,msg:'No such application found'});
      }else{

          this.application=application;


       

          /// extract all details from qualification
          var qlfAppliedList=[];
          for (var qualification of this.application.qualifications){
            qlfAppliedList.push({"nameofexam":qualification.nameofexam});
          }


          var advtno = this.application.applicationno.substring(0,4);
          var postcode = this.application.applicationno.substring(4,6);
          var subjectcode = this.application.applicationno.substring(6,8);


          var coursesToBeAsked;
          var nameofExamApplicantNotFilled=[];
          /// get course from courseconfig based on postcode, subjectcode, and advtnumber
          Courseconfigs.aggregate([
              {
                $match: {'advertisementno':advtno,'postcode':postcode,'subjectcode':subjectcode}
              },
              {
                $lookup:{
                  from: 'courses',
                  localField:'courseconfigid',
                  foreignField:'courseconfigid',
                  as: 'courses'
                }
              }
            ], function(er,courseDetails) {
            if(er){
              res.status(404).json(er);
            }else{

              ////    COMPARING JSON 
              for (var courseDetail of courseDetails ){
                for(var course of courseDetail.courses){
                  ////search course name from application qualification subjects
                  var isFilled=false;
                  for(var applicationqualificationsubject of qlfAppliedList){
                    if(course.nameofexam==applicationqualificationsubject.nameofexam){
                      isFilled=true;
                    }
                  }

                  nameofExamApplicantNotFilled.push({"nameofexam":course.nameofexam, "iscompulsory":courseDetail.iscompulsory,"isfilled":isFilled, "courseconfigid":course.courseconfigid});


                }
                //qlfAppliedList.push({"nameofexam":qualification.nameofexam});
                
              }
              res.status(200);
              res.send(nameofExamApplicantNotFilled);

            }
          }); 
        }
      }
    });
  }
 /* res.status(200);
  res.send(coursesToBeAsked);*/

};