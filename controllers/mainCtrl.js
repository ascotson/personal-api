var users = require('../models/user');
var hobbies = users.hobbies;
var occupations = users.occupations;

module.exports = {
  getName: function(req, res, next) {
    res.json(users.name);
  },

  getLocation: function(req, res, next) {
    res.json(users.location);
  },

  getOccupations: function(req, res, next) {
    var sortedOccupations = [];
    if(req.query.order === 'desc') {
      sortedOccupations.push(occupations.sort());
      res.json(sortedOccupations);
    }
    else if (req.query.order === 'asc') {
      sortedOccupations.push(occupations.reverse());
      res.json(sortedOccupations);
    }
    else {
      res.json(occupations);
    }
  },

  getLatestOccupation: function(req, res, next) {
    res.json({
      "latestOccupation": occupations[occupations.length - 1]
    });
  },

  getHobbies: function(req, res, next) {
    res.json(hobbies);
  },

  getHobbiesType: function(req, res, next) {
    var matches = [];

    for(var i = 0; i < (hobbies.length); i++) {
      if(req.params.id === hobbies[i].type) {
        matches.push(hobbies[i].name);
      }
    }
    res.json(matches);
  },

  changeName: function(req, res, next) {
    users.name = req.body;
    res.status(204).json();
  },

  updateLocation: function(req, res, next) {
    users.location = req.body;
    res.status(204).json();
  },

  addHobby: function(req, res, next) {
    users.hobbies.push(req.body);
  },

  addOccupation: function(req, res, next) {
    users.occupations.push(req.body);
  },

  getSkills: function(req, res, next) {
    if(req.query.experience) {
      console.log(req.query.experience);
      var results = [];
      for(var i = 0; i < users.skills.length; i++) {
        if(users.skills[i].experience === req.query.experience) {
          results.push(users.skills[i].name);
        }
      }
      res.json(results);
    } else {
    res.json(users.skills);
    }
  }
};
