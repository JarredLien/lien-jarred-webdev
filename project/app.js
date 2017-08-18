module.exports = function(app) {

    var models = require("./model/model.js")();

    require("./service/user.service.server.js")(app, models);
    require("./service/team.service.server.js")(app, models);
};
