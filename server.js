// NPM Module injection //
var express = require('express');
var bodyParser = require('body-parser');
var middleware = require('./controllers/middleware');
var mainCtrl = require('./controllers/mainCtrl');

// Initializing Express in this App //
var app = express();

// Middleware //
app.use(bodyParser.json());
app.use(middleware.addHeaders);

// Endpoints //
app.get('/name', mainCtrl.getName);
app.get('/location', mainCtrl.getLocation);
app.get('/occupations', mainCtrl.getOccupations);
app.get('/occupations/latest', mainCtrl.getLatestOccupation);
app.get('/hobbies', mainCtrl.getHobbies);
app.get('/hobbies/:type', mainCtrl.getHobbiesType);
app.get('/skills', mainCtrl.getSkills);
app.get('/secrets/:username/:pin', middleware.verifyUser, mainCtrl.verifiedUser);
app.put('/name', mainCtrl.changeName);
app.put('/location', mainCtrl.updateLocation);
app.post('/hobbies', mainCtrl.addHobby);
app.post('/occupations', mainCtrl.addOccupation);
app.post('/skills', middleware.generateID, mainCtrl.addSkill);

// Listen Port //
var port = 3000;
app.listen(port, function() {
  console.log('Listening to port ' + port);
});
