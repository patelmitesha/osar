var mongoose = require('mongoose');
var Posts = mongoose.model('Posts');



/// search course by courseconfig id ///
module.exports.posts = function(req, res) {

console.log('inside posts');
  //  VALIDATING USER INPUT //
    var posts=new Posts();

    Posts.find({},function(err,posts) {
      if(err){
         res.status(404).json(err);
      }else{
        res.status(200);
        res.send(posts);
      }

    });    


};



