var mongoose = require("mongoose");

module.exports = function() {
    var TeamSchema = require("./team.schema.server")();
    var Team = mongoose.model("Team", TeamSchema);

    var api = {
        createTeam: createTeam,
        findAllTeamsForUser: findAllTeamsForUser,
        findTeamById: findTeamById,
        updateTeam: updateTeam,
        deleteTeam: deleteTeam,
        addPageIdToTeam: addPageIdToTeam,
        removePageIdFromTeam: removePageIdFromTeam
    };

    return api;

    function addPageIdToTeam(pageId, teamId) {
        return Team.findOne({_id: teamId},
            function(err, doc) {
                doc.pages.push(pageId);
                doc.save();
            });
    }

    function removePageIdFromTeam(pageId, teamId) {
        return Team.findOne({_id: teamId},
            function(err, doc) {
                doc.pages.pull(pageId);
                doc.save();
            });
    }

    function createTeam(userId, team) {
        team._user = userId;
        return Team.create(team);
    }

    function findAllTeamsForUser(userId) {
        return Team.find({_user: userId});
    }

    function findTeamById(teamId) {
        return Team.findById(teamId);
    }

    function updateTeam(teamId, team) {
        return Team.update(
            {_id: teamId},
            {$set :
                {
                    name: team.name,
                    description: team.description
                }
            }
        );
    }

    function deleteTeam(teamId) {
        return Team.remove({_id: teamId});
    }
};
