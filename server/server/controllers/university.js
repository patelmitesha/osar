var mongoose = require('mongoose');
var Universities = mongoose.model('Universities');


module.exports.universities = function(req, res) {

console.log('inside universities');

var universities=new Universities();

  Universities.find({},function(err,universities) {
    if(err){
       res.status(404).json(err);
    }else{
    res.status(200);
    res.send(universities);
    }

  });

};

