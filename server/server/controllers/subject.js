var mongoose = require('mongoose');
var Subjects = mongoose.model('Subjects');



/// search course by courseconfig id ///
module.exports.subjects = function(req, res) {

console.log('inside Subjects');
  //  VALIDATING USER INPUT //
    var subjects=new Subjects();

    Subjects.find({},function(err,subjects) {
      if(err){
         res.status(404).json(err);
      }else{
        res.status(200);
        res.send(subjects);
      }

    });    



};



