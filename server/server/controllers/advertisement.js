var mongoose = require('mongoose');
var Advertisements = mongoose.model('Advertisements');


module.exports.viewadvertisements = function(req, res) {

console.log('inside viewadvertisements');

var advertisements=new Advertisements();

  Advertisements.find({},function(err,advertisements) {
    if(err){
       res.status(404).json(err);
    }else{
    res.status(200);
    res.send(advertisements);
    }

  });

};

