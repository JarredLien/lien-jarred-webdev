module.exports = function(app) {

    var models = require("./model/model.js")();

    require("./service/scores.service.server.js")(app);
    require("./service/search.service.server.js")(app);
    require("./service/standings.service.server.js")(app);
    require("./service/stats.service.server.js")(app);
    require("./service/user.service.server.js")(app);
};