var mongoose = require("mongoose");

module.exports = function() {
    var TeamSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        name: String,
        description: String,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.team"});

    return TeamSchema;
};