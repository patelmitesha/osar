var mongoose = require('mongoose');
var ApplicationHistory = mongoose.model('ApplicationHistory');
var Applications = mongoose.model('Applications');
var ApplicationValidator = require('../validators/applicationvalidator.js');

module.exports.searchapplications = function(req, res) {

var application=new Applications();
//var token = req.body.token || req.params.token || req.headers['x-access-token'];
console.log("req.decoded : "+req.decoded.email);
  Applications.find({"email":req.decoded.email},function(err,application) {
    if(err){
       res.status(500).json(err);
    }else{
      if(!application){
        res.status(400);
        res.json({errors:[{code:"err003",message: "Application not found"}]});
      }else{
        res.status(200);
        res.send(application);    
      }
    }
  });
};

module.exports.searchapplication = function(req, res) {

var application=new Applications();

console.log("Inside Search Application");
console.log("req.decoded : "+req.decoded.email);
console.log("req.query.id : "+req.query._id);

  Applications.findOne(({"_id":req.query._id , "email":req.decoded.email}),function(err,application) {
    if(err){
      console.log("Error : " +err);  
       res.status(500).json(err);
    }else{
      if(!application){
        res.status(400);
        res.json({errors:[{code:"err003",message: "Application not found"}]});
      }else{
        res.status(200);
        res.send(application);
      }
    }

  });
};

module.exports.saveapplication = function(req, res) {
console.log('inside save application');

  var application=new Applications();
  application = req.body;
  application.email=req.decoded.email;
  application.applicationno=' ';
    console.log('Save application validation start');
    ApplicationValidator.validateApplication(application).then(result =>{
      this.application=result;
      console.log('validation complete');
      console.log(this.application);
      Applications(application).save(function(err, savedApplication) {
          if(err){
            console.log('Error while saving');
            console.log(err);
            if(err.name == "ValidationError"){
                res.status(422).send(err);
              }else{
                //internal server (mongodb) error
                res.status(500).send(err);   
              }
          }else{
            console.log('Success on saving');
            console.log(savedApplication);
          	res.status(200);
          	res.json(
              {
                success:'OK', 
                _id: savedApplication._id ,
                applicationno:savedApplication.applicationno 
              });
          }

        });

      }).catch(error => {
        console.log('Error caught');
        console.log(error.stack);
        res.status(422);
        res.json(error.message);
      });

};



module.exports.updateapplication = function(req, res, next) {

  console.log('Inside update application');

  var application=req.body;
  console.log('Trying to validate application');
  console.log(application);
  ApplicationValidator.validateApplication(application).then(result =>{
  this.application=result;
  console.log('No error');

  //  retriv old object for saving in history starts here
  var appnTobeSavedInHistroy = null;
  console.log("_id : "+application._id);
  console.log("email : "+req.decoded.email);
  Applications.findOne(({"_id":application._id , "email":req.decoded.email}),function(err,applicationFound) {
    if(err){
      console.log("Error : " +err);  
       res.status(500).json(err);
    }else{
      if(!applicationFound){
        res.status(400);
        res.json({errors:[{code:"err003",message: "Application not found"}]});
      }else{
        appnTobeSavedInHistroy = applicationFound;
        //updaing application starts here
        Applications.update(
          ({"_id":req.body._id , "email":req.decoded.email}),req.body,{runValidators:true},
          function(err) {
            if(err){
              if(err.name == "ValidationError"){
                res.status(422);
                res.json(err);
              }else{
                res.status(500).send(err);   
              }
            }else{

              // save old application in history
              var appHistory=new ApplicationHistory();

              appHistory.applicationno = applicationFound.applicationno ,
              appHistory.updatedon = new Date() ,
              appHistory.operationtype = 'UPDATE' ,
              appHistory.application = appnTobeSavedInHistroy;
              ApplicationHistory(appHistory).save(function(err, savedApplication) {
                if(err){
                  console.log('Error while saving');
                  console.log(err);
                  if(err.name == "ValidationError"){
                    res.status(422).send(err);
                  }else{
                    //internal server (mongodb) error
                    res.status(500).send(err);   
                  }
                }else{
                  console.log('Success on saving');
                  console.log(savedApplication);
                  res.status(200);
                  res.json(
                    {
                      success:'OK'
                    });
                }

              });
            }

          });
      }
    }
  }).catch(error => {
    console.log('Error caught');
    console.log(error.stack);
    res.status(422);
    res.json(error.message);
  });

});
};


module.exports.savequalification = function(req, res) {
  console.log('inside save save qualification');

  var application=new Applications();
  console.log("req.query.id : "+req.query._id);

  Applications.findOne(({"_id":req.query._id , "email":req.decoded.email}),function(err,application) {
    if(err){
      console.log("Error : " +err);  
       res.status(500).json(err);
    }else{
    //res.status(200);
    this.application=application;
    console.log('found');
    console.log(this.application);

    delete req.body._id;
    console.log('request body');
    console.log(req.body);

    this.application.qualifications.push(req.body);
      Applications.update(({"_id":req.query._id , "email":req.decoded.email}),this.application,function(err) {
        if(err){
            console.log('error occured');
           res.status(500).send(err);
        }else{
          console.log('qualification upate success');
          res.status(200);
          res.json({success:'OK'});
        }
      });
    }
  });
};



