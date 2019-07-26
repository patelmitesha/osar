var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var Logins=mongoose.model('Logins');


passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {

    console.log("Finding user for authentication");

    Logins.findOne({ email: username, enabled:true }, function (err, logins) {
      console.log("inside finding authentication");

      if (err) { 
        console.log('Login error occured');
        console.log(err);
        return done(err); 
      }else{
        console.log('No Login error');
        // Return if user not found in database
        if (!logins) {
          console.log('User not found');
          return done(null, false, {
            errors:[{code:"err002",message: "No such user found"}]
          });
        }else{
          // Return if password is wrong
          if (!logins.validPassword(password)) {
            console.log('Not valid password');
            return done(null, false, {
            errors:[{code:"err004",message: "Password is wrong"}]
          });
          }else{
            // If credentials are correct, return the user object
            console.log("Login found");
            return done(null, logins);  
          }
        
        }
        
      }

    });
  }
));