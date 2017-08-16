var app = require('./express');
var express = app.express;
var mongoose = require('mongoose');
var connectionString = 'mongodb://127.0.0.1:27017/webdev';
var request = require('request');

if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV; // get from environment
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds153352.mlab.com:53352/heroku_4pn40v6h'; // user yours
}
// Replace "@ds157268.mlab.com:57268/heroku_nh37fqq4"
// above with your own URL given to you by mLab

mongoose.connect(connectionString);

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
// require("./utilities/filelist");

app.use(express.static(__dirname + '/public'));

require("./assignment/app")(app);

app.get("/api/search/:sportId", function(req, res) {
  var endpoint = "";

  switch(req.params.sportId) {
      case "NFL":
          endpoint = "http://api.sportradar.us/nfl-ot2/league/hierarchy.json?api_key=qhr3qrja8x92gdj8uy7ruaz6";
          break;
      case "MLB":
          endpoint = "http://api.sportradar.us/mlb-t6/league/hierarchy.json?api_key=az76hm3ud4v28sttvhqau8em";
          break;
      case "NHL":
          endpoint = "http://api.sportradar.us/nhl-ot4/league/hierarchy.json?api_key=wt9f89azus6dyf5tbq4eucqr";
          break;
      case "NBA":
          endpoint = "http://api.sportradar.us/nba-t3/league/hierarchy.json?api_key=hzk2zje9pp92rtkwtpth6yty";
          break;
  }

  request(endpoint, function (error, response, body) {
    res.send(body);
  });
});

app.get("/api/standings/:sportId/:year", function(req, res) {
  var endpoint = "";
  switch(req.params.sportId) {
      case "NFL":
          endpoint = "http://api.sportradar.us/nfl-ot2/seasontd/"+ req.params.year +"/standings.json?api_key=qhr3qrja8x92gdj8uy7ruaz6";
          break;
      case "MLB":
          endpoint = "http://api.sportradar.us/mlb-t6/seasontd/"+ req.params.year +"/REG/standings.json?api_key=az76hm3ud4v28sttvhqau8em";
          break;
      case "NHL":
          endpoint = "http://api.sportradar.us/nhl-ot4/seasontd/"+ req.params.year +"/REG/standings.json?api_key=wt9f89azus6dyf5tbq4eucqr";
          break;
      case "NBA":
          endpoint = "http://api.sportradar.us/nba-t3/seasontd/"+ req.params.year +"/REG/standings.json?api_key=hzk2zje9pp92rtkwtpth6yty";
          break;
  }

  request(endpoint, function (error, response, body) {
    res.send(body);
  });
});

app.get("/api/teams/:sportId/:teamId", function(req, res) {
  var endpoint = "";
  switch(req.params.sportId) {
      case "NFL":
          endpoint = "http://api.sportradar.us/nfl-ot2/teams/"+ req.params.teamId +"/full_roster.json?api_key=qhr3qrja8x92gdj8uy7ruaz6";
          break;
      case "MLB":
          endpoint = "http://api.sportradar.us/mlb-t6/teams/"+ req.params.teamId +"/profile.json?api_key=az76hm3ud4v28sttvhqau8em";
          break;
      case "NHL":
          endpoint = "http://api.sportradar.us/nhl-ot4/teams/"+ req.params.teamId +"/profile.json?api_key=wt9f89azus6dyf5tbq4eucqr";
          break;
      case "NBA":
          endpoint = "http://api.sportradar.us/nba-t3/teams/"+ req.params.teamId +"/profile.json?api_key=hzk2zje9pp92rtkwtpth6yty";
          break;
  }

  request(endpoint, function (error, response, body) {
      res.send(body);
    });
})

app.listen(process.env.PORT || 3000);
