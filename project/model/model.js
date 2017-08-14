module.exports = function() {

    var userModel = require("./user/user.model.server.js")();
    var teamModel = require("./team/team.model.server.js")();

    var statsModel = require("./stats/stats.model.server.js")();
    var standingsModel = require("./standings/standings.model.server.js")();
    var scoresModel = require("./scores/scores.model.server.js")();
    var searchModel = require("./search/search.model.server.js")();

    var models = {
        userModel: userModel,
        teamModel: teamModel,
        statsModel: statsModel,
        standingsModel: standingsModel,
        scoresModel: scoresModel,
        searchModel: searchModel
    };
    return models;
};
