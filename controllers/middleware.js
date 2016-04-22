var user = require('../models/user');
var skills = user.skills;

module.exports = {

  addHeaders: function(req, res, next) {
    res.status(200).set({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'X-XSS-Protection': '1; mode=block',
      'X-Frame-Options': 'SAMEORIGIN',
      'Content-Security-Policy': "default-src 'self' devmountain.github.io"
    });
    next();
  },

  generateID: function(req, res, next) {
    req.body.id = skills.length + 1;  //it must be +1 because this middleware code is running BEFORE the new skill is pushed to the skills array via mainCtrl.addSkill which runs after the middleware does (since that's the way we set up the endpoint).
    next();
  },

  verifyUser: function(req, res, next) {
    var error = 'Error: Please enter the correct username and pin';
    var tim = 'Tim is not the Droid you are looking for';
    var username = 'Andrew';  //the endpoint param is CASE SENSITIVE. i.e. /andrew/1234 will reject whereas /Andrew/1234 will success.
    var pin = '1234';
    if (req.params.username === username && req.params.pin === pin) {
      next();
    }
    else if (req.params.username === 'Tim') {
      res.status(200).json(tim);
    }
    else {
    res.status(200).json(error);
    }
  }

};
