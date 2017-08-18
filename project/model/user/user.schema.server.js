module.exports = function () {
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
            username: String,
            password: String,
            firstName: String,
            lastName: String,
            email: String,
            phone: String,
            teams: [{type: mongoose.Schema.Types.ObjectId, ref: 'Team'}],
            dateCreate: {type: Date, default: Date.now()},
            dateUpdated: Date
        },
        {collection: "project.user"});

    return UserSchema;
};