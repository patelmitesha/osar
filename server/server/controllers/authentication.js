var passport = require('passport');
var mongoose = require('mongoose');
var Logins = mongoose.model('Logins');
var crypto = require('crypto');

  var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
  };

  module.exports.register = function(req, res) {

  var logins=new Logins();
  logins.username = req.body.username;
  logins.email = req.body.email;
  logins.mobileno = req.body.mobileno;
  logins.setPassword(req.body.password);
  logins.enabled=false;
  logins.logincreatedon=new Date();
  logins.resetuid = crypto.randomBytes(16).toString('hex').slice(0,4);
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 2);
  logins.resetuidvalidupto = expiry;

  console.log(logins);
  if(!req.body.username || !req.body.email || !req.body.password || !req.body.confirmpassword) {
    sendJSONresponse(res, 400, {errors:[{code:"err001",message: "All fields are required"}]
    });
  }else{
    Logins.findOne({"email":req.body.email},function(err,login) {
      if(err){
          console.log(err);
          res.status(404).json(err);
      }else{
        // if(login){
        //   sendJSONresponse(res, 400, {
        //     errors:[{code:"err005",message: "User already exist!"}]
        //   });
        //   return;
        // }else{
          //if no such user exist
          logins.save(function(err) {
              if(err){
                  if(err.code==11000){
                    sendJSONresponse(res, 400, {
                      errors:[{code:"err005",message: "User already exist!"}]
                    });
                    return;
                  }else{
                    res.status(404).json(err);   
                  }
                 
              }else{
                var token;
                token = logins.generateJwt();
                res.status(200);
                res.json({
                  "token" : token
                });
              }
          });
        // }
      }
    });
  }
};

module.exports.login = function(req, res) {

  if(!req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      errors:[{code:"err001",message: "All fields are required"}]
    });
    return;
  }else{
        passport.authenticate('local', function(err, logins, info){
        var token;

        // If Passport throws/catches an error
        if (err) {
          console.log(err);
          res.status(404).json(err);
          return;
        }else{
          // If a user is found
          if(logins){
            token = logins.generateJwt();
            res.status(200);
            res.json({
              "token" : token
            });
          } else {
            // If user is not found
            res.status(401).json(info);
          }
        }

     })(req, res);
  }
  
};



module.exports.verifylogin = function(req, res) {
  if(!req.body.email || !req.body.otp) {
      sendJSONresponse(res, 400, {
        errors:[{code:"err001",message: "All fields required"}]
      });
  }else{
    Logins.findOne({"email":req.body.email, "resetuid":req.body.otp},function(err,login) {
      if(err){
          console.log(err);
          res.status(404).json(err);
      }else{
        if(!login){
          sendJSONresponse(res, 400, {
            errors:[{code:"err002",message: "User not found"}]
          });
        }else{
          login.enabled=true;
          login.resetuid=null;
          login.resetuidvalidupto=null;
          login.save();
          
          sendJSONresponse(res, 200, {
            errors:[{code:"msg002",message: "Successfully Verified"}]
          });
        }
        
      }
    });
  }

};





