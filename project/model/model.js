module.exports = function() {

    var userModel = require("./user/user.model.server.js")();
    var teamModel = require("./team/team.model.server.js")();

    var models = {
        userModel: userModel,
        teamModel: teamModel,
    };
    return models;
};
