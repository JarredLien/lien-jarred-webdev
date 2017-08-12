var app = require('./express');
var express = app.express;

var mongoose = require('mongoose');
var connectionString = 'mongodb://127.0.0.1:27017/webdev';

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

app.listen(process.env.PORT || 3000);