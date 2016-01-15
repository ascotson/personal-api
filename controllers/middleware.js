var users = require('../models/user');

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
    req.body.id = users.skills.length;
    next();
  },

  verifyUser: function(req, res, next) {
    var error = 'Error: Please enter the correct username and pin';
    var tim = 'Tim is not the Droid you are looking for';
    var username = 'Andrew';
    var pin = '1234';
    if (req.params.username === username && req.params.pin === pin) {
      next();
    }
    else if (req.params.username === 'Tim') {
      res.json(tim);
    }
    else {
    res.json(error);
    }
  }

};
