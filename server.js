var express = require('express');

var bodyParser = require('body-parser');

var app = express();

var middleware = require('./controllers/middleware');

var mainCtrl = require('./controllers/mainCtrl');

app.use(bodyParser.json());

app.use(middleware.addHeaders);

// app.use(mainCtrl.method name goes here);

app.get('/name', mainCtrl.getName);
app.get('/location', mainCtrl.getLocation);
app.get('/occupations', mainCtrl.getOccupations);
app.get('/latestoccupation', mainCtrl.getLatestOccupation);
app.get('/hobbies', mainCtrl.getHobbies);
app.get('/hobbyType', mainCtrl.getHobbiesType);
app.get('/skills', mainCtrl.getSkills);
app.get('/secrets/:username/:pin', middleware.verifyUser, mainCtrl.verifiedUser);
app.put('/changeName', mainCtrl.changeName);
app.put('/updateLocation', mainCtrl.updateLocation);
app.post('/addHobby', mainCtrl.addHobby);
app.post('/addOccupation', mainCtrl.addOccupation);
app.post('/skills', middleware.generateID, mainCtrl.postSkills);

var port = 3000;

app.listen(port, function() {
  console.log('Listening to port ' + port);
});
