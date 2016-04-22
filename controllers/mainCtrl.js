var user = require('../models/user');
var hobbies = user.hobbies;
var occupations = user.occupations;
var skills = user.skills;

module.exports = {
  getName: function(req, res, next) {
    res.status(200).json(user.name);
  },

  getLocation: function(req, res, next) {
    res.status(200).json(user.location);
  },

  getOccupations: function(req, res, next) {
    var sortedOccupations = [];
    if(req.query.order === 'desc') {
      sortedOccupations.push(occupations.sort());
      res.status(200).json(sortedOccupations);
    }
    else if (req.query.order === 'asc') {
      sortedOccupations.push(occupations.reverse());
      res.status(200).json(sortedOccupations);
    }
    else {
      res.status(200).json(occupations);
    }
  },

  getLatestOccupation: function(req, res, next) {
    res.status(200).json({
      "latestOccupation": occupations[occupations.length - 1]
    });
  },

  getHobbies: function(req, res, next) {
    res.status(200).json(hobbies);
  },

  getHobbiesType: function(req, res, next) {
    var matches = [];
    for(var i = 0; i < (hobbies.length); i++) {
      if(hobbies[i].type === req.params.type) {
        matches.push(hobbies[i].name);
      }
    }
    res.status(200).json(matches);
  },

  changeName: function(req, res, next) {
    user.name = req.body;
    console.log('Name successfully changed!');
    res.status(200).json(user.name);
  },

  updateLocation: function(req, res, next) {
    user.location = req.body;
    console.log('Location successfully changed!');
    res.status(200).json(user.location);
  },

  addHobby: function(req, res, next) {
    hobbies.push(req.body);
    console.log('Hobby successfully added!');
    res.status(200).json(hobbies);
  },

  addOccupation: function(req, res, next) {
    occupations.push(req.body.occupations);
    console.log('Occupation successfully added!');
    res.status(200).json(occupations);
  },

  getSkills: function(req, res, next) {
    if(req.query.experience) {
      var found = false;
      var results = [];
      for(var i = 0; i < skills.length; i++) {
        if(skills[i].experience === req.query.experience) {
          found = true;
          results.push(skills[i].name);
        }
      }
      if(found){
        console.log('Experience record found!');
        res.status(200).json(results);
      } else {
        console.log('I am sorry. Experience record was NOT found!');
        res.status(200).json(skills);
      }
    } else {
      console.log('Here are my skills!');
      res.status(200).json(skills);
    }
  },

  addSkill: function(req, res, next) {
    skills.push({
      id: req.body.id,
      name: req.body.name,
      experience: req.body.experience
    });
    console.log('New skill successfully added!');
    res.status(200).json(skills); //Can optionally return just the new skill that was added by using res.status(200).json(skills)[(skills.length - 1)];
  },

  verifiedUser: function(req, res, next) {
    var success = 'Congratulations you have successfully logged in!';
    res.status(200).json(success);
  }
};
