module.exports = function() {

    var mongoose = require("mongoose");

    var UserSchema = require("./user.schema.server")();
    var User = mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        deleteUser: deleteUser,
        addTeamIdToUser: addTeamIdToUser,
        removeTeamIdFromUser: removeTeamIdFromUser,
    };
    return api;

    function addTeamIdToUser(teamId, userId) {
        return User.findOne({_id: userId},
            function(err, doc) {
                doc.teams.push(teamId);
                doc.save();
            });
    }

    function removeTeamIdFromUser(teamId, userId) {
        return User.findOne({_id: userId},
            function(err, doc) {
                doc.teams.pull(teamId);
                doc.save();
            });
    }

    function createUser(user) {
        return User.create(user);
    }

    function findUserById(userId) {
        return User.findById(userId);
    }

    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    function updateUser(userId, newUser) {
        return User.update(
            {_id: userId},
            {$set :
                {
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email
                }
            }
        )
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }
};
