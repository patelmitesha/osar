var mongoose = require('mongoose');
var States = mongoose.model('States');


module.exports.states = function(req, res) {

console.log('inside states');

var states=new States();

  States.find({},function(err,states) {
    if(err){
       	res.status(404).json(err);
    }else{
	    res.status(200);
	    res.send(states);
    }

  });

};

