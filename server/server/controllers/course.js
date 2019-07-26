var mongoose = require('mongoose');
var Courses = mongoose.model('Courses');



/// search course by courseconfig id ///
module.exports.findcoursesbycourseconfigid = function(req, res) {

console.log('inside courses by courseconfigid');
var courseconfigid = req.query.courseconfigid;
  var isValidInput =true;
  //  VALIDATING USER INPUT //
  if(!courseconfigid)
  {
     isValidInput =false;
     res.status(404);
     res.json({success:false, msg:'Please provide course config id'});
  }else{
    var courses=new Courses();

    Courses.findOne({'courseconfigid':courseconfigid},function(err,courses) {
      if(err){
         res.status(404).json(err);
      }else{
        res.status(200);
        res.send(courses);
      }

    });    
  }



};