module.exports.deletequalification = function(req, res) {
  console.log('inside delete qualification');

  var application=new Applications();
  console.log("req.query.id : "+req.query._id);

  Applications.findOne(({"_id":req.query._id , "email":req.decoded.email}),function(err,application) {
    if(err){
      console.log("Error : " +err);  
       res.status(500).json(err);
    }else{
    //res.status(200);
    this.application=application;
    console.log('found');
    console.log(this.application);

    this.application.qualifications.id(req.query.qualificationid).remove();
      Applications.update(({"_id":req.query._id  , "email":req.decoded.email}),this.application,function(err) {
        if(err){
            console.log('error occured');
           res.status(500).send(err);
        }else{
          console.log('experience upate success');
          res.status(200);
          res.json({success:'OK'});
        }
      });
    }
  });
};


module.exports.updatequalification = function(req, res) {

var application=new Applications();
console.log("req.decoded : "+req.decoded.email);
console.log("Experience ID : "+req.body._id);
console.log("Application ID : "+req.query._id)
experienceid:String;
experienceid=req.body._id;


  console.log({"_id":req.query._id,"email":req.decoded.email,  "experiences._id": this.qualificationid});
  Applications.findOne({"_id":req.query._id,"email":req.decoded.email,  "qualifications._id": this.qualificationid},function(err,application) {
    if(err){
      console.log("error occured");
      res.status(500).send(err);
    }else{
      if(!application){
        res.status(400);
        res.json({errors:[{code:"err003",message: "Application not found"}]});
      }
      console.log("Application found");
      console.log(application);
    }
  });
/*
  var tempExperience={};
  tempExperience=req.body;
  delete tempExperience._id;
  */
  Applications.updateOne({"_id":req.query._id,"email":req.decoded.email,  "qualifications._id": this.qualificationid},
    {$set : {"qualifications.$": req.body}},function(err,doc){
      if(err){
        console.log(err);
        res.status(500).send(err);
      }else{
        console.log(doc);
        res.status(200);
        res.json({success:'OK'});
      }
  });


};


module.exports.saveexperience = function(req, res) {
  console.log('inside save saveexperience');

  var application=new Applications();
  console.log("req.query.id : "+req.query._id);

  Applications.findOne(({"_id":req.query._id , "email":req.decoded.email}),function(err,application) {
    if(err){
      console.log("Error : " +err);  
       res.status(500).json(err);
    }else{
    //res.status(200);
      if(!application){
        res.status(404);
          res.json({errors:[{code:"err003",message: "Application not found"}]});
      }else{
      this.application=application;
      console.log('found');
      console.log(this.application);

      delete req.body._id;
      console.log('request body');
      console.log(req.body);

      this.application.experiences.push(req.body);
        Applications.update(({"_id":req.query._id , "email":req.decoded.email}),this.application,function(err) {
          if(err){
              console.log('error occured');
             res.status(500).send(err);
          }else{
            console.log('experience upate success');
            res.status(200);
            res.json({success:'OK'});
          }
        });
      }
    }
  });
};





module.exports.deleteexperience = function(req, res) {
  console.log('inside delete experience');

  var application=new Applications();
  console.log("req.query.id : "+req.query._id);

  Applications.findOne(({"_id":req.query._id , "email":req.decoded.email}),function(err,application) {
    if(err){
      console.log("Error : " +err);  
       res.status(500).json(err);
    }else{
    //res.status(200);
     if(!application){
        res.status(404);
          res.json({errors:[{code:"003",message: "Application not found"}]});
      }else{
      this.application=application;
      console.log('found');
      console.log(this.application);

      this.application.experiences.id(req.query.experienceid).remove();
        Applications.update(({"_id":req.query._id  , "email":req.decoded.email}),this.application,function(err) {
          if(err){
              console.log('error occured');
             res.status(500).send(err);
          }else{
            console.log('experience upate success');
            res.status(200);
            res.json({success:'OK'});
          }
        });
      }
    }
  });
};

module.exports.updateexperience = function(req, res) {

  var application=new Applications();
  console.log("req.decoded : "+req.decoded.email);
  console.log("Experience ID : "+req.body._id);
  console.log("Application ID : "+req.query._id)
  experienceid:String;
  experienceid=req.body._id;

  console.log("From Date : "+ req.body.fromdate);
  console.log("From Date New : "+ req.body.fromdate.toLocaleTimeString());


  console.log({"_id":req.query._id,"email":req.decoded.email,  "experiences._id": this.experienceid});
  Applications.findOne({"_id":req.query._id,"email":req.decoded.email,  "experiences._id": this.experienceid},function(err,application) {
    if(err){
      console.log("error occured");
      res.status(500).send(err);
    }else{
      if(!application){
        res.status(404);
          res.json({errors:[{code:"003",message: "Application not found"}]});
      }else{
      console.log("Application found");
      console.log(application);
      }
    }
  });

  Applications.updateOne({"_id":req.query._id,"email":req.decoded.email,  "experiences._id": this.experienceid},
    {$set : {"experiences.$": req.body}},function(err,doc){
      if(err){
        console.log(err);
        res.status(500).send(err);
      }else{
        console.log(doc);
        res.status(200);
        res.json({success:'OK'});
      }
  });
};


